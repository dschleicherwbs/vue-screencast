//
https://www.youtube.com/watch?v=XygcDWMLYO8&list=PLPwpWyfm6JADRf8x1Jc0Da8R71WJyt-Jn&index=6

<template>
  <div class="container">
    <h1 class="display-3">New Video</h1>
    <form class="form" @submit.prevent="createVideo">
      <input
        class="fuckyou"
        type="text"
        name="title"
        id="title"
        v-model="video.name"
        placeholder="Title"
      />
      <textarea
        rows="4"
        name="description"
        id="description"
        v-model="video.description"
        placeholder="Description"
      />
      <input
        type="text"
        name="title"
        id="thumbnail"
        v-model="video.thumbnail"
        placeholder="Thumbnail URL"
      />
      <input
        class="fuckyoutoo"
        type="text"
        name="videoUrl"
        id="videoUrl"
        v-model="video.videoUrl"
        placeholder="Video URL"
      />
      <input type="submit" value="Save Video" />
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
