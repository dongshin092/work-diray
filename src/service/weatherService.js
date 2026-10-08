const ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather'

// 서울 현재 날씨 조회 (한글 설명, 섭씨)
export async function fetchSeoulWeather() {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
  if (!apiKey) throw new Error('OpenWeather API Key가 없습니다.')

  const params = new URLSearchParams({
    q: 'Seoul',
    units: 'metric',
    lang: 'kr',
    appid: apiKey,
  })

  const res = await fetch(`${ENDPOINT}?${params}`)
  if (!res.ok) throw new Error(`날씨 조회 실패 (${res.status})`)

  const data = await res.json()
  return {
    description: data.weather?.[0]?.description ?? '',
    temp: Math.round(data.main.temp),
    humidity: data.main.humidity,
  }
}
