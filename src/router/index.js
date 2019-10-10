import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/login/login";
import Index from "../components/homepage/homepage";
import ArtileContent from "../components/homepage/article-content";
import ArticleDetail from "../components/homepage/article-detail";
import PublishArticle from "../components/article-publish-edit-viewer/article-publish";

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
