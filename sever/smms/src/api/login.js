
/* 
登陆模块相关请求
*/

// 引入封装请求
import req from '@/utils/request'

// 登陆
export function checkLogin( params ) {
    return  req.post('/login/checklogin', params)
}