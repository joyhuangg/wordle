<template>
  <button :key="letter" @click="$emit('click', letter)" :class="{ button: true, [status]: true }">
    {{ props.letter }}
  </button>
</template>

<script setup lang="ts">
import { useGameBoardObserver } from '../game-board/state/observer/GameBoard.observer'
import { computed } from 'vue'

defineEmits(['click'])

const props = defineProps({
  letter: {
    type: String,
    required: true
  }
})

const { letterBank } = useGameBoardObserver()

const status = computed(() => {
  if (
    letterBank.value.correct.has(props.letter) ||
    letterBank.value.incorrectPositions.has(props.letter)
  ) {
    return 'correct'
  } else if (letterBank.value.incorrect.has(props.letter)) {
    return 'incorrect'
  } else {
    return 'available'
  }
})
</script>

<style scoped>
.button {
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  color: #000;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
}

.correct {
  background-color: #4caf50;
  border-color: #388e3c;
  color: #fff;
}

.incorrect {
  background-color: #f44336;
  border-color: #d32f2f;
  color: #fff;
}

.available {
  background-color: #f5f5f5;
  border-color: #e0e0e0;
  color: #000;
}
</style>
