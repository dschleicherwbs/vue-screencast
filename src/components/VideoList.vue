// https://www.youtube.com/watch?v=0BHPs2kNnVA&list=PLPwpWyfm6JADRf8x1Jc0Da8R71WJyt-Jn&index=8 19min

<template>
  <div class="video-container">
    <VideoListVideo v-for="video in videos" :key="video.id" limitDescription :video="video"></VideoListVideo>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VideoListVideo from "@/components/VideoListVideo";

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
  grid-template-columns: repeat(auto-fill, minmax(260px, auto));
  gap: 2rem;
  justify-content: left;
}
</style>