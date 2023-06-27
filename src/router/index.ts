import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useGameBoardCommands } from '../components/game-board/state/commands/GameBoard.commands'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: async (to, from, next) => {
        const { fetchWord } = useGameBoardCommands()
        await fetchWord()
        next()
      }
    }
  ]
})

export default router
