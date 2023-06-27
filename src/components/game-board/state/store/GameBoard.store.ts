import { defineStore } from 'pinia'

export interface GameBoardState {
  solution: string
  status: string
  errorMessage?: string
}

export const useGameBoardStore = defineStore('GameBoardStore', {
  state: (): GameBoardState => ({
    solution: '' as string,
    status: 'idle',
    errorMessage: undefined
  })
})
