import axios from "axios";

export default {
  state: {
    farmers: [],
    farmer: null,
    totalWeight: 0,
  },

  mutations: {
    setFarmers(state, payload) {
      state.farmers = payload;
    },

    setFarmer(state, payload) {
      state.farmer = payload;
    },

    setTotalWeight(state) {
      let total = 0;
      for (let farmer of state.farmers) {
        total += farmer.totalWeight;
      }

      state.totalWeight = total;
    },

    updateFarmersQuantity(state, payload) {
      state.farmers = state.farmers.map((student) => {
        if (student._id === payload._id) {
          return Object.assign(student, payload);
        }
        return student;
      });
    },
  },

  actions: {
    async fetchFarmers({ commit }) {
      commit("setLoading", true);

      try {
        const resp = await axios.get("/admin/get-farmers");

        const farmers = resp.data;

        commit("setLoading", false);
        commit("clearError");
        commit("setFarmers", farmers);
        commit("setTotalWeight");
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err.response.data.message);
      }
    },

    async fetchFarmer({ commit }, payload) {
      commit("setLoading", true);

      try {
        const resp = await axios.get(`/admin/farmer/${payload}`);

        const farmer = resp.data;

        commit("setLoading", false);
        commit("clearError");
        commit("setFarmer", farmer);
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err.response.data.message);
      }
    },

    async newFarmer({commit}, payload) {
      commit("setLoading", true);

      try {
        const resp = await axios.post('/admin/create-farmer', payload);

        const farmer = resp.data;

        commit("setLoading", false);
        commit("clearError");
        commit("setFarmer", farmer);
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err.response.data.message);
      }
    },
 
    async updateFarmersQuantity({ commit }, payload) {
      commit("setLoading", true);

      try {
        const resp = await axios.post(`/admin/update-weight/${payload.id}`, {weight: payload.weight});

        const updatedFarmer = resp.data.result;

        commit("setLoading", false);
        commit("clearError");
        commit("updateFarmersQuantity", updatedFarmer);
      } catch (err) {
        commit("setLoading", false);
        commit("setError", err.response.data.message);
      }
    },
  },

  getters: {
    farmers: (state) => state.farmers,
    farmer: (state) => state.farmer,
    totalWeight: (state) => state.totalWeight,
  },
};
