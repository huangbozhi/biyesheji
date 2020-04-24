import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/index'
import Header from '@/components/header'
import Query from '@/components/query'
import Add from '@/components/add'
import Preview from '@/components/preview'
import Modify from '@/components/modify'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      // name: '/header',
      component: Header,
      children: [
        {
          path: '/',
          name: 'Index',
          component: Index,
        },
        {
          path: 'index',
          name: 'index',
          component: Index,
        },
        {
          path: 'query',
          name: 'query',
          component: Query,
        },
        {
          path: 'add',
          name: 'add',
          component: Add,
        },
        {
          path: 'preview',
          name: 'preview',
          component: Preview,
        },
        {
          path: 'modify',
          name: 'modify',
          component: Modify,
        },
      ]
    },
    {
      path: '/',
      redirect: '/login',
    },
  ]
})
