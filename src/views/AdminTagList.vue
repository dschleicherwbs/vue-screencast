//
https://www.youtube.com/watch?v=aV3B3n6YRPg&list=PLPwpWyfm6JADRf8x1Jc0Da8R71WJyt-Jn&index=16
5min

<template>
  <div>
    <div class="container" v-for="tag in tags" :key="tag.id">
      <div>
        <div v-if="tagEditingId == tag.id">
          <v-text-field
            @blur="updateTagName(tag)"
            @keydown.enter="updateTagName(tag)"
            v-model="tag.name"
            :id="`tag-edit-${tag.id}`"
          />
        </div>
        <div v-else class="tagName" @click="setToEditing(tag)">{{ tag.name }}</div>
      </div>
      <div>
        <router-link class="tag-link" :to="{ name: 'tag', params: { id: tag.id } }">
          {{
          tag.video_ids.length
          }}
        </router-link>
      </div>
      <div class="btn-box">
        <v-btn icon x-large @click="setToEditing(tag)">
          <font-awesome-icon icon="edit" />
        </v-btn>
        <v-btn icon x-large color="error" @click="deleteTag(tag)">
          <font-awesome-icon icon="trash" />
        </v-btn>
      </div>
    </div>
    <div class="mt-5">
      <v-btn v-if="!isEditingNewTag" @click="createNewTag()">New Tag</v-btn>
      <v-text-field v-else v-model="newTagName" id="new-tag-name" @keydown.enter="createTag(tag)" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      isEditingNewTag: false,
      newTagName: "",
      tagEditingId: "",
      nameBeforeEditing: ""
    };
  },
  computed: {
    ...mapState({
      tags: state => state.tags.tags
    })
  },
  methods: {
    setToEditing(tag) {
      this.nameBeforeEditing = tag.name;
      this.tagEditingId = tag.id;
      this.$nextTick(() => {
        document.getElementById(`tag-edit-${tag.id}`).focus();
      });
    },
    updateTagName(tag) {
      if (tag.name != this.nameBeforeEditing) {
        this.$store.dispatch("tags/updateName", { tag });
      }
      this.tagEditingId = "";
    },
    deleteTag(tag) {
      const confirmed = confirm(`Are you sure to delete tag: ${tag.name}`);
      if (confirmed) {
        this.$store.dispatch("tags/delete", { tag });
      }
    },
    createNewTag() {
      this.isEditingNewTag = true;
      this.$nextTick(() => {
        document.getElementById("new-tag-name").focus();
      });
    },
    createTag() {
      if (this.newTagName.trim().length > 0) {
        this.$store.dispatch("tags/create", { name: this.newTagName });
        this.newTagName = "";
        this.isEditingNewTag = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr min-content;
  align-items: center;

  &:nth-child(even) {
    background-color: #fff;
  }

  .btn-box {
    display: grid;
    grid-auto-flow: column;
  }

  .tagName {
    cursor: pointer;
  }
}
</style>
