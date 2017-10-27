import axios from 'axios'

// 创建axios实例
const service = axios.create({
  timeout: 5 * 1000 // 请求超时时间
})

// response拦截器
service.interceptors.response.use(
  response => {
    const data = response.data // 返回数据格式{IsSuccess:true,Msg:'',ReturnValue:{data:[]}}
    if (data.IsSuccess) {
      return Promise.resolve(data)
    } else {
      return Promise.reject(data)
    }
  },
  err => {
    console.log(err)
    const errData = { IsSuccess: false, Msg: '接口错误' }
    return Promise.reject(errData)
  }
)

export default service
