const format = require('../../utils/format.sjs')
const formatRangeTime = (item) => {
  return (
    format.formatTime(item.startTime, 'YYYY-MM-dd') +
    '~' +
    format.formatTime(item.emdTime, 'YYYY-MM-dd')
  )
}

const getStatusDesc = (item) => {
  const now = getDate()
  const start = item.startTime
  const end = item.emdTime

  if (now < start) {
    return '未开始' // 活动尚未开始
  } else if (now > end) {
    return '已结束' // 活动已经结束
  } else {
    return '进行中' // 活动正在进行中
  }
}

const getStatusMap = (item) => {
  const now = getDate()
  const start = item.startTime
  const end = item.emdTime

  if (now < start) {
    return '1' // 活动尚未开始
  } else if (now > end) {
    return '3' // 活动已经结束
  } else {
    return '2' // 活动正在进行中
  }
}

export default {
  formatRangeTime,
  getStatusDesc,
  getStatusMap,
}
