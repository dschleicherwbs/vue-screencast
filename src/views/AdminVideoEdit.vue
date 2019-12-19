<template>
  <div>{{ video.name }}</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  mounted() {
    console.log(this.video);
    console.log(this.$route.params.id);
  },
  computed: {
    ...mapState(["videos"]),
    video() {
      return this.videos.find(video => video.id == this.$route.params.id);
    }
  }
};
</script>

<style>
</style>vue