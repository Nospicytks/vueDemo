import axios from 'axios'
import Qs from 'qs'
import {Modal, notification} from 'ant-design-vue'

import routerfrom from '../router/index.js'
// https://parktest.test.utools.club
// http://daranzhibojiekou.daranjituan.com
var baseurl = 'http://daranzhibojiekou.daranjituan.com/admin/'

// 创建一个axios实例
const service = axios.create({
  baseURL: baseurl,
  // headers: {
  //   'Content-Type': 'multipart/form-data',
  //   'Accept': 'application/json'
  // },
  transformRequest:[function(data){
    return Qs.stringify(data)
  }],
  timeout: 10000
});

// service.defaults.withCredentials = true;
// 添加请求拦截器
service.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token')
  // if (token) {
  //   config.headers[ 'X-Access-Token' ] = token // 让每个请求携带token
  // }
  if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
    config.data = Qs.stringify(config.data)
  }
  return config;
},error => {
  // 请求错误做些事
  return Promise.reject(error);
});

// 添加相应拦截器
service.interceptors.response.use(response => {
  const res = response.data;
  const token = sessionStorage.getItem('token')
  // 如果返回的状态码不是200 就主动报错
  switch (res.code) {
    case 401: //token失效
        sessionStorage.removeItem('token')
        Modal.error({
          title: '登录已失效',
          content: '已过期',
          okText: '重新登录',
          mask: false,
          onOk: () => {
            routerfrom.push('/')
          }
        })
    break;   
  }
  return response;
},error => {
  // 返回接口的错误信息
  return Promise.reject(error);
  console.log(error)
})
export default service
