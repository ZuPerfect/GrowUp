/*
 * @Author: zhupengfei6623
 * @Date: 2020-10-14 15:27:28
 * @Description: file content
 */

import Vue from 'vue'
import Router from 'vue-router'
// 如果用import引入的话，当项目打包时路由里的所有component都会打包在一个js中，造成进入首页时，需要加载的内容过多，时间相对比较长。
// import MainPage from '@/components/MainPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      // 当你用nodeJS中的require这种方式引入的时候，会将你的component分别打包成不同的js，加载的时候也是按需加载，只用访问这个路由网址时才会加载这个js。
      component: resolve => require(['../components/MainPage.vue'], resolve)
    }
  ]
})
