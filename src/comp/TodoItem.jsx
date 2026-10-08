import { useState } from 'react'
import { useTodoStore } from '../stores/todoStore'
import { PRIORITIES, isValidTitle } from '../service/todoService'
import PriorityBadge from './PriorityBadge'

const BAR = {
  high: 'border-l-red-500',
  medium: 'border-l-amber-500',
  low: 'border-l-emerald-500',
}

const inputClass =
  'rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'

const iconBtn = 'rounded-lg p-1.5 text-slate-400 transition'

const ICONS = {
  edit: 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z',
  cancel: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM4.9 4.9l14.2 14.2',
  restore: 'M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5',
  trash: 'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6',
  check: 'M20 6 9 17l-5-5',
}

function Icon({ d, className = 'h-4 w-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={d} />
    </svg>
  )
}

export default function TodoItem({ todo }) {
  const updateTodo = useTodoStore((s) => s.updateTodo)
  const toggleDone = useTodoStore((s) => s.toggleDone)
  const toggleCancel = useTodoStore((s) => s.toggleCancel)
  const removeTodo = useTodoStore((s) => s.removeTodo)

  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo)

  const isDone = todo.status === 'done'
  const isCanceled = todo.status === 'canceled'
  const muted = isDone || isCanceled

  const startEdit = () => {
    setDraft(todo)
    setEditing(true)
  }

  const save = () => {
    if (!isValidTitle(draft.title) || !draft.date) return
    updateTodo(todo.id, { title: draft.title, date: draft.date, priority: draft.priority })
    setEditing(false)
  }

  const remove = () => {
    if (confirm(`'${todo.title}' 항목을 삭제할까요?`)) removeTodo(todo.id)
  }

  if (editing) {
    return (
      <li className={`rounded-xl border border-l-4 border-slate-200 bg-white p-3 shadow-sm ${BAR[draft.priority]}`}>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && save()}
            className={`${inputClass} flex-1`}
            autoFocus
          />
          <input
            type="date"
            value={draft.date}
            onChange={(e) => setDraft({ ...draft, date: e.target.value })}
            className={inputClass}
          />
          <select
            value={draft.priority}
            onChange={(e) => setDraft({ ...draft, priority: e.target.value })}
            className={inputClass}
          >
            {PRIORITIES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-2 flex justify-end gap-2">
          <button
            onClick={() => setEditing(false)}
            className="rounded-lg px-3 py-1.5 text-sm text-slate-500 transition hover:bg-slate-100"
          >
            취소
          </button>
          <button
            onClick={save}
            disabled={!isValidTitle(draft.title)}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:bg-slate-300"
          >
            저장
          </button>
        </div>
      </li>
    )
  }

  const bar = muted ? 'border-l-slate-300' : BAR[todo.priority]
  const titleStyle = isDone
    ? 'text-slate-400 line-through'
    : isCanceled
      ? 'italic text-slate-400'
      : 'text-slate-800'

  return (
    <li
      className={`flex items-center gap-3 rounded-xl border border-l-4 border-slate-200 bg-white px-3 py-3 shadow-sm transition hover:shadow-md ${bar} ${muted ? 'opacity-60' : ''}`}
    >
      <button
        onClick={() => toggleDone(todo.id)}
        disabled={isCanceled}
        title={isDone ? '진행중으로 되돌리기' : '완료'}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition disabled:cursor-not-allowed ${
          isDone ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-slate-300 hover:border-indigo-400'
        }`}
      >
        {isDone && <Icon d={ICONS.check} className="h-3 w-3" />}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className={`truncate text-sm ${titleStyle}`}>{todo.title}</p>
          {isCanceled && (
            <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500">취소됨</span>
          )}
        </div>
        <p className="mt-0.5 text-xs tabular-nums text-slate-400">{todo.date}</p>
      </div>

      <PriorityBadge priority={todo.priority} muted={muted} />

      <div className="flex shrink-0 items-center">
        <button onClick={startEdit} title="수정" className={`${iconBtn} hover:bg-indigo-50 hover:text-indigo-600`}>
          <Icon d={ICONS.edit} />
        </button>
        <button
          onClick={() => toggleCancel(todo.id)}
          title={isCanceled ? '일정 복원' : '일정 취소'}
          className={`${iconBtn} hover:bg-amber-50 hover:text-amber-600`}
        >
          <Icon d={isCanceled ? ICONS.restore : ICONS.cancel} />
        </button>
        <button onClick={remove} title="삭제" className={`${iconBtn} hover:bg-red-50 hover:text-red-600`}>
          <Icon d={ICONS.trash} />
        </button>
      </div>
    </li>
  )
}
