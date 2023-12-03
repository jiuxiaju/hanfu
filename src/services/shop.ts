/*
 * @Author: 兼爱
 * @Date: 2023-11-02 02:26:08
 * @LastEditTime: 2023-12-02 18:11:30
 * @LastEditors: 兼爱
 * @Description: 
 * @FilePath: /hanfu/src/services/shop.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { dbTest } from './database'
import get from 'lodash/get'
const collectionShopOnline = dbTest.collection('online_shop_set');
const collectionShopOffline = dbTest.collection('offline_shop_set');
const _ = dbTest.command

interface ISearchBaseParams {
    pageSize?: number;
    pageIndex?: number;
}
interface ISearchOfflineParams extends ISearchBaseParams {
    /** 是否支持摄影 */
    makeup?: boolean;
    /** 是否支持妆造 */
    photo_shoot?: boolean;
    /** 地区-省 */
    province?: string;
    /** 地区-市 */
    city?: string;
    
}
interface ISearchOnlineParams {
    store_source: string[];
    style: string[];
}
interface ShopBase {
    /** id */
    _id: string;
    _createTime: number;
    _updateTime: number;
    /** 图片 */
    logo: string;
    /** 店铺名称 */
    shop_name: string;
    /** 是否已下架 */
    status: boolean;
}
interface OnlineShopDTO extends ShopBase {
    store_source: string;
    style: string[];
}
interface OfflineShopDTO extends ShopBase {
    /** 地址 */
    address: string;
    /** 地区 */
    city: string;
    /** 是否支持妆造 */
    makeup: string;
    /** 是否支持摄影 */
    photo_shoot: string;
    /** 电话 */
    tele: string;
    /** 详情 */
    shop_brief: string;
}
export const searchOfflineShop = async (params?: ISearchOfflineParams) => {
    const { makeup, photo_shoot, province = '', city = '', pageSize = 100, pageIndex = 1 } = params || {};
    const query: any = {
        status: _.eq(true),
        makeup: makeup ? _.nin(["0", ""]) : undefined,
        photo_shoot: photo_shoot ? _.nin(["0", ""]) : undefined,
        city: _.and(dbTest.RegExp({
            regexp: city
        }), dbTest.RegExp({
            regexp: province
        }))
    }
    return collectionShopOffline
        .where(query)
        .skip((pageIndex - 1) * pageSize)
        .limit(pageSize)
        .orderBy('shop_name', 'asc')
        .get()
        .then((res) => {
            return {
                success: true,
                code: 200,
                data: res.data.map(item => ({
                    ...item,
                    supports: [!!(Number(item.makeup))&&"妆造",!!(Number(item.photo_shoot))&&"摄影"].filter(i => i),
                })),
            };
        }
        )
    }
    export const searchOnlineShop = async (params?: any) => {
        const { store_source, style, pageSize = 100, pageIndex = 1 } = params || {};
        console.log(store_source)
        const query: any = {
            status: _.eq(true),
            store_source: store_source?.length ? _.in(store_source) : undefined,
            style: style?.length ? _.all(style) : undefined,
        }
        return collectionShopOnline
            .where(query)
            .skip((pageIndex - 1) * pageSize)
            .limit(pageSize)
            .orderBy('shop_name', 'asc')
            .get()
            .then((res) => {
                return {
                    success: true,
                    code: 200,
                    data: res.data,
                };
            }
            )
        }
