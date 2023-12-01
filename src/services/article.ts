import { dbTest } from './database';
import get from 'lodash/get';
const collectionArticle = dbTest.collection('article');
const _ = dbTest.command;


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
	console.log("🚀 ~ file: article.ts:19 ~ getArticleById ~ res:", res)

			return {
					success: true,
					data: get(res, 'data.0', {}),
			};
	});
}

export const updateArticleCReadNum = async(param: { articleId: string}) => {
	const { articleId } = param;

	return collectionArticle.doc(articleId).update({
		data: {
			'read_count': _.inc(1),
		}
	}).then((res: any) => {
			return {
					success: true,
			};
	}).catch((err: any) => {
		console.log('####', err.message);

		return ({
			success: false,
			errmsg: err.message,
		})
	});
}

export default {
    getArticleById,
    updateArticleCReadNum,
}