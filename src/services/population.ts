import { dbTest } from './database';
import get from 'lodash/get';
const collectionKonwLedge = dbTest.collection('knowledge_set');


// todo any
/**
 * 获取科普详情
 * @param params 
 * @returns 
 */
export const getPopulationById = async(params: any) => {
    const { id } = params;

    return collectionKonwLedge.where({
        _id: id,
    }).get().then((res) => {

        return {
            success: true,
            data: get(res, 'data.0', {}),
        };
    });
}

//获取汉服科普列表
// const getpopulation = () => {
//   return Promise.all([
//     collectionKonwLedge
//       .where({})
//       .orderBy('_createTime', 'desc')
//       .limit(40)
//       .get()
//       .then((res) => res.data),
//       collectionKonwLedge
//       .where({
//         type_name: 1,
//       })
//       .orderBy('_createTime', 'desc')
//       .limit(40)
//       .get()
//       .then((res) => res.data),
//       collectionKonwLedge
//       .where({
//         type_name: 2,
//       })
//       .orderBy('_createTime', 'desc')
//       .limit(40)
//       .get()
//       .then((res) => res.data),
//       collectionKonwLedge
//       .where({
//         type_name: 3,
//       })
//       .orderBy('_createTime', 'desc')
//       .limit(40)
//       .get()
//       .then((res) => res.data),
//   ]);
// };
//这里是把形制以及类型放一个函数里了，需要调整可以调整
const getpopulationList = async () => {
  const batchSize = 20; // 每个批次的数据数量
  const result = [];

  const queryPromises = [
    collectionKonwLedge
      .where({})
      .orderBy('_createTime', 'desc')
      .limit(batchSize)
      .get()
      .then((res) => res.data),
    collectionKonwLedge
      .where({
        type_name: 1,
      })
      .orderBy('_createTime', 'desc')
      .limit(batchSize)
      .get()
      .then((res) => res.data),
    collectionKonwLedge
      .where({
        type_name: 2,
      })
      .orderBy('_createTime', 'desc')
      .limit(batchSize)
      .get()
      .then((res) => res.data),
    collectionKonwLedge
      .where({
        type_name: 3,
      })
      .orderBy('_createTime', 'desc')
      .limit(batchSize)
      .get()
      .then((res) => res.data),
  ];

  for (const queryPromise of queryPromises) {
    const data = await queryPromise;
    result.push(...data.slice(0, batchSize));
  }

  return result;
};
export default {
    getPopulationById,
    getpopulationList
}
