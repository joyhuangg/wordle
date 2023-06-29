<template>
  <div class="board">
    <span v-if="gameOver && lastWordMatched"> You won! </span>

    <span v-else-if="gameOver"> You lost! </span>

    <WordForm
      :is-active-row="i === activeRow"
      v-for="i of Array(tries).keys()"
      :key="i"
      :row="i"
      :solution="solution"
      :word="guessedWords[i]"
      :show-state="i < activeRow"
    />

    <KeyBoard :disabled="gameOver" @erased="onErased" @populated="onPopulated" @submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">
import WordForm from '../word-form/WordForm.vue'
import KeyBoard from '../key-board/KeyBoard.vue'
import { useGameBoardObserver } from './state/observer/GameBoard.observer'
import { useGameBoardCommands } from './state/commands/GameBoard.commands'

const { solution, gameOver, lastWordMatched, activeRow, tries, guessedWords } =
  useGameBoardObserver()
const { submitWord, removeLastLetterOfActiveWord, addToActiveWord } = useGameBoardCommands()

function onSubmit() {
  submitWord()
}

function onErased() {
  removeLastLetterOfActiveWord()
}

function onPopulated(letter: string) {
  addToActiveWord(letter)
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
