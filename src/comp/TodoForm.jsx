import { useState } from 'react'
import { useTodoStore } from '../stores/todoStore'
import { PRIORITIES, isValidTitle } from '../service/todoService'
import { today } from '../utils/date'

const inputClass =
  'rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'

export default function TodoForm() {
  const addTodo = useTodoStore((s) => s.addTodo)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(today())
  const [priority, setPriority] = useState('medium')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValidTitle(title) || !date) return
    addTodo({ title, date, priority })
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="할일을 입력하세요"
        className={`${inputClass} flex-1`}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className={inputClass}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} className={inputClass}>
        {PRIORITIES.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={!isValidTitle(title)}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        추가
      </button>
    </form>
  )
}
