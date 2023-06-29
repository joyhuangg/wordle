import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useGameBoardStore } from '../store/GameBoard.store'
import type { LetterBank } from '../model/GameBoard.model'

export function useGameBoardObserver() {
  const store = useGameBoardStore()

  const alreadyFetched = computed(() => store.status === 'fetched')

  const hasError = computed(() => store.status === 'error')

  const isLoading = computed(() => store.status === 'loading')

  const letterBank = computed(() => {
    const result: LetterBank = {
      correct: new Set(),
      incorrect: new Set(),
      incorrectPositions: new Set()
    }
    for (const word of store.guessedWords.slice(0, store.activeRow)) {
      for (const [i, letter] of word.split('').entries()) {
        if (store.solution[i] === letter) {
          result.correct.add(letter)
        } else if (store.solution.includes(letter)) {
          result.incorrectPositions.add(letter)
        } else {
          result.incorrect.add(letter)
        }
      }
    }

    return result
  })

  const lastWordMatched = computed(() => {
    return store.guessedWords[store.activeRow - 1] === store.solution
  })

  return {
    ...storeToRefs(store),
    errorMessage: store.errorMessage,
    alreadyFetched,
    hasError,
    isLoading,
    letterBank,
    lastWordMatched
  }
}
