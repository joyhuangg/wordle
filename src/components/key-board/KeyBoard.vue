<template>
  <div class="keyboard">
    <div v-for="(row, i) of letters" :key="i" class="row">
      <KeyButton
        v-for="letter of row"
        :key="letter"
        :letter="letter"
        @click="disabled ? null : onClick($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import KeyButton from '../key-button/KeyButton.vue'

const emit = defineEmits(['submit', 'populated', 'erased'])

defineProps({
  letters: {
    type: Array<string[]>,
    default: () => [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'erase']
    ]
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

function onClick(letter: string) {
  if (letter === 'enter') {
    emit('submit')
  } else if (letter === 'erase') {
    onErased()
  } else if (isCharLetter(letter)) {
    onKeyUp({ key: letter } as KeyboardEvent)
  }
}

function onKeyUp(event: KeyboardEvent) {
  if (isCharLetter(event.key)) {
    emit('populated', event.key)
  }
}

function onErased() {
  emit('erased')
}

function isCharLetter(char: string) {
  return /^[a-z]$/i.test(char)
}
</script>

<style scoped>
.keyboard {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-self: center;
  gap: 0.5rem;
  width: 100%;
  margin: 0 auto;
}
.row {
  display: inline-flex;
  justify-content: center;
}
</style>
