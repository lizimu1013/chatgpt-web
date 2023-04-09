import { ss } from '@/utils/storage'

const LOCAL_NAME = 'SECRET_TOKEN'
const JWT = 'JWT'

export function getToken() {
  return ss.get(LOCAL_NAME)
}

export function setToken(token: string) {
  return ss.set(LOCAL_NAME, token)
}

export function removeToken() {
  return ss.remove(LOCAL_NAME)
}

export function setJWTToken(token: string) {
  return ss.set(JWT, token)
}

export function getJWTToken() {
  return ss.get(JWT)
}

export function removeJWT() {
  return ss.remove(JWT)
}
