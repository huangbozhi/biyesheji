const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()
router.get('/', async (ctx) => {
  console.log('首页')
  ctx.body = '这是首页';
})

router.post('/add', async (ctx) => {
  console.log('这是添加')

  let addIfon = ctx.request.body
  const Info = mongoose.model('info')

  await Info.findOne({ username: addIfon.username, idCard: addIfon.idCard }).exec().then(async (res) => {
    if (res) {
      ctx.body = {
        code: 403,
        message: '已存在该用户',
      }
    } else {
      let newInfo = Info(addIfon)
      await newInfo.save().then(() => {
        ctx.body = {
          code: 200,
          message: '添加成功',
        }
      }).catch(err => {
        ctx.body = {
          code: 500,
          message: err,
        }
      })
    }
  })

})

router.post('/modify', async (ctx) => {
  console.log('这是修改')
  let user = ctx.request.body;
  console.log(user.idCard)
  const Info = mongoose.model('info');
  await Info.updateOne({ idCard: user.idCard }, user, (err, res) => {
    // console.log(res)
    if (!err) {
      console.log('11')
      ctx.body = {
        code: 200,
        message: '修改成功',
      }
    } else {
      console.log('00')
      ctx.body = {
        code: 200,
        message: '修改失败',
      }
    }
  })

})

router.post('/query', async (ctx) => {
  console.log('这是按条件查找---')
  let info = ctx.request.body;
  const Info = mongoose.model('info');
  await Info.findOne({ username: info.username, idCard: info.idCard }).exec().then(async (res) => {
    if (!res) {
      ctx.body = {
        code: 500,
        data: {},
      }
    } else {
      ctx.body = {
        code: 200,
        data: res
      }
    }
  })
})

router.post('/queryAll', async (ctx) => {
  console.log('这是查找所有---')
  const Info = mongoose.model('info');
  await Info.find().exec().then(async (res) => {
    if (res) {
      ctx.body = {
        code: 200,
        data: res,
      }
    } else {
      ctx.body = {
        code: 500,
        data: {}
      }
    }
  })
})

router.delete('/delete', async (ctx) => {
  let user = ctx.request.body;
  const Info = mongoose.model('info');
  await Info.remove({ idCard: user.idCard }, (err, res) => {
    if (err) {
      ctx.body = {
        code: 500,
        message: '删除失败',
      }
      console.log(err)
    } else {
      ctx.body = {
        code: 200,
        message: '删除成功',
      }
    }
  })
})

module.exports = router