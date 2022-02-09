import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/404',
    redirect: '/home',
    hidden: true
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/tokens',
  //   name: 'Tokens',
  //   children: [
  //     {
  //       path: 'tokens',
  //       name: '',
  //       component: () => import('@/views/token/index'),
  //       meta: { title: 'Tokens', icon: 'table' }
  //     }
  //   ]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'Home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Home', icon: 'house' }
      }
    ]
  },
  {
    path: '/airdrops',
    component: Layout,
    redirect: '/airdrops',
    name: 'Aridrops',
    children: [
      {
        path: '/airdrops',
        name: 'airdrops',
        component: () => import('@/views/airdrops/index'),
        meta: { 
          title: 'Airdrops', 
          icon: 'airdrop', 
          keepAlive: {
            max: 5
          } 
        }
      },
      {
        path: '/schedule',
        name: 'schedule',
        component: () => import('@/views/airdrop-schedule/index'),
        meta: { title: 'Schedule', icon: 'tree' },
        hidden: true
      },
    ]
  },    
  {
    path: '/accounts',
    component: Layout,
    redirect: '/accounts',
    name: 'Accounts',
    children: [
      {
        path: '/accounts',
        name: 'accounts',
        component: () => import('@/views/accounts/index'),
        meta: { title: 'Accounts', icon: 'wallet' }
      }
    ]
  },
  {
    path: '/lookup',
    component: Layout,
    redirect: '/lookup',
    name: 'Trustline Lookup',
    children: [
      {
        path: '/lookup',
        name: 'lookup',
        component: () => import('@/views/lookup/index'),
        meta: { title: 'Look-Up', icon: 'xummmagni' }
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    redirect: '/about',
    name: 'About Dev',
    children: [
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/index'),
        meta: { title: 'Devs', icon: 'dev' }
      }
    ]
  },
  {
    path: '/donation',
    component: Layout,
    redirect: '/donation',
    name: 'Donation',
    children: [
      {
        path: '/donation',
        name: 'donation',
        component: () => import('@/views/donation/index'),
        meta: { title: 'Typoon Odette PH' },
        hidden: true
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true },
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
