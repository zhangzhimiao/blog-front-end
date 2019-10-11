import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/login/login";
import Index from "../components/homepage/homepage";
import ArtileContent from "../components/article/article-content";
import ArticleDetail from "../components/article/article-detail";
import PublishArticle from "../components/article/article-publish";
import EditArticle from "../components/article/article-edit";
import UserInfo from "../components/user";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/index",
      name: "index",
      component: Index,
      children: [
        {
          path: "home",
          name: "home",
          component: ArtileContent
        },
        {
          path: "article",
          name: "article",
          component: ArticleDetail
        },
        {
          path: "publishArticle",
          name: "publishArticle",
          component: PublishArticle
        },
        {
          path: "homepage",
          name: "homepage",
          component: UserInfo
        },
        {
          path: "editArticle",
          name: "editArticle",
          component: EditArticle
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "*",
      redirect: "/index/home"
    }
  ]
});
