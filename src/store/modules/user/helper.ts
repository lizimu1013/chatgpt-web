import { ss } from '@/utils/storage'

const LOCAL_NAME = 'userStorage'

export interface UserInfo {
  avatar: string
  name: string
  description: string
}

export interface UserState {
  userInfo: UserInfo
}

export function defaultSetting(): UserState {
  return {
    userInfo: {
      avatar: 'https://doget-api.oopscloud.xyz/api/download?token=eyJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vbGl6aW11MTAxMy9jaGF0Z3B0LXdlYi9tYWluL3NyYy9hc3NldHMvYXZhdGFyLmpwZyJ9.5Pelnj8BT28RZvg5CoJ4OJnCts8ZVJQgr6B0jG2ETbk',
      name: '在非洲修基站',
      description: '用爱发电：<a href="https://gi0.cn/sFY" class="text-blue-500" target="_blank" >Codaの小店</a>',
    },
  }
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}
