import Main from "@/pages/Main";
import CarPage from "@/pages/Car/CarPage";
import CarDetails from "@/pages/Car/CarDetails";
import CarEdit from "@/pages/Car/CarEdit";
import CarDelete from "@/pages/Car/CarDelete";
import CarCreate from "@/pages/Car/CarCreate";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/car",
    component: CarPage,
  },
  {
    path: "/car/details/:id",
    component: CarDetails,
  },
  {
    path: "/car/edit/:id",
    component: CarEdit,
  },
  {
    path: "/car/delete/:id",
    component: CarDelete,
  },
  {
    path: "/car/create",
    component: CarCreate,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
