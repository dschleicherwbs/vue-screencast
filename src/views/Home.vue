<template>
  <div class="home">
    <h1 class="d-flex display-3 justify-start">Videos</h1>
    <VideoList />
  </div>
</template>

<script>
import { mapState } from "vuex";
import VideoList from "@/components/VideoList";

export default {
  name: "home",
  components: {
    VideoList
  },
  computed: {
    ...mapState({
      videos: state => state.videos.videos,
      tags: state => state.tags.tags
    })
  }
};
</script>


