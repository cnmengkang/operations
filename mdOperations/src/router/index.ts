import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Layout from "@/layout/index.vue"  //布局文件
import home from "@/views/home.vue"  //主页
import aiFunction from "@/views/analyze/aiFunction.vue"  //ai数据分析
import aiHistory from "@/views/aiHistory/AiHistory.vue"  //ai历史记录
import base from "@/views/analyze/base.vue"  //基础功能
import deviceActivation from '@/views/analyze/deviceActivation.vue';
import system from '@/views/analyze/system/system.vue';
import dictation from "@/views/analyze/dictation.vue"
import download from "@/views/analyze/download.vue"
import test from "@/views/analyze/test.vue"
import token from "@/views/analyze/token.vue"
import ocr from "@/views/analyze/ocr.vue"
import robot from "@/views/analyze/robot/robot.vue"
import login from "@/views/login.vue"
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Layout,
        redirect:"/business",
        children: [
            {
                name: "business",
                path: '/business',
                component: home,
            },
            {
                name: 'aiFunction',
                path: '/aiFunction',
                component: aiFunction,
            },
            {
                name: 'base',
                path: '/base',
                component: base
            },
            {
                name: 'deviceActivation',
                path: '/deviceActivation',
                component: deviceActivation
            },
            {
                name: 'system',
                path: '/system',
                component: system
            },
            {
                name: 'dictation',
                path: '/dictation',
                component: dictation
            },
            {
                name: 'ocr',
                path: '/ocr',
                component: ocr
            },
            {
                name: 'download',
                path: '/download',
                component: download
            },
            {
                name: 'token',
                path: '/token',
                component: token
            },
            {
                name: 'robot',
                path: '/robot',
                component: robot
            },
            {
                name: 'aiHistory',
                path: '/aiHistory',
                component: aiHistory
            },
            {
                name: 'test',
                path: '/test',
                component: test
            },
        ],
    },
    {
        name: "Login",
        path: '/login',
        component: login,
    },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
// 导航守卫
router.beforeEach((to, _from:any, next) => {
    const account = localStorage.getItem('account');
    const password = localStorage.getItem('password');
    if (!account && !password) {
        if (to.path === '/login') {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})
export default router