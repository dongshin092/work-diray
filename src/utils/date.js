const pad = (n) => String(n).padStart(2, '0')

// yyyy-mm-dd
export function formatDate(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

// yyyy-mm-dd HH:mm
export function formatDateTime(date = new Date()) {
  return `${formatDate(date)} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function today() {
  return formatDate(new Date())
}
