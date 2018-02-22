import Vue from 'vue'
import Router from 'vue-router'

//import pages
import Index from '@/pages/Index'
import Index_Cards from '@/pages/index/Cards'
import Index_Cards_Hot from '@/pages/index/cards/Hot'
import Index_Cards_Interested from '@/pages/index/cards/Interested'
import Index_Timeline from '@/pages/index/Timeline'

import Auth from '@/pages/Auth'
import Auth_Register from '@/pages/auth/Register'
import Auth_Login from '@/pages/auth/Login'

import Publish from '@/pages/Publish'
import Details from '@/pages/Details'

import Start from '@/pages/Start'

import Profile from '@/pages/Profile'
import Profile_Following from '@/pages/profile/Following'
import Profile_Followers from '@/pages/profile/Followers'
import Profile_Modify from '@/pages/profile/Modify'
import Profile_Mine from '@/pages/profile/Mine'

import Pets from '@/pages/Pets'
import Pets_Add from '@/pages/pets/Add'
import Pets_List from '@/pages/pets/List'

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
      redirect: '/start'
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
      path: '/auth',
      name: 'auth',
      component: Auth,
      children: [
        {
          path: '/auth/register',
          name: 'auth_register',
          component: Auth_Register
        },
        {
          path: '/auth/login',
          name: 'auth_login',
          component: Auth_Login
        }
      ]
    },
    {
      path: '/profile',
      redirect: '/profile/following',
      component: Profile,
      children: [
        {
          path: '/profile/following',
          name: 'profile_following',
          component: Profile_Following
        },
        {
          path: '/profile/followers',
          name: 'profile_followers',
          component: Profile_Followers
        },
        {
          path: '/profile/modify',
          name: 'profile_modify',
          component: Profile_Modify
        },
        {
          path: '/profile/mine',
          name: 'profile_mine',
          component: Profile_Mine
        }
      ]
    },
    {
      path: '/pets',
      redirect: '/pets/list',
      component: Pets,
      children: [
        {
          path: '/pets/list',
          name: 'pets_list',
          component: Pets_List
        },
        {
          path: '/pets/add',
          name: 'pets_add',
          component: Pets_Add
        }
      ]
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
