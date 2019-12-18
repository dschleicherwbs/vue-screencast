import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import VideoWatch from "../views/VideoWatch.vue";
import TagVideoList from "../views/TagVideoList.vue";
import VideoCreate from "../views/VideoCreate.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // wich is lazy-loaded when the route is visited
    component: () =>
      import(/* WebpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/video/new",
    name: "video-create",
    component: VideoCreate
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
  }
];

const router = new VueRouter({
  routes
});

export default router;
