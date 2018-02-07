import Vue from 'vue'
import Router from 'vue-router'

//import pages
import Index from '@/pages/Index'
import Index_Cards from '@/pages/index/cards/Cards'
import Index_Cards_Hot from '@/pages/index/cards/children/Hot'
import Index_Cards_Interested from '@/pages/index/cards/children/Interested'

import Publish from '@/pages/Publish'
import Details from '@/pages/Details'


import Test1 from '@/pages/Test1'
import Test2 from '@/pages/Test2'
import Emotions from '@/pages/Emotions'

Vue.use(Router)

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect: '/index/cards',
      children: [
        {
          path: 'cards',
          name: 'index_cards',
          redirect: '/index/cards/hot',
          component: Index_Cards,
          children: [
            {
              path: 'hot',
              name: 'index_cards_hot',
              component: Index_Cards_Hot
            },
            {
              path: 'interested',
              name: 'index_cards_interested',
              component: Index_Cards_Interested
            }
          ]
        }
      ]
    },
    {
      path: '/publish',
      name: 'publish',
      component: Publish
    },
    {
      // 这个地方要改成命名路由
      path: '/details',
      name: 'details',
      component: Details
    },
    {
      path: '/test1',
      name: 'test1',
      component: Test1
    },
    {
      path: '/test2',
      name: 'test2',
      component: Test2
    },
    {
      path: '/emotions',
      name: 'text',
      component: Emotions
    }
  ]
})
