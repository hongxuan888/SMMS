var express = require('express');
var router = express.Router();


// 设置响应头，解决跨域问题
router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header("Access-Control-Allow-Headers", "authorization");
    
    next()
})

// 引入数据库连接
const connection = require('./js/conn')

// 添加商品
router.get('/goodsadd', (req, res) => {
    //接收前端的传参数
    let {barCode, goodsName, category, costPrice, salePrice, marketPrice, stockCount, goodsWeight, goodsUnit, vipDiscount, promotion, goodsDesc} = req.query
    //准备sql
    const sqlstr = `insert into goods(barCode, goodsName, category, costPrice, salePrice, marketPrice, stockCount, goodsWeight, goodsUnit, vipDiscount, promotion, goodsDesc) value(?,?,?,?,?,?,?,?,?,?,?,?)`
    // 参数
    const sqlparams = [barCode, goodsName, category, costPrice, salePrice, marketPrice, stockCount, goodsWeight, goodsUnit, vipDiscount, promotion, goodsDesc]
    // 执行sql
    connection.query(sqlstr, sqlparams, (err, data) => {
        if(err) throw err;
        //判断
        if(data.affectedRows > 0){ //成功
            res.send({code:0, reason:'添加商品成功'})
        } else {  //失败
            res.send({code:1, reason:'添加商品失败'})
        }
    })
})

// 刷新商品数据列表
router.get('/goodslistbypage', (req, res) => {
    // 接收前端的参数
    let {pageSize, currentPage, classify, keyword} = req.query
    // 准备sql
    let sqlstr = `select * from goods where 1=1`
    // 定义变量保存数据的总数
    let total;

    // 判断
     if(classify !== '' && classify !== '全部分类'){
        //拼接第一个查询条件
        sqlstr += ` and category='${classify}'`
    }
    if(keyword !== ''){
        //拼接第二个查询条件
        sqlstr += ` and (barCode like '%${keyword}%' or goodsName like '%${keyword}%')`
    }
    // 拼接sql 排序
    sqlstr +=` order by ctime desc`

    //执行sql
    connection.query(sqlstr, (err, data) => {
        if(err) throw err;
        total = data.length
    })
    //准备sql
    let n = (currentPage - 1) *pageSize
    sqlstr += ` limit ${ n },${pageSize}`   
    //执行sql
    connection.query(sqlstr, (err, data) => {
        if(err) throw err;
        res.send({total, data})
    }) 
})

//删除单条数据列表
router.get('/delgoodslist', (req, res) => {
    // 接收前端的参数
    let { id } = req.query
    // 准备sql
    const sqlstr = `delete from goods where id=${ id }`
    //执行sql
    connection.query(sqlstr, (err, data) => {
        if(err) throw err;
        //判断
        if(data.affectedRows > 0){  //成功
            res.send({code:0, reason:'删除数据成功'})
        } else {  //失败
            res.send({code:1, reason:'删除数据失败'})
        }
    })
})

// 编辑数据列表
router.post('/reqgoodslist', (req, res) => {
    // 接收前端的参数
    res.send('111')
})


/* 
// 高级查询
router.get('/goodsseeabout', (req, res) => {
    // 获取前端参数
    let { classify, keyword } = req.query
    // 准备sql
    let sqlstr = `select * from goods where 1=1`
    // 判断
    if(classify !== '' && classify !== '全部分类'){
        //拼接第一个查询条件
        sqlstr += ` and category='${classify}'`
    }
    if(keyword !== ''){
        //拼接第二个查询条件
        sqlstr += ` and (barCode like '%${keyword}%' or goodsName like '%${keyword}%')`
    }
    // 执行sql
    connection.query(sqlstr, (err, data) => {
        if(err) throw err;
        res.send({ data })
    })
})
*/







//暴露路由 
module.exports = router;