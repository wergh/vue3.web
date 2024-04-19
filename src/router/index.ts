import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EnterpriseSelectorView from "../views/EnterpriseSelectorView.vue"
import ErrorPageView from "../views/ErrorPageView.vue"
import StreamView from "../views/StreamView.vue"
import { useTokenStore, useUserStore, useEnterpriseStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/enterprises',
      // anybody can read a post
      name: 'enterprises',
      meta: { requiresAuth: true, requiresMultiEnterprises: true },
      component: EnterpriseSelectorView
    },
    {
      path: '/error-page',
      name: 'errorPage',
      meta: { requiresAuth: true },
      component: ErrorPageView
    },
    {
      path: '/stream',
      name: 'stream',
      meta: { requiresAuth: true, requiresEnterpriseSelected: true },
      component: StreamView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  const tokenStore = useTokenStore();
  const userStore = useUserStore();
  const enterpriseStore = useEnterpriseStore();
  if(to.meta.isAutenthicate && tokenStore.getToken) {
    return {
      path: '/',
    }
  }
  if(to.meta.requiresMultiEnterprises && userStore.getCountEnterprises == 0) {
    return {
      path: '/error-page',
    }
  }
  if(to.meta.requiresMultiEnterprises && userStore.getCountEnterprises == 1) {
    if(userStore.getEnterprises[0]) {
      enterpriseStore.storeEnterprise(userStore.getEnterprises[0]);
    }
    return {
      path: '/stream',
    }
  }
  if(to.meta.requiresEnterpriseSelected && !enterpriseStore.getEnterpriseName) {
    return {
      path: '/',
    }
  }
})

export default router
