import { createJSONStorage } from 'zustand/middleware'

export const TODO_STORAGE_KEY = 'work-diary-todos'

// Zustand persist 미들웨어에서 사용할 localStorage 저장소
export const todoStorage = createJSONStorage(() => localStorage)
