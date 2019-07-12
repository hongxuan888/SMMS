
/* 

连接数据库模块

*/


// 引入mysql模块
const mysql = require('mysql')

// 创建连接对象
const connection = mysql.createConnection({
    host:'localhost',  //连接的数据库地址
    user:'root',   //用户名
    password:'root', //密码
    database:'SMMS',  //数据库名
    // port:'3306'         //这是数据库默认端口，如果更改了端口就必须加上端口号
})

// 执行连接方法
connection.connect()

console.log('数据库连接成功......')

// 暴露对象
module.exports = connection