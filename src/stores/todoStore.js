import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TODO_STORAGE_KEY, todoStorage } from '../utils/storage'
import {
  createTodo,
  applyUpdate,
  nextDoneStatus,
  nextCancelStatus,
} from '../service/todoService'

const updateById = (todos, id, fn) => todos.map((t) => (t.id === id ? fn(t) : t))

export const useTodoStore = create(
  persist(
    (set) => ({
      todos: [],

      addTodo: (input) => set((state) => ({ todos: [...state.todos, createTodo(input)] })),

      updateTodo: (id, changes) =>
        set((state) => ({ todos: updateById(state.todos, id, (t) => applyUpdate(t, changes)) })),

      toggleDone: (id) =>
        set((state) => ({
          todos: updateById(state.todos, id, (t) => applyUpdate(t, { status: nextDoneStatus(t.status) })),
        })),

      toggleCancel: (id) =>
        set((state) => ({
          todos: updateById(state.todos, id, (t) => applyUpdate(t, { status: nextCancelStatus(t.status) })),
        })),

      removeTodo: (id) => set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),
    }),
    {
      name: TODO_STORAGE_KEY,
      storage: todoStorage,
    },
  ),
)
