import { PRIORITIES } from '../service/todoService'

const STYLES = {
  high: 'bg-red-100 text-red-600',
  medium: 'bg-amber-100 text-amber-600',
  low: 'bg-emerald-100 text-emerald-600',
}

export default function PriorityBadge({ priority, muted = false }) {
  const label = PRIORITIES.find((p) => p.value === priority)?.label ?? priority
  const style = muted ? 'bg-slate-100 text-slate-400' : STYLES[priority]

  return (
    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}>
      {label}
    </span>
  )
}
