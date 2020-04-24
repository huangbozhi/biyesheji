const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()
router.get('/', async (ctx) => {
	console.log('shouye')
	ctx.body = '这是首页';
})

router.post('/login', async (ctx) => {
	console.log('登录注册页面---')

	let loginUser = ctx.request.body;
	let username = loginUser.username;
	let password = loginUser.password;

	const User = mongoose.model('user')

	await User.findOne({ username: username }).exec().then(async (res) => {
		console.log(res)
		if (res) {
			console.log('登录')
			console.log(res.password, password)
			let newUser = new User()
			await newUser.comparePassword(password, res.password).then((isMatch) => {
				if (isMatch) {
					ctx.body = { code: 200, message: '登录成功' }
				} else {
					ctx.body = { code: 500, message: '登录失败' }
				}

			}).catch(err => {
				ctx.body = {
					code: 500,
					message: err,
				}
			})
		} else {
			console.log('注册')
			let newUser = new User(loginUser)
			await newUser.save().then(() => {
				ctx.body = {
					code: 200,
					message: '登录成功',
				}
			}).catch((err) => {
				ctx.body = {
					code: 500,
					message: err,
				}
			})
		}
	}).catch(err => {
		console.log(err);
		ctx.body = { code: 500, message: err }
	})
})

module.exports = router