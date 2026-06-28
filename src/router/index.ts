import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'HomeView',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/list',
      name: 'ListView',
      component: () => import('@/views/ListView.vue'),
    },
    {
      path: '/detail/:id',
      name: 'DetailView',
      component: () => import('@/views/DetailView.vue'),
    },
    {
      path: '/publish',
      name: 'PublishView',
      component: () => import('@/views/PublishView.vue'),
    },
    {
      path: '/message',
      name: 'MessageView',
      component: () => import('@/views/MessageView.vue'),
    },
    {
      path: '/profile',
      name: 'ProfileView',
      component: () => import('@/views/ProfileView.vue'),
    },
    {
      path: '/board',
      name: 'BoardView',
      component: () => import('@/views/BoardView.vue'),
    },
  ],
})

export default router
