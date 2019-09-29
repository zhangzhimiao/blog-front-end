import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/login/login";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/",
      name: "index",
      component: Login
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});
