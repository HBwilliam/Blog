import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/blog/:short_name',
    name: 'blog',
    component: () => import(/* webpackChunkName: "blog" */ '../views/BlogView.vue')
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import(/* webpackChunkName: "posts" */ '../views/PostsView.vue')
  },
  {
    path: '/tags',
    name: 'tags',
    component: () => import(/* webpackChunkName: "tags" */ '../views/TagsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
