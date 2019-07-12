

/* 
账号管理模块相关请求
*/

// 引入封装请求
import req from '@/utils/request'

// 账号添加
export function accountAdd ( params ) {
    return  req.post('/account/accountadd',  params )
}


// 批量删除
export function accountlistbatchdel ( params ){
    return req.get("/account/accountlistbatchdel", params)
}

// 编辑
export function accountlistredact( params ) {
    return  req.get("/account/accountlistredact", params)
}

// 单条删除
export function accountlistdel( params ) {
    return  req.get("/account/accountlistdel", params)
}

// 根据分页请求数据
export function accountlistbypage( params ) {
    return  req.get("/account/accountlistbypage", params)
}

// 模态框确认
export function accountlistredactbymodalbox ( params ) {
    return req.post("/account/accountlistredactbymodalbox", params)
}

//原密码验证
export function checkOldPassword ( params ){
    return req.post('/account/checkoldpassword', params)
}

//修改密码
export function amendPwd( params ){
    return req.post('/account/amendpassword', params)
}

// 请求账户信息
export function getUserInfo(){
    return req.get('/account/getuserinfo')
}

// 请求个人中心信息
export function accountMessage(){
    return req.get('/account/accountmessage')
}
// 权限请求
export function reqJurisdiction(){
    return req.get('/account/jurisdiction')
}