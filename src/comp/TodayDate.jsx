import { useEffect, useState } from 'react'
import { formatDateTime } from '../utils/date'

export default function TodayDate() {
  const [now, setNow] = useState(() => new Date())

  // 1분마다 갱신
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60 * 1000)
    return () => clearInterval(timer)
  }, [])

  return <p className="mt-1 text-sm tabular-nums text-slate-500">{formatDateTime(now)}</p>
}
