import { defineStore } from 'pinia'

export interface GameBoardState {
  solution: string
  status: string
  errorMessage?: string
  guessedWords: string[]
  activeRow: number
  gameOver: boolean
  lastWordIsInvalid: boolean
  wordLength: number
  tries: number
}

export const useGameBoardStore = defineStore('GameBoardStore', {
  state: (): GameBoardState => ({
    solution: '' as string,
    status: 'idle',
    errorMessage: undefined,
    guessedWords: ['', '', '', '', '', ''],
    activeRow: 0,
    gameOver: false,
    wordLength: 5,
    tries: 6,
    lastWordIsInvalid: false
  })
})
