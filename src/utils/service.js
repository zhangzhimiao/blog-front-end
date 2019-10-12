import axios from "axios";

export class Service {
  instance = axios.create({
    baseURL: "http://localhost:3000/entity"
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

  judgeIfCare(careId, beCaredId) {
    return this.instance
      .get(`person-care/care-info/${careId}/${beCaredId}`)
      .then(d => {
        return !!d.data.data.d;
      });
  }

  addCare(careId, beCaredId) {
    return this.instance
      .post(`person-care/care`, {
        careId,
        beCaredId
      })
      .then(d => {
        return !!d.data.data.id;
      });
  }

  cancelCare(careId, beCaredId) {
    return this.instance
      .delete(`person-care/cancel-care`, {
        data: {
          careId,
          beCaredId
        }
      })
      .then(d => {
        return !!d.data.data.d;
      });
  }

  getComments(articleId) {
    return this.instance.get(`article-comment/comments/${articleId}`);
  }

  addComment(articleId, personId, content, personName, parentCommentId) {
    return this.instance
      .post("article-comment/comment", {
        articleId,
        personId,
        content,
        personName,
        parentCommentId
      })
      .then(d => {
        return !!d.data.data.id;
      });
  }

  deleteComment(commentId) {
    return this.instance
      .delete(`article-comment/delete`, {
        data: { commentId }
      })
      .then(d => {
        return !!d.data.data.d;
      });
  }

  getSelfArticlesByUserId(userId) {
    return this.instance
      .get(`article/${userId}/articles`)
      .then(d => d.data.data.d);
  }

  getLikesArticleByUserId(userId) {
    return this.instance.get(`article-like/likes/${userId}`).then(d => {
      const ids = [];
      for (let x in d.data.data.d) {
        ids.push(d.data.data.d[x].articleId);
      }
      return this.getArticlesByArticleIds(ids).then(d => d.data.data.d);
    });
  }

  getColumnsByArticleId(articleId) {
    return this.instance.get(`article-column/article/${articleId}`).then(d => {
      const ids = [];
      for (let x in d.data.data.d) {
        ids.push(d.data.data.d[x].columnId);
      }
      return this.getColumnsByIds(ids).then(d => d);
    });
  }

  getLabelsByArticleId(articleId) {
    return this.instance.get(`label/labels/${articleId}`).then(d => {
      return d.data.data.d;
    });
  }

  getColumnsByIds(ids) {
    return this.instance
      .get(`column/columns`, { params: { ids } })
      .then(d => d.data.data);
  }

  updateArticle(
    articleId,
    userId,
    content,
    isPublic,
    title,
    columnIds,
    labels
  ) {
    return this.instance.post("article/update", {
      data: {
        articleId,
        personId: userId,
        content,
        isPublic,
        title,
        columnIds,
        labels
      }
    });
  }

  getCaresByCareId(careId) {
    return this.instance.get(`person-care/cares/${careId}`).then(d => {
      return d.data.data.d;
    });
  }

  getPersonsByIds(ids) {
    return this.instance
      .get(`person/persons`, { params: { ids } })
      .then(d => d.data.data);
  }

  getColumnsByUserId(userId) {
    return this.instance.get(`person/columns/${userId}`).then(d => {
      return d.data.data;
    });
  }

  editUserColumns(columnIds, userId) {
    return this.instance.post(`person/manage-column`, {
      data: {
        columnIds,
        personId: userId
      }
    });
  }
}

export const service = new Service();
