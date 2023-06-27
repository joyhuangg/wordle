import { defineStore } from 'pinia'
import type { LetterBank } from '../model/GameBoard.model'

export interface GameBoardState {
  solution: string
  status: string
  errorMessage?: string
  letterBank: LetterBank
}

export const useGameBoardStore = defineStore('GameBoardStore', {
  state: (): GameBoardState => ({
    solution: '' as string,
    status: 'idle',
    errorMessage: undefined,
    letterBank: {
      correct: [],
      incorrect: [],
      incorrectPositions: []
    }
  })
})
