<template>
  <div class="video-card">
    <router-link :to="'/video/' + video.id">
      <TagButtons :tag_ids="video.tag_ids" />
      <img :src="videoThumbnail" alt />

      <div class="video-card__header">
        <div class="overline mt-2" v-if="isPlayed">
          <font-awesome-icon icon="check" />&nbsp;watched
        </div>
        <h4>{{ video.name | placeholderTitle }}</h4>
      </div>
      <div class="video-card__body">{{ limit(video.description) | placeholderDescription }}</div>
    </router-link>
  </div>
</template>

<script>
import TagButtons from "./TagButtons";
import { mapState } from "vuex";

export default {
  components: {
    TagButtons
  },
  computed: {
    ...mapState(["playedVideos"]),
    isPlayed() {
      return this.playedVideos.includes(this.video.id);
    },
    videoThumbnail() {
      return this.checkURL(this.video.thumbnail)
        ? this.video.thumbnail
        : require("@/assets/placeholder-image.jpg");
    }
  },
  props: {
    video: {
      type: Object,
      default: null
    },
    limitDescription: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    limit(str) {
      const limit = 80;

      if (this.limitDescription && str.length > limit) {
        const words = str
          .replace("<p>", "")
          .replace("</p>", "")
          .split(" ");
        let shortenStr = "";

        for (let word of words) {
          if (word.length + shortenStr.length < limit) {
            shortenStr += word + " ";
          } else {
            break;
          }
        }

        return shortenStr + "...";
      }
      return str;
    },
    checkURL(url) {
      return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    }
  },
  filters: {
    placeholderTitle(str) {
      if (str.length == 0) str = "title";
      return str;
    },
    placeholderDescription(str) {
      if (str.length == 0) str = "description";
      return str;
    }
  }
};
</script>

<style scoped lang="scss">
.video-card {
  text-align: left;
  box-shadow: var(--shadow-m);
  background-image: linear-gradient(to bottom, var(--main-color), #fff);
  border-radius: var(--br-m);
  border: 3px solid transparent;
  position: relative;
  max-width: 330px;
  transition: transform 510ms ease-out, border 2s ease-out;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  &:hover {
    transform: translateY(-4px) scaleY(1.009) scaleX(0.991);
    border: 3px solid var(--highlight-color);
  }

  &:hover .video-card__header,
  &:hover img {
    border-radius: 0;
  }

  &__header,
  &__body {
    padding: var(--space-05);
    border-radius: 0 0 var(--br-m) var(--br-m);
    transition: all 510ms ease-out;
  }

  &__header {
    background-color: var(--highlight-color);
    color: var(--highlight-font-color);
    letter-spacing: 1.5px;
  }

  &__body {
    padding-bottom: var(--space-1);
  }

  a {
    display: flex;
    flex-direction: column;
    justify-items: flex-start;
  }

  img {
    border-radius: var(--br-m) var(--br-m) 0 0;
    display: inline-block;
    width: 100%;
    transition: all 510ms ease-out;
  }
}
</style>
