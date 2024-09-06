import { createApp } from "vue";
import "@mdi/font/css/materialdesignicons.css";
import router from "./routes";
import "element-plus/dist/index.css";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import ElementPlus from "element-plus";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Components
import App from "./App.vue";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
app.config.warnHandler = () => null;

app.use(vuetify);
app.use(ElementPlus);
app.use(router);
app.mount("#app");
