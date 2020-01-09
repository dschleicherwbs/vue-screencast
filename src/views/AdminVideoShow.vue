<template>
  <v-container>
    <div class="title">{{ video.name }}</div>
    <div class v-html="video.description"></div>
    <v-combobox
      :items="tags"
      item-text="name"
      v-model="videoTags"
      multiple
      chips
      deletable-chips
      hide-selected
      return-object
    ></v-combobox>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import _ from "lodash";

export default {
  created() {
    this.$store.dispatch("tags/loadAll");
  },
  components: {
    //
  },
  computed: {
    ...mapState({
      videos: state => state.videos.videos,
      tags: state => state.tags.tags
    }),
    ...mapGetters({
      getTags: "tags/get"
    }),
    video() {
      const video = this.videos.find(
        video => video.id == this.$route.params.id
      );
      return video;
    },
    videoTags: {
      get() {
        return this.video.tag_ids.map(id => this.getTags(id));
      },
      async set(newTags) {
        const createdTag = newTags.find(t => typeof t == "string");
        if (createdTag) {
          const newTag = await this.$store.dispatch("tags/create", {
            name: createdTag
          });
          this.$store.dispatch("tags/connectToVideo", {
            tag: newTag,
            video: this.video
          });
        } else {
          const addedTags = _.differenceBy(newTags, this.videoTags, "id");
          const removedTags = _.differenceBy(this.videoTags, newTags, "id");
          if (addedTags.length > 0) {
            this.$store.dispatch("tags/connectToVideo", {
              tag: addedTags[0],
              video: this.video
            });
          }
          if (removedTags.length > 0) {
            this.$store.dispatch("tags/disconnectFromVideo", {
              tag: removedTags[0],
              video: this.video
            });
          }
        }
      }
    }
  }
};
</script>

<style></style>
