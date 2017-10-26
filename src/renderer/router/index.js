import Vue from 'vue'
import Router from 'vue-router'
import route from '@/module/route.js'

Vue.use(Router)

const routes = []
routes.push(...route)
// Array.prototype.push.apply(routes, route)

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes
})
