import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userId: "",
    userName: "",
    isSignIn: false
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
    }
  },
  actions: {}
});
export default store;
