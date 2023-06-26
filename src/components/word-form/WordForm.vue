<template>
  <form class="wordForm" @submit.prevent="onSubmit($event)">
    <WordTile
      v-for="i of Array(maxWordLength).keys()"
      :key="i"
      :index="i"
      :row="props.row"
      :focused="i === activeInputIndex && props.isActiveRow"
      @populated="focusNextOncePopulated(i)"
    />

    <button type="submit" style="display: none">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import WordTile from '../word-tile/WordTile.vue'

const props = defineProps({
  row: {
    type: Number,
    required: true
  },
  isActiveRow: {
    type: Boolean,
    required: true
  }
})

const activeInputIndex = ref(0)
const maxWordLength = 5

function focusNextOncePopulated(index: number) {
  const max = 1
  const nextElementIndex = Number(index) + 1
  if (nextElementIndex < maxWordLength) {
    activeInputIndex.value = nextElementIndex
  }
}

function onSubmit(event: Event) {
  debugger
}
</script>

<style scoped>
.wordForm {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
