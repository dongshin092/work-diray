import { useTodoStore } from '../stores/todoStore'
import { sortTodos } from '../service/todoService'
import TodoItem from './TodoItem'

export default function TodoList() {
  const todos = useTodoStore((s) => s.todos)

  if (todos.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center text-sm text-slate-400">
        등록된 할일이 없습니다. 첫 할일을 추가해 보세요.
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-2">
      {sortTodos(todos).map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
