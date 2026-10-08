export const PRIORITIES = [
  { value: 'high', label: '높음' },
  { value: 'medium', label: '보통' },
  { value: 'low', label: '낮음' },
]

export function createTodo({ title, date, priority }) {
  const now = new Date().toISOString()
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    date,
    priority,
    status: 'todo',
    createdAt: now,
    updatedAt: now,
  }
}

export function isValidTitle(title) {
  return title.trim().length > 0
}

export function applyUpdate(todo, changes) {
  return {
    ...todo,
    ...changes,
    title: (changes.title ?? todo.title).trim(),
    updatedAt: new Date().toISOString(),
  }
}

// 완료 <-> 진행중
export function nextDoneStatus(status) {
  return status === 'done' ? 'todo' : 'done'
}

// 취소 <-> 진행중
export function nextCancelStatus(status) {
  return status === 'canceled' ? 'todo' : 'canceled'
}

// 최신 순: 날짜 내림차순 -> 등록 시각 내림차순
export function sortTodos(todos) {
  return [...todos].sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1
    return a.createdAt < b.createdAt ? 1 : -1
  })
}

export function countTodos(todos) {
  return {
    total: todos.length,
    done: todos.filter((t) => t.status === 'done').length,
  }
}
