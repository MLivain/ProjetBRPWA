import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Game from "../views/Game.vue";
import GameHistory from "../views/GameHistory.vue";
import Register from '../views/Register.vue';
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/game",
    name: "Game",
    component: Game,
    children: [
      {
        path: ":id",
        component: Game,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: "/gamehistory",
    name: "GameHistory",
    component: GameHistory,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/'];
  const authRequired = !publicPages.includes(to.path);

  const user = localStorage.getItem('user');

  if (authRequired && !user) {
    return next('/login');
  } else if (user && to.fullPath.includes('admin')) {
    const data = JSON.parse(user);
    if (data.type.toUpperCase() != 'ADMIN') return next('/unauthorized');
  }

  next();
});