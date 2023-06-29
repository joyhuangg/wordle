<template>
  <label :for="`input-${props.row}-${props.index}`" hidden> Word Tile {{ props.index }} </label>

  <div
    :id="`input-${props.row}-${props.index}`"
    :class="{ tile: true, [`input-row-${props.row}`]: true, [`${props.state}`]: true }"
    :value="charValue"
  >
    {{ charValue }}
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['populated', 'erased'])

const props = defineProps({
  // focused: {
  //   type: Boolean,
  //   required: true
  // },
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
  },
  charValue: {
    type: String,
    required: true
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
