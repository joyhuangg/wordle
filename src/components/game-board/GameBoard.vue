<template>
  <form class="form">
    <WordInput />

    <WordInput />

    <WordInput />

    <WordInput />

    <WordInput />

    <WordInput />
  </form>
</template>

<script setup lang="ts">
import WordInput from '../word-input/WordInput.vue'
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
</style>
