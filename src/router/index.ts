import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/CraftList.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/components/About.vue')
  },
  {
    path: '/craft/:id',
    name: 'Craft',
    component: () => import('@/components/CraftView.vue'),
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
