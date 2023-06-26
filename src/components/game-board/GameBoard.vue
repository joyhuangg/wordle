<template>
  <div class="board">
    <WordForm :is-active-row="i === activeRow" v-for="i of Array(6).keys()" :key="i" :row="i" />
  </div>
</template>

<script setup lang="ts">
import WordForm from '../word-form/WordForm.vue'
import { ref } from 'vue'

const activeRow = ref(0)
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
