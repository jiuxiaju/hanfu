import { dbTest } from './database'
const collection = dbTest.collection('movement_set')

const getSportsInfo = () =>
  collection
    .where({})
    .limit(1)
    .get()
    .then((res: any) => res.data)

export default {
  getSportsInfo,
}
