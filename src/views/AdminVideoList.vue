<template>
  <div class="container">
    <v-btn
      color="secondary"
      to="/admin/videos/new"
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
            icon
            x-large
            color="secondary"
            class="thisButtonWantsToBeWhite"
            :to="{ name: 'video-watch', params: { id: video.id }}"
          >
            <font-awesome-icon icon="caret-square-right" />
          </v-btn>
          <v-btn
            icon
            x-large
            color="secondary"
            class="thisButtonWantsToBeWhite"
            :to="{ name: 'admin-video-show', params: { id: video.id }}"
          >
            <font-awesome-icon icon="eye" />
          </v-btn>
          <v-btn
            icon
            x-large
            color="accent"
            class="thisButtonWantsToBeWhite"
            :to="{ name: 'admin-video-edit', params: { id: video.id }}"
          >
            <font-awesome-icon icon="edit" />
          </v-btn>
          <v-btn icon x-large color="error" @click="deleteVideo(video)">
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
    ...mapState({
      videos: state => state.videos.videos
    })
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
      this.$store.dispatch("snackbar/setSnackbar", {
        text: "Video successfully delted"
      });

      if (response) {
        this.$store.dispatch("videos/delete", video);
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
    border-left: 3px solid transparent;
    transition: all 600ms ease-out;

    &:nth-child(even) {
      background-color: #fff;
    }

    &:hover {
      border-left: 3px solid var(--highlight-color);
    }
  }

  &__name {
    font-weight: 700;
  }
}
.btn-box {
  display: grid;
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
