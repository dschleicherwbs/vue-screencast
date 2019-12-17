<template>
  <div class="video-card">
    <div class="video-card__tags">
      <v-btn
        v-for="tag_id in video.tag_ids"
        :key="tag_id"
        :to="'/tag/' + tag_id + '/'"
        exact
        text
        small
      >{{ '#' + getTags(tag_id).name }}</v-btn>
    </div>
    <router-link :to="'/video/' + video.id">
      <img :src="video.thumbnail" alt />
      <div class="text">
        <div class="video-card__header">
          <h4>{{ video.name }}</h4>
        </div>
        <div class="video-card__body">{{ video.description | limit }}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getTags"])
  },
  props: {
    video: {
      type: Object,
      default: null
    }
  },
  filters: {
    limit(str) {
      const limit = 80;

      if (str.length > limit) {
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
    }
  }
};
</script>

<style scoped lang="scss">
.video-card {
  text-align: left;
  box-shadow: var(--shadow-m);
  background-color: var(--main-color);
  border-radius: var(--br-m);
  border: 2px solid transparent;
  position: relative;
  max-width: 330px;
  transition: transform 510ms ease-out, border 2s ease-out;

  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px) scaleY(1.009) scaleX(0.991);
    border: 2px solid var(--highlight-color);
  }

  &__header,
  &__body {
    padding: var(--space-05);
    border-radius: 0 0 var(--br-m) var(--br-m);
  }

  &__header {
    background-color: var(--highlight-color);
    border-top: 5px solid var(--highlight-color);
    color: var(--highlight-font-color);
    letter-spacing: 1.5px;
  }

  &__body {
    padding-bottom: var(--space-1);
    border-radius: 0 0 var(--br-m) var(--br-m);
    background-image: linear-gradient(
      to bottom,
      var(--main-color),
      var(--main-color-light)
    );
    border-bottom: 3px solid var(--main-color-light);
  }

  a {
    display: flex;
    flex-direction: column;
  }

  img {
    border-radius: var(--br-m) var(--br-m) 0 0;
    display: inline-block;
    width: 100%;
  }
}
</style>