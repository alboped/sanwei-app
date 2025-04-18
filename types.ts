// 分页数据
export type limitData = {
  list: [];
  total: number;
}

// 电影项
export type movieItem = {
  title: string; // 电影名
  poster: string; // 海报图片
  score: string; // 评分
  subtitle?: string; // 副标题
}