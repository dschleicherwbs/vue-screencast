<template>
  <div class="container">
    <router-link class="back-link" to="/">Back to all Videos</router-link>
    <div class="video">
      <TagButtons :tag_ids="video.tag_ids" />
      <video-player
        class="video-player-box video__player"
        ref="videoPlayer"
        :options="playerOptions"
        @ended="markPlayed"
      ></video-player>
      <!-- <img :src="video.thumbnail" alt="" /> -->
      <div class="video__title">
        <div class="overline mt-2" v-if="isPlayed(video.id)" @click="unmarkPlayed">
          <font-awesome-icon icon="check" />&nbsp;watched
        </div>
        <div class="overline mt-2" v-else-if="currentUser.id" @click="markPlayed">Mark as Played</div>
        <h2>{{ video.name }}</h2>
      </div>
      <div class="video__description">
        <strong>Description</strong>
        <p v-html="video.description"></p>
      </div>
    </div>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import { mapGetters, mapState } from "vuex";
import TagButtons from "../components/TagButtons";

export default {
  components: {
    videoPlayer,
    TagButtons
  },
  computed: {
    ...mapGetters(["getTags", "playedVideos", "isPlayed"]),
    ...mapState(["videos", "currentUser"]),
    video() {
      return this.videos.find(video => video.id == this.$route.params.id) || {};
    },
    playerOptions() {
      return {
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0, 2.5, 3.0],
        sources: [
          {
            type: "video/mp4",
            src: this.video["video-url"]
          }
        ],
        poster: this.video.thumbnail,
        fluid: true
      };
    }
  },
  methods: {
    markPlayed() {
      this.$store.dispatch("markPlayed", this.video.id);
    },
    unmarkPlayed() {
      this.$store.dispatch("unmarkPlayed", this.video.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.video {
  margin-top: 1rem;
  text-align: left;
  border-radius: var(--br-m);
  max-width: 1000px;
  box-shadow: var(--shadow-m);
  background-image: linear-gradient(var(--main-color-light), #fff);

  display: flex;
  flex-direction: column;

  &__title {
    padding: var(--space-05);
    background-color: var(--highlight-color);
    color: var(--highlight-font-color);
  }

  &__description {
    padding: var(--space-05);

    p {
      margin: 1rem 0;
    }
  }
  .overline {
    display: inline-block;
    transition: all 200ms ease-out;

    &:hover {
      background-color: rgba($color: #000000, $alpha: 0.1);
      cursor: pointer;
    }
  }
}
</style>
