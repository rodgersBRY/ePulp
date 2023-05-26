import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";

import errorDialog from './components/error_component.vue'

axios.defaults.withCredentials = false;
axios.defaults.baseURL = "http://161.35.206.66:81/api";

// 161.35.206.66:81

// auto authenticate
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
}

axios.interceptors.response.use(undefined, (err) => {
  return new Promise((_, reject) => {
    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      store.dispatch("logout");
    }
    reject(err);
  });
});

Vue.component('error-dialog', errorDialog)

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");