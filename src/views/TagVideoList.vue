<template>
  <div class="d-flex flex-column align-start">
    <h1 class="display-3">Videos with Tag "{{ tag.name }}"</h1>
    <router-link to="/">Back to all Videos</router-link>
    <div class="video-container">
      <VideoListVideo v-for="video in videosOnTag" :key="video.id" :video="video" />
    </div>
  </div>
</template>

<script>
import VideoListVideo from "../components/VideoListVideo";
import { mapGetters, mapState } from "vuex";

export default {
  components: {
    VideoListVideo
  },
  computed: {
    ...mapGetters(["getTags"]),
    ...mapState(["videos"]),
    tag() {
      return this.getTags(this.$route.params.id);
    },
    videosOnTag() {
      return this.videos.filter(video =>
        this.tag.video_ids.includes(video.id.toString())
      );
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 3rem;
}
.video-container {
  padding-top: 1rem;
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, auto));
  gap: 2rem;
  justify-content: left;
}
</style>