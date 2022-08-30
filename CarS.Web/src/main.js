import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/router";
import Popper from "vue3-popper";

const app = createApp(App);
app.component("Popper", Popper);
app.use(router).mount("#app");
