<template>
  <div class="container">
    <h1 class="display-3">Edit "{{ initVideoTitle }}"</h1>
    <VideoEditForm
      :video="video"
      :saveVideo="saveVideo"
      :endEdit="endEdit"
      buttonText="Edit Video"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import VideoEditForm from "@/components/VideoEditForm.vue";

export default {
  components: {
    VideoEditForm
  },
  computed: {
    ...mapState({
      videos: state => state.videos.videos
    }),
    video() {
      const video = this.videos.find(
        video => video.id == this.$route.params.id
      );
      return video;
    }
  },
  data() {
    return {
      snackbar: {
        show: false,
        color: "",
        text: ""
      },
      initVideoTitle: ""
    };
  },
  mounted() {
    this.initVideoTitle = this.video.name;
  },
  methods: {
    async saveVideo() {
      await this.$store.dispatch("videos/edit", this.video);
      this.$store.dispatch("snackbar/setSnackbar", {
        text: "Video successfully edited"
      });
      this.$router.push({ name: "admin-video-list" });
    },
    endEdit() {
      this.$router.push({ name: "admin-video-list" });
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  display: grid;
  gap: 2rem;
  justify-items: stretch;
}
</style>