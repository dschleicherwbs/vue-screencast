<template>
  <div class="container">
    <h1 class="display-3">New Video</h1>
    <VideoEditForm
      :video="video"
      :saveVideo="createVideo"
      :endEdit="endEdit"
      buttonText="Add Video"
    />
    <VideoListVideo class="videoListVideo" :video="video" />
  </div>
</template>

<script>
import VideoListVideo from "../components/VideoListVideo";
import VideoEditForm from "@/components/VideoEditForm.vue";

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
    VideoListVideo,
    VideoEditForm
  },
  methods: {
    async createVideo() {
      let savedVideo = await this.$store.dispatch("videos/create", this.video);
      this.$store.dispatch("snackbar/setSnackbar", {
        text: "Video successfully added"
      });
      this.$router.push({ name: "video-watch", params: { id: savedVideo.id } });
    },
    endEdit() {
      this.$router.push({ name: "home" });
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
