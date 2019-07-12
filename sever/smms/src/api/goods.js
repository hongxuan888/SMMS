

/* 
商品管理模块相关请求
*/

// 引入封装请求
import req from '@/utils/request'



// 添加商品
export function goodsAdd ( params ) {
    return req.get('/goods/goodsadd', params)
}

// 刷新商品数据列表
export function goodsList ( params ){
    return req.get('/goods/goodslist', params)
}

//请求数据列表
export function goodsListByPage ( params ) {
    return req.get('/goods/goodslistbypage', params)
}

//删除单挑数据列表
export function delGoodsList ( params ) {
    return req.get('/goods/delgoodslist', params)
}

// 编辑数据列表
export function reqGoodsList ( params ){
    return req.post('/goods/reqgoodslist', params)
}


/* 
// 高级查询
export function goodsSeeAbout( params ){
    return req.get('/goods/goodsseeabout', params)
}
*/

