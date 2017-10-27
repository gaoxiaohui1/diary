import Vue from 'vue'
import Router from 'vue-router'
import route from '@/module/route.js'

Vue.use(Router)

const routes = []
routes.push(...route)

export default new Router({
  routes
})
