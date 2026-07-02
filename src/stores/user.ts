import { defineStore } from 'pinia'
import type { UserAccount } from '../api/user'

const STORAGE_KEY = 'campus_market_user'

export interface LoginUser {
  id: number
  username: string
  name: string
  college: string
  grade: string
  bio: string
}

function saveToStorage(user: LoginUser) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

function loadFromStorage(): LoginUser | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as LoginUser
  } catch {
    return null
  }
}

function clearStorage() {
  localStorage.removeItem(STORAGE_KEY)
}

export const useUserStore = defineStore('user', {
  state: () => {
    const saved = loadFromStorage()
    return {
      isLoggedIn: saved !== null,
      currentUser: saved || {
        id: 0,
        username: '',
        name: '',
        college: '',
        grade: '',
        bio: '',
      },
    }
  },

  getters: {
    displayName: (state) => state.currentUser.name || '未登录',
    userDescription: (state) => {
      if (!state.isLoggedIn) return '请先登录'
      return `${state.currentUser.college} · ${state.currentUser.grade}`
    },
  },

  actions: {
    setUser(user: LoginUser) {
      this.currentUser = user
      this.isLoggedIn = true
      saveToStorage(user)
    },

    login(user: LoginUser) {
      this.setUser(user)
    },

    logout() {
      this.currentUser = {
        id: 0,
        username: '',
        name: '',
        college: '',
        grade: '',
        bio: '',
      }
      this.isLoggedIn = false
      clearStorage()
    },

    restoreLogin() {
      const saved = loadFromStorage()
      if (saved) {
        this.currentUser = saved
        this.isLoggedIn = true
      }
    },
  },
})
