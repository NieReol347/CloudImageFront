// 创建axios实例
import router from '@/router'
import axios from 'axios'
// 区分开发和生产环境
const DEV_BASE_URL = "http://localhost:8080";
const PROD_BASE_URL = "http://101.43.45.110";
// 创建 Axios 实例
const myaxios = axios.create({
  baseURL: PROD_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// const myaxios = axios.create({
//   baseURL: DEV_BASE_URL,
//   // baseURL: '', //访问默认地址
//   timeout: 60000,
//   withCredentials: true, //是否携带cookie
// })

// 添加请求拦截器
myaxios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
myaxios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    const { data } = response
    // 未登录
    if (data.code == 40010) {
      // 不是获取用户信息的请求，并且用户目前不是已经在用户登录页面，则跳转到登录页面
      if (
        !response.request.responseURL.includes('user/get/login') &&
        !window.location.pathname.includes('user/get/login')
      ) {
        message.warning('请先登录')
        window.location.href = `/user/login?redirect=${window.location.href}`
      }
    }
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)

export default myaxios
