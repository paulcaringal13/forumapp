// routes.js
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../components/LoginPage.vue";
import RegisterPage from "../components/RegisterPage.vue";
import HomePage from "@/components/HomePage.vue";
import MyPosts from "@/components/MyPostPage.vue";
import AddPost from "@/components/AddPost.vue";
import EditPost from "@/components/EditPost.vue";
import ViewPost from "@/components/ViewPost.vue";

const routes = [
  {
    path: "/",
    component: LoginPage,
    name: "login",
 
  },
  {
    path: "/register",
    component: RegisterPage,
    name: "register",

  },
  {
    path: "/home/:id",
    component: HomePage,
    name: "home",
    beforeEnter: (to, from, next) => {
      // check if user is logged in and redirect to login page if not
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/posts/:id",
    component: MyPosts,
    name: "posts",
    beforeEnter: (to, from, next) => {
      // check if user is logged in and redirect to login page if not
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/viewpost/:id",
    component: ViewPost,
    name: "ViewPost",
    beforeEnter: (to, from, next) => {
      // check if user is logged in and redirect to login page if not
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/add/:id",
    name: "AddPost",
    component: AddPost,
    beforeEnter: (to, from, next) => {
      // check if user is logged in and redirect to login page if not
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/edit/:id",
    name: "EditPost",
    component: EditPost,
    props: true,
    beforeEnter: (to, from, next) => {
      // check if user is logged in and redirect to login page if not
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/logout",
    name: "logout",
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      localStorage.removeItem("token");
      localStorage.removeItem("postId");
      localStorage.removeItem("id");
      next("/");
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;