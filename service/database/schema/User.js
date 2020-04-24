const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let ObjectId = Schema.Types.ObjectId;

const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

// 创建user schema
const userSchema = new Schema({
	UserId: { type: ObjectId },
	username: { unique: true, type: String },
	password: { type: String },
	creatTime: { type: Date, default: Date.now },
})

userSchema.pre('save', function (next) {
	bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
		if (err) return next(err)
		bcrypt.hash(this.password, salt, (err, hash) => {
			if (err) return next(err)
			this.password = hash;
			next()
		})
	})
})

userSchema.methods = {
	comparePassword: (_password, password) => {
		return new Promise((reslove, reject) => {
			bcrypt.compare(_password, password, (err, isMatch) => {
				if (!err) reslove(isMatch)
				else reject(err)
			})
		})
	}
}

// 发布模型
mongoose.model('user', userSchema) // 与表名一致