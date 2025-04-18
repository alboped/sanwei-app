import { request } from './request';

interface responseData {
  data: any;
  code: number;
  msg?: string;
}

/**
 * 获取动漫首页数据
 * @returns 动漫首页数据
 */
export const getAnimeHome = (): Promise<responseData> => {
  return request.get('/anime');
};

/**
 * 找动漫
 * @returns 找动漫数据列表
 */
export const searchAnimeList = (): Promise<responseData> => {
  return request.get('/anime/explore');
};
