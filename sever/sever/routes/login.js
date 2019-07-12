var express = require('express');
var router = express.Router();

//设置响应头，解决跨域问题
router.all('*',(req, res, next) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header("Access-Control-Allow-Headers", "authorization");
    
    next()
})

//引入数据库连接模块
const connection = require('./js/conn')

// 引入jwt
const jwt= require('jsonwebtoken');
// 定义秘钥
const secret = 'itsource';

// 账号登陆
router.post('/checklogin',(req, res)=> {
    // 接收前端的参数
    let {account, password} = req.body
    // 准备sql
    const sqlstr = `select * from accounts where account='${account}' and password='${password}'`
    //执行sql
    connection.query(sqlstr, (err, data) => {
        if(err) throw err;
        //判断
        if(data.length){
            // 生成token
            const token = jwt.sign(Object.assign({},data[0]), secret, {
                expiresIn:  60 * 60 * 2 // 过期时间
            });
            // console.log(token)
            res.send({code:0,reason:'账号登陆成功',token})
        } else {
            res.send({code:1,reason:'请核对账号和密码'})
        }
    })
})









//暴露路由 
module.exports = router;