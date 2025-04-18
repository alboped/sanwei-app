import { request } from './request';

interface responseData {
  data: any;
  code: number;
  msg?: string;
}

/**
 * 获取电影首页数据
 * @returns 电影首页数据列表
 */
export const getMovieHome = (): Promise<responseData> => {
  return request.get('/movie');
};

/**
 * 找电影
 * @returns 电影首页数据列表
 */
export const searchMovieList = (): Promise<responseData> => {
  return request.get('/movie/explore');
};
