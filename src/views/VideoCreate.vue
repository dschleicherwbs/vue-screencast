<template>
  <div class="container">
    <h1 class="display-3">New Video</h1>
    <form class="form">
      <v-text-field v-model="video.name" label="Title" />
      <v-textarea rows="4" v-model="video.description" label="Description" />
      <v-text-field v-model="video.thumbnail" label="Thumbnail URL" />
      <v-text-field v-model="video.videoUrl" label="Video URL" />
      <v-btn @click.prevent="createVideo" color="primary" depressed>Add Video</v-btn>
    </form>
    <VideoListVideo class="videoListVideo" :video="video" />
  </div>
</template>

<script>
import VideoListVideo from "../components/VideoListVideo";

export default {
  name: "video-create",
  data() {
    return {
      video: {
        name: "",
        description: "",
        thumbnail: "",
        videoUrl: ""
      }
    };
  },
  components: {
    VideoListVideo
  },
  methods: {
    async createVideo() {
      let savedVideo = await this.$store.dispatch("createVideo", this.video);
      console.log(savedVideo);

      this.$router.push({ name: "video-watch", params: { id: savedVideo.id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  display: grid;
  gap: 2rem;
}

.container {
  grid-template-columns: repeat(auto-fit, minmax(320px, auto));
}

.display-3 {
  grid-column: 1 / -1;
}

input,
textarea {
  display: block;
  width: 100%;
  background-color: #fff;
  border-radius: var(--br-m);
  padding: var(--space-small);
  min-width: 320px;
}

input[type="submit"] {
  transition: all 200ms ease-out;

  &:hover {
    background-color: var(--main-color);
    cursor: pointer;
  }
}

.videoListVideo {
  max-width: unset !important;
}
</style>
