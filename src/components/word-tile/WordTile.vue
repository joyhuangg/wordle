<template>
  <label :for="`input-${props.row}-${props.index}`" hidden> Word Tile {{ props.index }} </label>

  <input
    @keyup="$emit('populated')"
    maxlength="1"
    type="text"
    :id="`input-${props.row}-${props.index}`"
    :class="{ tile: true, [`input-${props.index}`]: true }"
  />
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'

defineEmits(['populated'])

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
  }
})

onMounted(() => {
  const input: HTMLInputElement | null = document.getElementById(
    `input-${props.row}-${props.index}`
  )
  if (input && props.focused) {
    input.focus()
  }
})

watch(props, (props) => {
  const input: HTMLInputElement | null = document.getElementById(
    `input-${props.row}-${props.index}`
  )
  if (input && props.focused) {
    console.log('focusing' + props.index)
    input.focus()
  }
})
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
}
</style>
