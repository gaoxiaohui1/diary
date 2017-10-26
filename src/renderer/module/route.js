import login from './login.vue'
import regist from './regist.vue'
import list from './list.vue'
import detail from './detail.vue'
import add from './add.vue'

export default [{
  path: '/regist',
  component: regist,
  name: '注册'
},
{
  path: '/login',
  component: login,
  name: '登陆'
},
{
  path: '/list',
  component: list,
  name: '列表'
},
{
  path: '/detail',
  component: detail,
  name: '详情'
},
{
  path: '/add',
  component: add,
  name: '新增'
},
{
  path: '/',
  component: login,
  name: 'login'
},
{
  path: '*',
  redirect: '/'
}]
