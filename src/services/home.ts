import { dbTest } from './database'
const collection = dbTest.collection('activity_set')

// 查询前2条活动
export const getActivities = async (params: any) => {
  const res = collection
    .where({})
    .orderBy('startTime', 'desc')
    .limit(2)
    .get()
    .then((res) => {
      return res.data
    })
  return res
}

export default {
  getActivities,
}
