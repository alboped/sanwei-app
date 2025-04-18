import { create } from './create';
import { baseUrl } from '@/constants/Config';

const request = create({
  baseURL: baseUrl,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const { loading = false, url } = config;
    // 上传的不要替换
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    }
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    // config.headers['SYT-AUTH-TOKEN'] = token;

    // if (loading) {
    //   Toast.loading(typeof loading === 'string' ? loading : '');
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const {
      data,
      config: {
        loading = false, // 是否显示loading
        errorToast = true, // 是否弹出错误信息
        errorTypeToCatch = true, // 是否将errorType作为异常处理
      },
    } = response;
    if (loading) {
      // Toast.hide();
    }
    if (data && data.errorType && errorTypeToCatch) {
      // // errorType不为空，作为异常处理
      // errorToast && Toast.info(data.message);
      return Promise.reject(data);
    }
    return data;
  },
  (error) => {
    const { response: { status, data } = {} } = error;
    let message = '系统异常，请稍后重试！';

    if (typeof data === 'string' && !!data) {
      message = data;
    } else if (data?.message) {
      message = data.message;
    }

    return Promise.reject(error);
  },
);

export { request };
