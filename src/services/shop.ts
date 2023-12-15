/*
 * @Author: 兼爱
 * @Date: 2023-11-02 02:26:08
 * @LastEditTime: 2023-12-08 03:26:59
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
    const batchSize = 20; // 每个批次的数据数量
    let hasMore = true; // 是否有更多数据
    let skipCount = 0; // 初始跳过的数据数量
    const result = []; // 最终结果数组
  
       const { makeup, photo_shoot, province = '', city = '' } = params || {};
    while (hasMore) {
    
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
  
      const batchResult = await collectionShopOffline
        .where(query)  
        .skip(skipCount)
        .limit(batchSize)
        .get()
      const data = batchResult.data; 
      result.push(...data); // 将本次查询结果加入总结果数组
      
  
      if (data.length < batchSize) {
        // 如果返回的数据少于batchSize，说明没有更多数据了
        hasMore = false;
      } else {
        skipCount += batchSize; // 准备跳过之前已加载的数据
      }
    }
    
     // 对累积的结果数组 result 进行处理，类似于 res.data.map 的操作
     const processedResult = result.map(item => ({
        ...item,
        supports: [!!(Number(item.makeup)) && "妆造", !!(Number(item.photo_shoot)) && "摄影"].filter(i => i),
    }));
    processedResult.sort((a, b) => {
        // 使用 localeCompare 比较中文字符串
        // 传递 'zh-Hans-CN' 作为 locales 参数进行中文排序
        return a.shop_name.localeCompare(b.shop_name, 'zh-Hans-CN', { sensitivity: 'accent' });
    });
 // 返回处理后的结果集
 return {
    success: true,
    code: 200,
    data: processedResult,
};
  };
  export const searchOnlineShop = async (params?: any) => {
    const batchSize = 20; // 每个批次的数据数量
    let hasMore = true; // 是否有更多数据
    let skipCount = 0; // 初始跳过的数据数量
    const result = []; // 最终结果数组
  
       const { store_source, style } = params || {};
    while (hasMore) {
    //定义查询条件
      const query: any = {
        status: _.eq(true),
        store_source: store_source?.length ? _.in(store_source) : undefined,
        style: style?.length ? _.all(style) : undefined,
    }
  
      const batchResult = await collectionShopOnline
        .where(query)  
        .skip(skipCount)
        .limit(batchSize)
        .get()
      const data = batchResult.data; 
      result.push(...data); // 将本次查询结果加入总结果数组
      
      if (data.length < batchSize) {
        // 如果返回的数据少于batchSize，说明没有更多数据了
        hasMore = false;
      } else {
        skipCount += batchSize; // 准备跳过之前已加载的数据
      }
    }
    const processedResult = result;
    processedResult.sort((a, b) => {
        // 确保 shop_name 是存在且为字符串，否则返回0
        if (typeof a.shop_name !== 'string' || typeof b.shop_name !== 'string') {
            return 0;
        }
        
        // 使用 localeCompare 比较中文字符串
        // 传递 'zh-Hans-CN' 作为 locales 参数进行中文排序
        return a.shop_name.localeCompare(b.shop_name, 'zh-Hans-CN', { sensitivity: 'accent' });
    });
    
  // 返回处理后的结果集
  return {
    success: true,
    code: 200,
    data: processedResult,
  };
  };
 
    export const searchShopStyle = async () => {
  const batchSize = 10; // 每个批次的数据数量
  let skipCount = 0; // 初始跳过的数据数量
  const result = [];

  while (true) {
    const res = await dbTest
      .collection('knowledge_set')
      .field({
        style: true,
      })
      .skip(skipCount)
      .limit(batchSize)
      .get();

    const data = res.data.map((item) => item.style);
    result.push(...data);

    if (res.data.length < batchSize) {
      break;
    }

    skipCount += batchSize;
  }

  const uniqueStyles = Array.from(new Set(result)).map((item) => ({
    value: item,
    label: item,
  }));

  return uniqueStyles;
};
