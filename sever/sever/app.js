var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 引入子路由
var accountRouter = require('./routes/account');   //账号管理模块
var loginRouter = require('./routes/login');   //账号登陆模块
var goodsRouter = require('./routes/goods');   //商品管理模块


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


/*-------- 拦截所有请求，请求中必须携带token ---------- */
//引入
const expressJwt = require('express-jwt');
//定义密钥
const secret = 'itsource';

//使用中间件验证token合法性 ，如果不合法就抛出错误
app.use(expressJwt ({
  secret
}).unless({
  path: ['/login/checklogin','/upload/icon.jpg']  //除了这些地址，其他的URL都需要验证（ 登陆页面不用验证 ）
}));

//拦截器
app.use(function (err, req, res, next) {
  //当token验证失败时会抛出如下错误
  if (err.name === 'UnauthorizedError') {   
      //这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
      res.status(401).send('携带的时无效的token，无法拿到数据');   //401是token无效的错误
  }
});




/* --------拦截请求结束 ------------------------------ */



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//分配子路由
app.use('/account', accountRouter);
app.use('/login', loginRouter);
app.use('/goods', goodsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// 监听端口
app.listen(666,() =>{
  console.log('服务器启动成功，地址是http://localhost:666')
})
module.exports = app;
