import * as VueRouter from "vue-router";
import Home from "@/pages/home.vue";
import Settings from "@/pages/settings.vue";

const routes = [
  {
    name: "首页",
    path: "/",
    fullPath: '/',
    component: Home,
    meta: {
      title: "首页",
      transition: "slide-left",
      icon: "HomeFilled",
      affix: false,
    },
  },
  {
    name: "设置",
    path: "/settings",
    fullPath: '/settings',
    component: Settings,
    meta: {
      title: "设置",
      transition: "slide-left",
      icon: "Setting",
      affix: false,
    },
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});
router.beforeEach((to, from) => {
  console.log("from", from);
  console.log("to", to);
});
export { router, routes };
