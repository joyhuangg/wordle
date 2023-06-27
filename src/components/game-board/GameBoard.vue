<template>
  <div class="board">
    <WordForm
      @submit="onSubmit"
      :is-active-row="i === activeRow"
      v-for="i of Array(6).keys()"
      :key="i"
      :row="i"
      :solution="solution"
    />
  </div>
</template>

<script setup lang="ts">
import WordForm from '../word-form/WordForm.vue'
import { ref } from 'vue'
import { useGameBoardObserver } from './state/observer/GameBoard.observer'

const activeRow = ref(0)
const { solution } = useGameBoardObserver()

function onSubmit(word: string) {
  activeRow.value++
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
