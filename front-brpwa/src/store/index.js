import Vue from 'vue';
import Vuex from 'vuex';
import { user } from './user.module';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: { user },
});
