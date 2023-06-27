<template>
  <div class="keyboard">
    <KeyButton v-for="letter of letters" :key="letter" :letter="letter" @click="onClick" />
  </div>
</template>

<script setup lang="ts">
import KeyButton from '../key-button/KeyButton.vue'

defineEmits(['click'])

defineProps({
  letters: {
    type: Array<string>,
    default: () => [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'x',
      'y',
      'z'
    ]
  }
})
</script>

<style scoped>
.keyboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  margin: 0 auto;
}
</style>
