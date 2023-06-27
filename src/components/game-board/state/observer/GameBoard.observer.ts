import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useGameBoardStore } from '../store/GameBoard.store'

export function useGameBoardObserver() {
  const store = useGameBoardStore()

  const alreadyFetched = computed(() => store.status === 'fetched')

  const hasError = computed(() => store.status === 'error')

  const isLoading = computed(() => store.status === 'loading')

  return {
    ...storeToRefs(store),
    errorMessage: store.errorMessage,
    alreadyFetched,
    hasError,
    isLoading
  }
}
