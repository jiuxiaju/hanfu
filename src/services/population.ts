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
    const { PopulationById } = params;

    return collectionKonwLedge
        .where({
        _id: PopulationById,
    }).
    get()
    .then((res) => {

        return {
            success: true,
            data: get(res, 'data.0', {}),
        };
    });
}
export default {
    getPopulationById
}


