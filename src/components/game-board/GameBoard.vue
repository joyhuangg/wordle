<template>
  <div class="board">
    <span v-if="gameWon"> You won! </span>

    <WordForm
      @submit="onSubmit"
      :is-active-row="i === activeRow"
      v-for="i of Array(6).keys()"
      :key="i"
      :row="i"
      :solution="solution"
      @matched="onGameWon"
    />

    <KeyBoard />
  </div>
</template>

<script setup lang="ts">
import WordForm from '../word-form/WordForm.vue'
import KeyBoard from '../key-board/KeyBoard.vue'
import { ref } from 'vue'
import { useGameBoardObserver } from './state/observer/GameBoard.observer'

const activeRow = ref(0)
const gameWon = ref(false)
const { solution } = useGameBoardObserver()

function onSubmit(word: string) {
  activeRow.value++
}

function onGameWon() {
  gameWon.value = true
}
</script>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  margin: 0 auto;
}
</style>
