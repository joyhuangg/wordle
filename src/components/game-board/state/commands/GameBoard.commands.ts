import { getWord, validateWord as validateWordEndpoint } from '../api/GameBoard.api'
import type { LetterBank } from '../model/GameBoard.model'
import { useGameBoardObserver } from '../observer/GameBoard.observer'
import { useGameBoardStore } from '../store/GameBoard.store'

export const useGameBoardCommands = () => {
  const store = useGameBoardStore()
  const { alreadyFetched } = useGameBoardObserver()

  const fetchWord = () => {
    setStatusToLoading()
    if (!alreadyFetched.value) {
      return fetchWordFromEndpoint()
    }
  }

  const validateWord = async (word: string) => {
    return await validateWordEndpoint(word)
      .then((data) => data.status === 200)
      .catch((error) => false)
  }

  const fetchWordFromEndpoint = () => {
    return getWord()
      .then((data) => data.json())
      .then((data) => handleSuccess(data[0]))
      .catch((error: string) => handleError(error))
  }

  const addLetterToBank = (letter: string, state: string) => {
    store.$patch({
      letterBank: {
        ...store.letterBank,
        [state]: [...store.letterBank[state as keyof LetterBank], letter]
      }
    })
  }

  const setStatusToLoading = () =>
    store.$patch({
      status: 'loading'
    })

  const handleSuccess = (solution: string) => {
    store.$patch({
      solution,
      status: 'fetched'
    })
  }

  const handleError = (error: string) =>
    store.$patch({
      status: 'error',
      errorMessage: error
    })

  return {
    fetchWord,
    validateWord,
    addLetterToBank,
    reset: store.$reset
  }
}
