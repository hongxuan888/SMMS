
/* 

axios发送get和post请求封装

*/

// 引入axios
import axios from 'axios'
// 引入qs
import qs from 'qs'
// 引入本地存储的封装
import local from '@/utils/local'
// 设置默认请求服务器地址
axios.defaults.baseURL = 'http://localhost:666'


/* 
  axios请求拦截器
        在axios发出请求之前拦截，让它携带一点东西再发送 （后台把数据保护了起来，增强数据的安全性，获取数据是必须要有token才可以访问）
                                                    （如果没有token保护，可以直接赋值请求数据的地址，这样可以直接访问数据）
*/
//设置请求拦截器
axios.interceptors.request.use(config => {    // axios 把自己传给 config，所以config就代表axios
    // 获取token
    let token = local.get('key')    
    config.headers.authorization = `Bearer ${token}`    //config 再自己的头部上添加了token（携带token）
    return config;
})





//暴露对象 ( 对象中有两个方法 get 和 post )
export default {
    get (url, params={}) {
        return new Promise ( (resolve, reject) => {
           axios.get(url, { params })
                .then( response => {     //成功
                    resolve( response.data )  
                })
                .catch( err => {         //失败
                    reject( err )
                })
        })
    },
    post (url, params={}) {
        return new Promise( (resolve, reject) => {
            axios.post(url, qs.stringify( params ))
                 .then( response => {     //成功
                     resolve(response.data)
                 })
                 .catch( err => {         //失败
                     reject( err )
                 })
        })
    }
}