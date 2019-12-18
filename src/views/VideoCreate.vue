//
https://www.youtube.com/watch?v=XygcDWMLYO8&list=PLPwpWyfm6JADRf8x1Jc0Da8R71WJyt-Jn&index=6

<template>
  <div class="d-flex flex-column align-start">
    <h1 class="display-3">New Video</h1>
    <div class="inputField">
      <label for="title">Title</label>
      <input
        type="text"
        name="title"
        v-model="video.title"
        placeholder="hello?"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "video-create",
  data() {
    return {
      video: {
        title: ""
      }
    };
  }
};
</script>

<style></style>
