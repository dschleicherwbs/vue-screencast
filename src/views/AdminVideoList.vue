// https://www.youtube.com/watch?v=cjRst4qduzM&list=PLPwpWyfm6JADRf8x1Jc0Da8R71WJyt-Jn&index=7 21min

<template>
  <div class="container">
    <h1 class="display-3">Admin Page</h1>
    <v-btn
      color="secondary"
      to="/video/new"
      class="thisButtonWantsToBeWhite"
      x-large
      depressed
    >Add Video</v-btn>

    <div class="admin-video-container">
      <div class="admin-video-container__item" v-for="video in videos" :key="video.id">
        <div class="admin-video-container__name">{{ video.name }}</div>
        <div class="admin-video-container__description">{{ video.description | abbreviate }}</div>
        <div class="btn-box">
          <v-btn
            depressed
            color="secondary"
            class="thisButtonWantsToBeWhite"
            :to="'/video/' + video.id"
          >
            <font-awesome-icon icon="caret-square-right" />
          </v-btn>
          <v-btn
            depressed
            color="accent"
            class="thisButtonWantsToBeWhite"
            :to="`/admin/videos/${video.id}/edit/`"
          >
            <font-awesome-icon icon="edit" />
          </v-btn>
          <v-btn depressed color="error" @click="deleteVideo(video)">
            <font-awesome-icon icon="trash" />
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["videos"])
  },
  filters: {
    abbreviate(str) {
      const limit = 50;
      if (str) {
        str = str.replace("<p>", "").replace("</p>", "");
        return str.slice(0, limit).trim() + "...";
      }
    }
  },
  methods: {
    deleteVideo(video) {
      const response = confirm(`Are you sure you want to delete ${video.name}`);
      if (response) {
        this.$store.dispatch("deleteVideo", video);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.admin-video-container {
  &__item {
    padding: var(--space-05);
    display: grid;
    grid-template-columns: 1fr 2fr min-content;
    justify-items: start;
    align-items: center;
    text-align: left;
    column-gap: 4rem;

    &:nth-child(even) {
      background-color: #fff;
    }
  }

  &__name {
    font-weight: 700;
  }
}
.btn-box {
  display: grid;
  gap: 0.7rem;
  grid-auto-flow: column;
  justify-content: end;
  justify-items: center;

  justify-self: end;
}
.v-btn:not(.v-btn--round).v-size--default {
  min-width: max-content;
}

.thisButtonWantsToBeWhite {
  color: #fff !important;
}
</style>