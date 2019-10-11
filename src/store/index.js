import Vue from "vue";
import Vuex from "vuex";
import { service } from "../utils/service";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userId: "",
    userName: "",
    isSignIn: false,
    allColumns: [],
    isAdmin: ""
  },
  getters: {},
  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
    },
    setUserName(state, userName) {
      state.userName = userName;
    },
    setIsSignIn(state, isSignIn) {
      state.isSignIn = isSignIn;
    },
    setAllColumns(state, allColumns) {
      state.allColumns = allColumns;
    },
    setIsAdmin(state, isAdmin) {
      state.isAdmin = isAdmin;
    }
  },
  actions: {
    getAllColumns({ commit }) {
      commit("setAllColumns", []);
      const columns = [];
      service.getAllColumns().then(allColumns => {
        const tempColumns = allColumns.data.data;
        for (let x in tempColumns) {
          columns.push(tempColumns[x]);
        }
        commit("setAllColumns", columns);
      });
    }
  }
});
export default store;
