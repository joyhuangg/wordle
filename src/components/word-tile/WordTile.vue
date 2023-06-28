<template>
  <label :for="`input-${props.row}-${props.index}`" hidden> Word Tile {{ props.index }} </label>

  <input
    @keyup="onKeyUp($event)"
    @keyup.delete="onErased"
    maxlength="1"
    type="text"
    :id="`input-${props.row}-${props.index}`"
    :class="{ tile: true, [`input-row-${props.row}`]: true, [`${props.state}`]: true }"
    :value="charValue"
    onkeydown="return /[a-z]/i.test(event.key)"
  />
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'

const charValue = ref('')

const emit = defineEmits(['populated', 'erased'])

const props = defineProps({
  focused: {
    type: Boolean,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  row: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    options: ['unknown', 'correct', 'incorrect', 'incorrectPositions']
  }
})

onMounted(() => {
  const input: HTMLElement | null = document.getElementById(`input-${props.row}-${props.index}`)
  if (input && props.focused) {
    input.focus()
  }
})

watch(props, (newProps) => {
  const input: HTMLElement | null = document.getElementById(
    `input-${newProps.row}-${newProps.index}`
  )
  if (input && newProps.focused) {
    input.focus()
  }
})

function onKeyUp(event: KeyboardEvent) {
  if (isCharLetter(event.key)) {
    charValue.value = event.key
    emit('populated', event.key)
  }
}

function onErased() {
  charValue.value = ''
  emit('erased')
}

function isCharLetter(char: string) {
  return /^[a-z]$/i.test(char)
}
</script>

<style scoped>
.tile {
  width: 40px;
  height: 40px;
  border: 1px solid black;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 0 10px;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  color: #333;

  &:focus {
    outline: -webkit-focus-ring-color auto 1px;
  }

  &.unknown {
    background-color: #fff;
  }

  &.correct {
    background-color: #b2f5b2;
  }

  &.incorrect {
    background-color: #f5b2b2;
  }

  &.incorrectPositions {
    background-color: #f5f5b2;
  }
}
</style>
