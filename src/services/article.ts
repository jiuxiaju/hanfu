import { dbTest } from './database';
import get from 'lodash/get';
const collectionArticle = dbTest.collection('article');


// todo any
/**
 * 获取文章详情
 * @param params 
 * @returns 
 */
export const getArticleById = async(params: any) => {
    const { articleId } = params;

    return collectionArticle.where({
        _id: articleId,
    }).get().then((res) => {
        console.log("🚀 ~ file: home.ts:12 ~ res ~ res:", res)

        return {
            success: true,
            data: get(res, 'data.0', {}),
        };
    });
}

export default {
    getArticleById,
}