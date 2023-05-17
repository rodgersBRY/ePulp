export default {
    state: {
      error: null,
      loading: false,
    },
  
    mutations: {
      setLoading(state, payload) {
        state.loading = payload;
      },
  
      setError(state, payload) {
        state.error = payload;
      },
  
      clearError(state) {
        state.error = null;
      },
    },

    actions: {
      setError({commit}, payload) {
        commit('setError', payload);
      },

      clearError({commit}) {
        commit('clearError')
      }
    },
    
    getters: {
      isLoading: (state) => state.loading,
      error: (state) => state.error,
    },
  };