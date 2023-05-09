import axios from "axios";

export default {
  state: {
    user: null,
    token: localStorage.getItem("token") || "",
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
    },

    logout(state) {
      state.user = null;
      state.token = "";
      state.error = null;
    },
  },

  actions: {
    // auto logout after 30 minutes
    autoLogout({ commit }) {
      setTimeout(() => {
        commit("clearError");
        commit("logout");

        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
      }, 30 * 60000);
    },

    async register({ dispatch, commit }, payload) {
      commit("setLoading", true);

      try {
        const res = await axios.post("/auth/register", payload);

        if (res.status === 201) {
          let userForm = new FormData();
          userForm.append("name", payload.name);
          userForm.append("phoneNo", payload.phone);
          userForm.append("password", payload.password);

          await dispatch("login", userForm);
          commit("setError", null);
          commit("setLoading", false);
        }
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err.response.data.message);
        
      }
    },

    async login({ commit, dispatch }, payload) {
      commit("setLoading", true);

      try {
        const res = await axios.post("/auth/login", {
          phone: payload.get('phone'),
          password: payload.get('password'),
        });

        console.log(res);

        if (res.status === 200) {
          let user = res.data.loadedUser;
          let token = res.data.token;

          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = token;

          commit("setUser", { user, token });
          commit("clearError");
          commit("setLoading", false);
          dispatch("autoLogout");
        }
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err.response.data.message);

        localStorage.removeItem("token");
      }
    },

    async logout({ commit }) {
      commit("logout");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },

    clearError({ commit }) {
      commit("clearError");
    },
  },

  getters: {
    user: (state) => state.user,
    isAuthenticated: (state) => !!state.user,
  },
};
