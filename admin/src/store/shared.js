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
    
    getters: {
      isLoading: (state) => state.loading,
      error: (state) => state.error,
    },
  };