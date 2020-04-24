const Koa = require('koa');
const app = new Koa();
const { connect, initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

app.use(bodyParser())
app.use(cors())

const Router = require('koa-router')

let user = require('./api/user.js')
let info = require('./api/info.js')

// 装载子所有路由
let router = new Router()
router.use('/user', user.routes())
router.use('/info', info.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

  ; (async () => {
    await connect();
    initSchemas()
    // const User = mongoose.model('user')
    // let oneUser = new User({ username: 'hbz02', password: '123456' })
    // oneUser.save().then(() => {
    //   console.log('插入成功')
    // })
    // 查询
    // let user = await User.findOne({username: 'hbz01'}).exec()
    // console.log(user)
  })()

app.use(async (ctx) => {
  ctx.body = `<h1>123456</h1>`;
});

app.listen(3000, () => {
  console.log('server is staring at port 3000')
})