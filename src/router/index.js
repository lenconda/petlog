import Vue from 'vue'
import Router from 'vue-router'

//import pages
import Index from '@/pages/Index'
import Index_Cards from '@/pages/index/Cards'
import Index_Cards_Hot from '@/pages/index/cards/Hot'
import Index_Cards_Interested from '@/pages/index/cards/Interested'
import Index_Timeline from '@/pages/index/Timeline'

import Publish from '@/pages/Publish'
import Details from '@/pages/Details'

import Start from '@/pages/Start'


import Test1 from '@/temp/Test1'
import Test2 from '@/temp/Test2'
import Emotions from '@/temp/Emotions'

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
        },
        {
          path: '/index/timeline',
          name: 'index_timeline',
          component: Index_Timeline
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
      path: '/start',
      name: 'start',
      component: Start
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
