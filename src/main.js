import { createApp } from "vue";
import { initAuth } from "./auth";
import App from "./App.vue";
import router from "./router";
import "./css/global.css";
import { injectSpeedInsights } from "@vercel/speed-insights";

(async () => {
  injectSpeedInsights();
  await initAuth();
  createApp(App).use(router).mount("#app");
})();
