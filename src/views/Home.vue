// https://www.youtube.com/watch?v=vaCrzaeC-RE 27min

<template>
  <div class="home">
    <h1 class="d-flex display-3 justify-start">Videos</h1>
    <div class="video-container">
      <VideoListVideo v-for="video in videos" :key="video.name" :video="video"></VideoListVideo>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VideoListVideo from "../components/VideoListVideo";

export default {
  name: "home",
  components: {
    VideoListVideo
  },
  computed: {
    ...mapState(["videos", "tags"])
  }
};
</script>

<style scoped lang="scss">
.video-container {
  padding-top: 3rem;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, auto));
  gap: 2rem;
  justify-content: left;
}
</style>
