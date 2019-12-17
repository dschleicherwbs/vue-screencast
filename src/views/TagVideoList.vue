<template>
  <div>
    <h1 class="d-flex display-3 justify-start">Videos with Tag "{{ tag.name }}"</h1>
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
.video-container {
  padding-top: 3rem;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, auto));
  gap: 2rem;
  justify-content: left;
}
</style>