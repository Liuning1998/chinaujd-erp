import {
  get,
  post,
  postExport
} from '@/api/axios'

let baseURL = '';

if (process.env.NODE_ENV == 'development') { //开发环境
	baseURL = 'http://172.18.3.11:8070';
} else if (process.env.NODE_ENV == 'production') { //生产环境地址
  baseURL = 'http://zuul.5g.silkeroad.cn';
} else if (process.env.NODE_ENV == 'testing') { //测试环境地址
  baseURL = 'http://msg5gtest.zuul.srpqa.top';
}

export function login() {};
export function getImageCode() {};
/**
 * 财务中心 Start
 * */

/**
 * 财务中心 End
 * */


