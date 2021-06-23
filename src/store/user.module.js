import { userService } from '../services/user-service';
import { askNotificationPermission } from '../services/notif-service';
import router from '../router/index';

const currentUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const state = currentUser
  ? { status: { loggedIn: true }, user: currentUser }
  : { status: { loggedIn: false }, user: null };
const actions = {
  async login({ commit }, { email, password }) {
    const response = await userService.login(email, password);
    if (response.error) commit("loginFailure", response.message);
    else {
      commit('loginSuccess', response);
      localStorage.setItem('jwt', response.token);
      localStorage.setItem('user', JSON.stringify(response.model));
      router.push('/');
      askNotificationPermission();
      return true;
    }
    return false;
  },
  logout({ commit }) {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    commit("logout");
    router.push("/");
  },
  async register({ commit }, user) {
    const response = await userService.register(user);
    if (!response.error) {
      commit("registerSuccess");
      router.push("/login");
      return true;
    } else {
      commit("registerFalse");
    }
    return false;
  },
};

const mutations = {
  loginSuccess(state, user) {
    state.status = { loggedIn: true };
    state.user = user;
  },
  loginFailure(state) {
    state.status = { loggedIn: false };
    state.user = null;
  },
  logout(state) {
    state.status = { loggedIn: false };
    state.user = null;
  },
  registerSuccess(state) {
    state.status = {};
  },
  registerFalse(state) {
    state.status = {};
  },
};

const getters = {
  getCurrentUser: (state) => state,
  getLoggedIn: (state) => state.status.loggedIn,
};

export const user = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
