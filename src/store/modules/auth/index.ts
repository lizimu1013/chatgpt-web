import { defineStore } from 'pinia'
import { getJWTToken, getToken, removeToken, setJWTToken, setToken } from './helper'
import { store } from '@/store'
import { fetchSession, login, verifyKey } from '@/api'

interface SessionResponse {
  auth: boolean
  model: 'ChatGPTAPI' | 'ChatGPTUnofficialProxyAPI'
}

export interface AuthState {
  token: string | undefined
  session: SessionResponse | null
  JWT: string | undefined
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    token: getToken(),
    session: null,
    JWT: getJWTToken(),
  }),

  getters: {
    isChatGPTAPI(state): boolean {
      return state.session?.model === 'ChatGPTAPI'
    },
  },

  actions: {
    async getSession() {
      try {
        const { data } = await fetchSession<SessionResponse>()
        this.session = { ...data }
        return Promise.resolve(data)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },

    async verifyKey(secret_key: string) {
      try {
        const data = await verifyKey(secret_key)

        if (data.token) {
          const loginInfo = await login(data.token)
          console.log(loginInfo)
        }

        setJWTToken(data.token)
        return Promise.resolve(data)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },

    async vipLogin(username: string) {
      try {
        const data = await login(username)
        console.log(data.token)

        setJWTToken(data.token)

        return Promise.resolve(data)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },

    setToken(token: string) {
      this.token = token
      setToken(token)
    },

    removeToken() {
      this.token = undefined
      removeToken()
    },
  },
})

export function useAuthStoreWithout() {
  return useAuthStore(store)
}
