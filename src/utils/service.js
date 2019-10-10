import axios from "axios";

export class Service {
  instance = axios.create({
    baseURL: "http://localhost:3000/entity",
    timeout: 1000
  });
  register(name, password) {
    return this.instance.post("person/register", {
      data: {
        name,
        password
      }
    });
  }
  login(name, password) {
    return this.instance.post("person/login", {
      data: {
        name,
        password
      }
    });
  }
  getUserColumns(userId) {
    return this.instance.get(`person/columns/${userId}`);
  }
  getAllColumns() {
    return this.instance.get(`column/all`);
  }

  getAllArticles() {
    return this.instance.get("article/all");
  }

  getColumnArticlesByColumnId(columnId) {
    return this.instance.get(`article-column/column/${columnId}`);
  }

  getArticlesByArticleIds(ids) {
    return this.instance.get(`article/articles`, { params: { ids } });
  }

  getDetailArticle(id) {
    return this.instance.get(`article/detail/${id}`);
  }

  judgeIfLike(userId, articleId) {
    return this.instance
      .get(`article-like/like-info/${userId}/${articleId}`)
      .then(d => {
        return !!d.data.data.d;
      });
  }

  addLike(userId, articleId) {
    return this.instance
      .post(`article-like/like`, { data: { personId: userId, articleId } })
      .then(d => {
        return !!d.data.data.d;
      });
  }

  cancelLike(userId, articleId) {
    return this.instance
      .delete(`article-like/cancel-like`, {
        data: { personId: userId, articleId: articleId }
      })
      .then(d => {
        return !!d.data.data.d;
      });
  }

  judgeIfCollected(userId, articleId) {
    return this.instance
      .get(`article-collection/collection/${userId}/${articleId}`)
      .then(d => {
        return !!d.data.data.d;
      });
  }

  addCollect(userId, articleId) {
    return this.instance
      .post(`article-collection/collect`, {
        data: { personId: userId, articleId }
      })
      .then(d => {
        return !!d.data.data.d;
      });
  }

  cancelCollect(userId, articleId) {
    return this.instance
      .delete(`article-collection/cancel-collect`, {
        data: { personId: userId, articleId: articleId }
      })
      .then(d => {
        return !!d.data.data.d;
      });
  }

  publishArticle(userId, content, isPublic, title, columnIds, label) {
    return this.instance
      .post("article/publish", {
        data: {
          personId: userId,
          content,
          isPublic,
          title,
          columnIds,
          label
        }
      })
      .then(d => !!d.data.data.d1);
  }
}

export const service = new Service();
