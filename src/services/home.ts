import { dbTest } from './database';
const collectionKonwLedge = dbTest.collection('knowledge_set');


// todo any
export const getActivities = async(params: any) => {
    const { type } = params;

    const res = collectionKonwLedge.where({
    }).get().then((res) => {
        console.log("🚀 ~ file: home.ts:12 ~ res ~ res:", res)
        return res
    });

    return res;
}