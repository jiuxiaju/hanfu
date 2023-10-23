import { dbTest } from './database';
import get from 'lodash/get';
const collectionActivity = dbTest.collection('activity_set');


// todo any
/**
 * 获取活动详情
 * @param params 
 * @returns 
 */
export const getActivityById = async(params: any) => {
    const { activityId } = params;
    console.log("🚀 ~ file: activity.ts:14 ~ getActivityById ~ activityId:", activityId)

    return collectionActivity.where({
        _id: activityId,
    }).get().then((res) => {
        console.log("🚀 ~ file: home.ts:12 ~ res ~ res:", res)
        let data = get(res, 'data.0');
        if (data) {
            return {
                success: true,
                data,
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
    getActivityById,
}