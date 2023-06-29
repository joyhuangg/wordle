<template>
  <div class="wordForm">
    <WordTile
      v-for="i of Array(wordLength).keys()"
      :key="i"
      :index="i"
      :row="props.row"
      :char-value="word[i]"
      :state="showState ? getCharState(solution, word, i) : 'unknown'"
    />
  </div>

  <span v-if="lastWordIsInvalid && isActiveRow"> That is not a word! </span>
</template>

<script setup lang="ts">
import WordTile from '../word-tile/WordTile.vue'
import { useGameBoardObserver } from '../game-board/state/observer/GameBoard.observer'
import { useGameBoardCommands } from '../game-board/state/commands/GameBoard.commands'
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
  },
  word: {
    type: String,
    required: true
  },
  showState: {
    type: Boolean,
    required: true
  }
})

const { wordLength, lastWordIsInvalid } = useGameBoardObserver()
const { getCharState } = useGameBoardCommands()
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
