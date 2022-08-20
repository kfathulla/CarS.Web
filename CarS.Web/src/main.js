import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router).mount("#app");
