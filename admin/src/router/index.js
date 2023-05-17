import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/register",
    name: "Signup",
    component: () => import("../views/register.vue"),
  },
  {
    path: "/farmers/:farmerId",
    name: "Farmer Details",
    component: () => import("../views/farmer_details.vue"),
  },
  {
    path: "/farmers",
    name: "Farmers",
    component: () => import("../views/farmers.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//change bar title
const DEFAULT_TITLE = "ePulp";
router.afterEach((to, _) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

export default router;
