// https://www.youtube.com/watch?v=sKrBNGw94eQ&list=PLPwpWyfm6JADRf8x1Jc0Da8R71WJyt-Jn&index=3


<template>
  <div class="container">
    <router-link class="back-link" to="/">Back to All Videos</router-link>
    <div class="video">
      <video-player
        class="video-player-box video__player"
        ref="videoPlayer"
        :options="playerOptions"
      ></video-player>
      <!-- <img :src="video.thumbnail" alt="" /> -->
      <div class="video__title">
        <h2>{{ video.name }}</h2>
      </div>
      <div class="video__description">
        <button v-for="tag_id in video.tag_ids" :key="tag_id">{{ getTags(tag_id).name }}</button>
        <strong>Description</strong>
        <p v-html="video.description"></p>
      </div>
    </div>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import { mapGetters } from "vuex";

export default {
  components: {
    videoPlayer
  },
  computed: {
    ...mapGetters(["getTags"]),
    video() {
      return this.$store.state.videos.find(
        video => video.id == this.$route.params.id
      );
    },
    playerOptions() {
      return {
        // videojs options
        fluid: true,
        language: "en",
        playbackRates: [0.5, 1.0, 1.5, 2.0, 3.0],
        sources: [
          {
            type: "video/mp4",
            src: this.video.videoUrl
          }
        ],
        poster: this.video.thumbnail
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  margin-top: 5rem;
  width: 80%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.video {
  margin-top: 1rem;
  text-align: left;
  border-radius: var(--br-m);
  max-width: 1200px;
  box-shadow: var(--shadow-m);

  display: flex;
  flex-direction: column;

  &__player {
    width: 100%;
    border-top: 7px solid var(--highlight-color);
    border-radius: var(--br-m) var(--br-m) 0 0;
  }

  &__title {
    padding: var(--space-05);
    background-color: var(--highlight-color);
  }

  &__description {
    padding: var(--space-05);
    background-color: var(--main-color);

    p {
      margin: 1rem 0;
    }
  }
}
</style>
