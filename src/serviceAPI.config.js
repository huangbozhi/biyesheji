// const BASEURL = "https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/"
const LOCALURL = "http://localhost:3000/"
const URL = {
    login: LOCALURL + 'user/login',       // 用户登录注册接口
    add: LOCALURL + 'info/add',           // 用户添加表单
    modify: LOCALURL + 'info/modify',     // 用户修改表单
    query: LOCALURL + 'info/query',       // 通过姓名和身份证查找用户
    queryAll: LOCALURL + 'info/queryAll', // 查询所有用户
    delete: LOCALURL + 'info/delete',     // 用户删除信息
}

module.exports = URL