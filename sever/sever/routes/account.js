var express = require('express');
var router = express.Router();



// 统一设置响应头解决跨域( 所有请求都必须都要执行这一步 )
router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header("Access-Control-Allow-Headers", "authorization");
    next()  //放行，执行下一步
})

// 引入数据库连接模块
const connection = require('./js/conn')

//测试
router.get('/', (req, res, next) => {
    res.send('测试账号管理模块路由')

})

// 添加账号
router.post('/accountadd', (req, res,) => {
    //接受参数
    let { account, password, selectGrouping } = req.body
    // 默认头像
    let avatarUrl = `/upload/icon.jpg`
    //准备sql
    const sqlstr = `insert into accounts(account, password, selectGrouping, avatarUrl) values("${account}","${password}","${selectGrouping}","${avatarUrl}")`
    //执行sql
    connection.query(sqlstr, (err, data) => {
    if( err ) throw err;
    console.log( data )
    // 判断
    if(data.affectedRows > 0){
        res.send({code:0, reason:'添加账号成功'})  //响应成功的数据给前端
    } else {
        res.send({code:1, reason:'添加账号失败'})  //响应失败的数据给前端
    }
    })
   
})

// //账号列表
// router.get('/accountlist',(req, res) => {
//     // 准备sql（查询数据库中的所有数据，响应给前端）
//     const sqlstr = 'select * from accounts order by ctime desc'
//    //执行sql
//    connection.query(sqlstr, (err, data) => {
//        if(err) throw err;
//         res.send({data})  //响应数据给前端
//    })
    
// })

// 根据分页返回账号列表   
router.get('/accountlistbypage',(req, res) => {
    // 接收前端的参数
    let {pageSize, currentPage} = req.query
    // 定义变量保存数据总数
    let total;
    // 准备sql
    let sqlstr = `select * from accounts order by ctime desc`
    // 执行sql
    connection.query(sqlstr,(err, data) => {
        if(err) throw err;
        total = data.length    //把数组的长度（数据的条数）赋值给total
    })
    //准备sql (按照分页查找数据)
    sqlstr += ` limit ${(currentPage - 1) * pageSize}, ${pageSize}`
     console.log(sqlstr)
    // 执行sql
    connection.query(sqlstr, (err, data) => {
        if(err) throw err;
        res.send({total, data})
    })
})

// 账号列表删除功能
router.get('/accountlistdel', (req, res) =>{
    //接收前端发送的数据
    let { id } = req.query
    // 准备sql
    const sqlstr = `delete from accounts where id=${ id }`
    // 执行sql
    connection.query(sqlstr,(err, data) => {
        // 如果有错误就抛出错误
        if(err) throw err;
        // 判断
        if(data.affectedRows > 0){ //成功
            // 响应成功的数据
            res.send({ code:0, reason:'删除成功'})
        } else {   //失败
            //响应失败的数据
            res.send({ code:1, reason:'删除失败'})
        }
    })
    
   
})

//账号列表编辑功能
router.get('/accountlistredact', (req, res) => {
    // 接收前端参数
    let { id } = req.query;
    // 准备sql
    const sqlstr = `select * from accounts where id=${ id }`
    // 执行sql
    connection.query(sqlstr,( err, data ) => {
        if(err) throw err;
        res.send({ data })
    })
   
  
})

// 账号回填模态框
router.post('/accountlistredactbymodalbox', (req, res) => {
    // 接收前端的参数
    let {account, selectGrouping, id} = req.body
    // 准备sql
    const sqlstr = `update accounts set selectGrouping='${selectGrouping}',account=${account} where id=${id}`
    //执行sql
    connection.query(sqlstr,(err, data) => {
        if(err) throw err;
        // 判断
        if(data.affectedRows > 0){  //成功
            res.send({code:0,reason:'修改数据成功'})
        } else {  //失败
            res.send({code:1,reason:'修改数据失败'})
        }
        
    })
})

//批量删除
router.get('/accountlistbatchdel', (req, res) => {
    //接收前端的参数
    let { Arr } = req.query
    // 准备sql
    const sqlstr = `delete from accounts where id in (${ Arr })`
    //执行sql
    connection.query(sqlstr, (err, data)=> {
        if(err) throw err;
        // 判断
        if(data.affectedRows > 0){
            res.send({code:0, reason:'删除数据成功'})
        } else {
            res.send({code:1, reason:'数据删除失败'})
        }
    })  
})

// 原密码核对
router.post('/checkoldpassword',(req, res) => {
    // 接收前端的参数
    let { oldPwd } = req.body
    console.log(req.user.password)
    //判断
    if(oldPwd === req.user.password){
        res.send({code:0, reason:''})
    } else {
        res.send({code:1, reason:'密码不对，请填写正确的密码'})
    }
})

// 修改密码
router.post('/amendpassword',(req, res) => {
    // 接收前端的参数
    let { newPwd } = req.body
    // 获取当前用户id
    let id = req.user.id
    //准备sql
    const sqlstr = `update accounts set password=${newPwd} where id=${id}`
    // console.log(sqlstr)
    // 执行sql
    connection.query(sqlstr, (err, data) => {
        if(err) throw err;
        // 判断
        if(data.affectedRows > 0){  //成功
            res.send({code:0, reason:'修改密码成功,请重新登陆'})
        } else {   //失败
            res.send({code:1, reason:'修改密码失败'})
        }
    })
})

// 请求账户信息
router.get('/getuserinfo', (req, res) => {
    // 获取账户名称
    let account = req.user
    res.send( account )
})

// 请求个人中心信息
router.get('/accountmessage', (req, res) => {
    // 获取账户名称
    let account = req.user
    res.send( account )
})

// 权限请求
router.get('/jurisdiction', (req, res) => {
    // 获取账户用户组
    let selectGrouping = req.user.selectGrouping
    res.send({ selectGrouping })
})



//暴露路由 
module.exports = router;
