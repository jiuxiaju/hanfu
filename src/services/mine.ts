import { dbTest } from './database';
import get from 'lodash/get';
const collectionMyCenter = dbTest.collection('my_center');

interface IParamsProps {
  id: string,
  detailKey: string,
}
// todo any
/**
 * 获取详情
 * @param params
 * @returns
 */
export const getMyCenterdetailById = async(params: IParamsProps) => {
  const { id, detailKey } = params;

  return collectionMyCenter.where({
      _id: id,
  }).get().then((res) => {
      console.log("🚀 ~ file: home.ts:12 ~ res ~ res:", res)
      let data = get(res, 'data.0');
      if (data) {
          return {
              success: true,
              data: {
                  detail: data[detailKey],
              },
          };
      } else {
          return {
              success: false,
              data: null,
              error: {
                  message: '查询不到该数据',
              }
          }
      }
  });
}

export default {
  getMyCenterdetailById,
}