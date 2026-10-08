import { useTodoStore } from '../stores/todoStore'
import { countTodos } from '../service/todoService'
import TodayDate from '../comp/TodayDate'
import WeatherWidget from '../comp/WeatherWidget'
import TodoForm from '../comp/TodoForm'
import TodoList from '../comp/TodoList'

export default function WorkDiaryPage() {
  const todos = useTodoStore((s) => s.todos)
  const { total, done } = countTodos(todos)

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <main className="mx-auto max-w-2xl space-y-4">
        <header className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Work Diary</h1>
            <TodayDate />
          </div>
          <WeatherWidget />
        </header>

        <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-slate-600">오늘의 할일을 기록하세요</h2>
            <p className="text-xs text-slate-400">
              전체 <span className="font-semibold text-slate-600">{total}</span>
              <span className="mx-1">·</span>
              완료 <span className="font-semibold text-indigo-600">{done}</span>
            </p>
          </div>
          <TodoForm />
          <TodoList />
        </section>
      </main>
    </div>
  )
}
