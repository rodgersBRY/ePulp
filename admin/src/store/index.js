import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

// module imports
import Auth from "./auth";
import Shared from "./shared";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { Auth, Shared },
  plugins: [createPersistedState()],
});
