import { getWord, validateWord as validateWordEndpoint } from '../api/GameBoard.api'
import { useGameBoardObserver } from '../observer/GameBoard.observer'
import { useGameBoardStore } from '../store/GameBoard.store'

export const useGameBoardCommands = () => {
  const store = useGameBoardStore()
  const { alreadyFetched, lastWordMatched } = useGameBoardObserver()

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

  const removeLastLetterOfActiveWord = () => {
    if (store.guessedWords[store.activeRow].length > 0) {
      store.$patch({
        guessedWords: [
          ...store.guessedWords.slice(0, store.activeRow),
          store.guessedWords[store.activeRow].slice(
            0,
            store.guessedWords[store.activeRow].length - 1
          ),
          ...store.guessedWords.slice(store.activeRow + 1)
        ]
      })
    }
  }

  const addToActiveWord = (letter: string) => {
    if (store.guessedWords[store.activeRow].length < store.wordLength) {
      store.$patch({
        guessedWords: [
          ...store.guessedWords.slice(0, store.activeRow),
          store.guessedWords[store.activeRow] + letter,
          ...store.guessedWords.slice(store.activeRow + 1)
        ]
      })
    }
  }

  const submitWord = async () => {
    const word = store.guessedWords[store.activeRow]
    if (word.length === store.wordLength) {
      const isWord = await _isValidWord(word)
      if (isWord) {
        store.$patch({ lastWordIsInvalid: false })

        store.$patch({ activeRow: store.activeRow + 1 })
        if (lastWordMatched.value) {
          setGameOverTo(true)
        }

        if (store.activeRow === 6) {
          store.$patch({ gameOver: true })
        }
      } else {
        store.$patch({ lastWordIsInvalid: true })
      }
    }
  }

  function _isValidWord(word: string) {
    return validateWord(word)
  }

  function getCharState(solution: string, word: string, index: number) {
    if (word[index] === solution[index]) {
      return 'correct'
    } else if (solution.includes(word[index])) {
      return 'incorrectPositions'
    } else {
      return 'incorrect'
    }
  }

  const setGameOverTo = (gameOver: boolean) => {
    store.$patch({ gameOver })
  }

  return {
    fetchWord,
    validateWord,
    addToActiveWord,
    removeLastLetterOfActiveWord,
    setGameOverTo,
    reset: store.$reset,
    submitWord,
    getCharState
  }
}
