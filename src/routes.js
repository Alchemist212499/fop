import { createRouter, createWebHistory } from "vue-router";
import Community from "./Community.vue";
import DetailedPost from "./DetailedPost.vue";
import CreatePost from "./components/CreatePost.vue";
import MyProfile from "./components/MyProfile.vue";
import CreateGallery from "./components/CreateGallery.vue";
import LoginPage from "./components/LoginPage.vue";
import AuthPage from "./components/AuthPage.vue";
import UserProfile from "./components/UserProfile.vue";
import Cookies from "js-cookie";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: { path: "/login" },
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/auth",
      name: "auth",
      component: AuthPage,
    },
    {
      path: "/posts",
      name: "community",
      component: Community,
    },
    { path: "/posts/:id", name: "detailed-post", component: DetailedPost },
    { path: "/create", name: "create-post", component: CreatePost },
    { path: "/profile", name: "my-profile", component: MyProfile },
    {
      path: "/create-gallery",
      name: "create-gallery",
      component: CreateGallery,
    },
    {
      path: "/profile/:id",
      name: "user-profile",
      component: UserProfile,
    },
  ],
});

/* router.beforeEach((to, from, next) => {
  const tokens = Cookies.get("userToken");
  if (tokens !== null && to.meta.requiresAuth) {
    next();
  } else {
    next({ name: "entry" });
  }
}); */

export default router;
