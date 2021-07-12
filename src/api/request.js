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


/**
 * 上传导出 Start
 * */
// 图片上传
let imageUploadUrl = baseURL + '/message-base/upload/img';

// 媒体文件上传
let fileUploadUrl = baseURL + '/message-base/upload/file';
export {
  imageUploadUrl,
  fileUploadUrl
}

