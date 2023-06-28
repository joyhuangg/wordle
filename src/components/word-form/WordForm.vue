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

const emit = defineEmits(['submit', 'matched'])

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

const { validateWord, addLetterToBank } = useGameBoardCommands()

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
    _disableForm()
    emit('submit', word)

    if (_isGameWon(props.solution, word)) {
      emit('matched')
    }
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

function _updateRowColors(word: string, solution: string) {
  let newCharState: String[] = []
  for (let i = 0; i < word.length; i++) {
    const status = _getStatus(solution, word, i)
    newCharState.push(status)
    addLetterToBank(word[i], status)
  }
  charStates.value = newCharState
}

function _isValidWord(word: string) {
  return validateWord(word)
}

function _getStatus(solution: string, word: string, index: number) {
  if (word[index] === solution[index]) {
    return 'correct'
  } else if (solution.includes(word[index])) {
    return 'incorrectPositions'
  } else {
    return 'incorrect'
  }
}

function _disableForm() {
  const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(`.input-row-${props.row}`)
  for (const input of inputs) {
    input.disabled = true
  }
}

function _isGameWon(solution: string, word: string) {
  return solution === word
}
</script>

<style scoped>
.wordForm {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
