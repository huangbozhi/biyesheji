const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let ObjectId = Schema.Types.ObjectId;

// 创建info schema
const infoSchema = new Schema({
    UserId: { type: ObjectId },
    username: { type: String },
    idCard: { unique: true, type: String },
    sex: { type: String },
    xueli: { type: String },
    school: { type: String },
    creatTime: { type: Date, default: Date.now },
})

mongoose.model('info', infoSchema) // 与表名一致