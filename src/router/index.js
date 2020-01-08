import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import VideoWatch from "../views/VideoWatch.vue";
import TagVideoList from "../views/TagVideoList.vue";
import AdminVideoCreate from "../views/AdminVideoCreate.vue";
import AdminVideoList from "../views/AdminVideoList.vue";
import AdminVideoEdit from "../views/AdminVideoEdit.vue";
import AdminVideoShow from "../views/AdminVideoShow.vue";
import AdminUserList from "../views/AdminUserList.vue";
import AdminTagList from "../views/AdminTagList.vue";
import UserLogin from "../views/UserLogin.vue";
import UserRegistration from "../views/UserRegistration.vue";
import Admin from "../views/Admin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "user-login",
    component: UserLogin
  },
  {
    path: "/registration",
    name: "user-registration",
    component: UserRegistration
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    beforeEnter(to, from, next) {
      const currentUser = JSON.parse(window.localStorage.currentUser);
      if (currentUser && currentUser.admin) {
        next();
      } else {
        next("/");
      }
    },
    children: [
      {
        path: "videos",
        name: "admin-video-list",
        component: AdminVideoList
      },
      {
        path: "users",
        name: "admin-user-list",
        component: AdminUserList
      },
      {
        path: "tags",
        name: "admin-tag-list",
        component: AdminTagList
      },
      {
        path: "videos/:id/edit",
        name: "admin-video-edit",
        component: AdminVideoEdit
      },
      {
        path: "videos/new",
        name: "admin-video-create",
        component: AdminVideoCreate
      },
      {
        path: "videos/:id/show",
        name: "admin-video-show",
        component: AdminVideoShow
      }
    ]
  },
  {
    path: "/video/:id",
    name: "video-watch",
    component: VideoWatch,
    params: true
  },
  {
    path: "/tag/:id",
    name: "tag",
    component: TagVideoList,
    params: true
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // wich is lazy-loaded when the route is visited
    component: () =>
      import(/* WebpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
