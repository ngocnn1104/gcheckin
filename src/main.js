import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import "./styles/element-variables.scss";
import "@/styles/index.scss"; // global css
import "./icons"; // icon
import apolloProvider from "./vue-apollo.js";

Vue.config.productionTip = false;

Vue.use(Element, { locale });

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
