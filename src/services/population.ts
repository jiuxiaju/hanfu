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
        console.log("🚀 ~ file: home.ts:12 ~ res ~ res:", res)

        return {
            success: true,
            data: get(res, 'data.0', {}),
        };
    });
}

export default {
    getPopulationById,
}