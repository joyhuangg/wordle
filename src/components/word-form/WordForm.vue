<template>
  <form class="wordForm" @submit.prevent="onSubmit($event)">
    <WordTile
      v-for="i of Array(maxWordLength).keys()"
      :key="i"
      :index="i"
      :row="props.row"
      :focused="i === activeInputIndex && props.isActiveRow"
      @populated="focusNextOncePopulated($event, i)"
      @erased="onErased"
      :state="charStates[i]"
    />

    <button type="submit" style="display: none">Submit</button>
  </form>

  <span v-if="isNotWord"> That is not a word! </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WordTile from '../word-tile/WordTile.vue'
import { useGameBoardCommands } from '../game-board/state/commands/GameBoard.commands'

const emit = defineEmits(['submit'])

const props = defineProps({
  row: {
    type: Number,
    required: true
  },
  isActiveRow: {
    type: Boolean,
    required: true
  },
  solution: {
    type: String,
    required: true
  }
})

const activeInputIndex = ref(0)
const isNotWord = ref(false)
const maxWordLength = 5
const charStates = ref(Array(maxWordLength).fill('unknown'))

function focusNextOncePopulated(letter: string, index: number) {
  const nextElementIndex = Number(index) + 1
  if (nextElementIndex < maxWordLength) {
    activeInputIndex.value = nextElementIndex
  }
}

function onErased() {
  if (activeInputIndex.value > 0) {
    activeInputIndex.value--
  }
}

async function onSubmit() {
  const word = _createWord()
  const isWord = await _isValidWord(word)
  if (isWord) {
    _updateRowColors(word, props.solution)
    isNotWord.value = false
    emit('submit', word)
  } else {
    isNotWord.value = true
  }
}

function _createWord() {
  const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(`.input-row-${props.row}`)
  let word = ''
  for (const input of inputs) {
    word += input.value
  }
  return word
}

function _updateRowColors(word, solution) {
  let newCharState: String[] = []
  for (let i = 0; i < word.length; i++) {
    if (word[i] === solution[i]) {
      newCharState.push('correct')
    } else if (solution.includes(word[i])) {
      newCharState.push('position-incorrect')
    } else {
      newCharState.push('incorrect')
    }
  }
  charStates.value = newCharState
}

function _isValidWord(word) {
  const { validateWord } = useGameBoardCommands()

  return validateWord(word)
}
</script>

<style scoped>
.wordForm {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
