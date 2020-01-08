//
https://www.youtube.com/watch?v=aV3B3n6YRPg&list=PLPwpWyfm6JADRf8x1Jc0Da8R71WJyt-Jn&index=16
5min

<template>
  <div>
    <v-container v-for="tag in tags" :key="tag.id" d-flex justify-space-between>
      <div>{{ tag.name }}</div>
      <div>
        <router-link :to="{ name: 'tag', params: { id: tag.id } }">{{
          tag.video_ids.length
        }}</router-link>
      </div>
      <div><v-btn>DO!</v-btn></div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["tags"])
  }
};
</script>

<style></style>
