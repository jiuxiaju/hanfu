const formatTime = (timestamp, format) => {
  if (!timestamp) {
    return ''
  }

  if (!format) {
    format = 'YYYY-MM-DD HH:mm:ss'
  }

  const date = getDate(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  format = format
    .replace('YYYY', year)
    .replace('MM', ('0' + month).slice(-2))
    .replace('dd', ('0' + day).slice(-2))
    .replace('HH', ('0' + hour).slice(-2))
    .replace('mm', ('0' + minute).slice(-2))
    .replace('ss', ('0' + second).slice(-2))

  return format
}

export default {
  formatTime,
}
