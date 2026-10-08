import { useEffect, useState } from 'react'
import { fetchSeoulWeather } from '../service/weatherService'

const ONE_HOUR = 60 * 60 * 1000

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null)
  const [status, setStatus] = useState('loading') // loading | success | error

  // 실행 시 1회 조회 후 1시간마다 갱신
  useEffect(() => {
    const load = async () => {
      try {
        setWeather(await fetchSeoulWeather())
        setStatus('success')
      } catch {
        setStatus('error')
      }
    }
    load()
    const timer = setInterval(load, ONE_HOUR)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="rounded-xl bg-slate-50 px-4 py-3 sm:min-w-40 sm:text-right">
      {status === 'loading' && <p className="text-sm text-slate-400">날씨 불러오는 중...</p>}
      {status === 'error' && <p className="text-sm text-slate-400">날씨 정보를 불러올 수 없습니다</p>}
      {status === 'success' && weather && (
        <>
          <p className="text-xs text-slate-500">서울 · {weather.description}</p>
          <p className="mt-0.5 text-slate-800">
            <span className="text-xl font-semibold">{weather.temp}℃</span>
            <span className="ml-2 text-sm text-slate-500">습도 {weather.humidity}%</span>
          </p>
        </>
      )}
    </div>
  )
}
