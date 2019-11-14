import Router from 'vue-router'
import Vue from 'vue'
import home from '@/components/home'
import login from '@/components/login'
import logout from '@/components/logout'
import register from '@/components/register'
import account from '@/components/account'
import checkAuth from '../common/checkAuth'
import dashboard from '@/components/dashboard'
import completed from '@/components/completedTasks'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: dashboard
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/logout',
            name: 'logout',
            component: logout
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/account',
            name: 'account',
            component: account
        },
        {
            path: '/completed',
            name: 'completed',
            component: completed
        }        
    ]
})

router.beforeEach(checkAuth)

export default router