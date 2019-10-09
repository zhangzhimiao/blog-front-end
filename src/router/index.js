import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/login/login";
import Index from "../components/homepage/homepage";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/index",
      name: "index",
      component: Index
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "*",
      redirect: "/index"
    }
  ]
});
