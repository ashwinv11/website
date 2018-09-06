import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import VueAnalytics from 'vue-analytics'
import Home from './views/Home.vue'

Vue.use(Router)
Vue.use(Meta)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/projects',
      name: 'projects',
      // route level code-splitting
      // this generates a separate chunk (projects.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "projects" */ './views/Projects.vue'),
    },
    {
      path: '/projects/:slug',
      name: 'project',
      component: () =>
        import(/* webpackChunkName: "project" */ './views/Project.vue'),
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: 'Ashwin Vaswani // About',
      },
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    { path: '*', redirect: { name: 'home' } },
  ],
  scrollBehavior(to, from, savedPosition) {
    document.getElementsByClassName('app__content')[0].scrollTo(0, 0)
  },
})

Vue.use(VueAnalytics, {
  id: 'UA-50628910-2',
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production',
  },
  set: [{ field: 'anonymizeIp', value: true }],
  router,
})

export default router
