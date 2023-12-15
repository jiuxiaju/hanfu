import { dbTest } from './database'
import get from 'lodash/get'
const collectionActivity = dbTest.collection('activity_set')

const _ = dbTest.command;

// todo any
/**
 * 获取活动详情
 * @param params
 * @returns
 */
export const getActivityById = async (params: any) => {
  const { activityId } = params;

  return collectionActivity
    .where({
      _id: activityId,
    })
    
    .get()
    .then((res) => {
      console.log('🚀 ~ file: home.ts:12 ~ res ~ res:', res)
      let data = get(res, 'data.0')
      if (data) {
        return {
          success: true,
          data,
        }
      } else {
        return {
          success: false,
          data: null,
          error: {
            message: '查询不到该数据',
          },
        }
      }
    })
}

// 获取活动列表（暂不分页）
const getActivityList = async (params: any) => {
  const batchSize = 20; // 每个批次的数据数量
  let hasMore = true; // 是否有更多数据
  let skipCount = 0; // 初始跳过的数据数量
  const result = []; // 最终结果数组
  const currentTime = new Date().getTime(); // 获取当前时间的时间戳

  while (hasMore) {
    const queryConditions = {
      type: params.type,
      status: params.status,
      region: dbTest.RegExp({
        regexp: params.region || '',
        options: 'i'
      })
    };

    // 如果status是 "未开始"，则添加时间的比较条件
    if (params.status === "未开始") {
      queryConditions.startTime = dbTest.command.gt(currentTime);
    }

    const res = await collectionActivity
      .where(queryConditions)
      .skip(skipCount)
      .limit(batchSize)
      .get();
    const data = res.data;
    result.push(...data); // 将本次查询结果加入总结果数组
    if (data.length < batchSize) {
      // 如果返回的数据少于batchSize，说明没有更多数据了
      hasMore = false;
    } else {
      skipCount += batchSize; // 准备跳过之前已加载的数据
    }
  }
  // while (hasMore) {
  //   const res = await collectionActivity
  //     .where({        
  //       type: params.type,
  //       status: params.status,
  //       region: dbTest.RegExp({
  //         regexp: params.region || '',
  //         options: 'i'
  //       })})
  //     .skip(skipCount)
  //     .limit(batchSize)
  //     .get();

  //   const data = res.data;
  //   result.push(...data); // 将本次查询结果加入总结果数组

  //   if (data.length < batchSize) {
  //     // 如果返回的数据少于batchSize，说明没有更多数据了
  //     hasMore = false;
  //   } else {
  //     skipCount += batchSize; // 准备跳过之前已加载的数据
  //   }
  // }

  return result;
};

export default {
  getActivityById,
  getActivityList,
}
