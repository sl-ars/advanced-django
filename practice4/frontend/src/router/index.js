import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import AdminPage from '../views/AdminPage.vue';
import RegisterPage from "../views/RegisterPage.vue";
import store from '../store';

const routes = [
  { path: '/', component: LoginPage },
  {path: '/register', component: RegisterPage},
  {
    path: '/admin',
    component: AdminPage,
    meta: { requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAdmin) {
    await store.dispatch('fetchUser');
    if (store.state.user?.role === 'admin') {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});

export default router;
