import { createRouter, createWebHistory } from 'vue-router';
import Home from './Pictures.vue';
import Artists from './Artists.vue';
import About from './About.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/artists', component: Artists },
  { path: '/about', component: About }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;