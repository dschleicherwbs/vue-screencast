<template>
  <div class="tag-buttons">
    <v-btn
      v-for="tag_id in tag_ids"
      :key="tag_id"
      :to="'/tag/' + tag_id + '/'"
      exact
      text
      :block="false"
      small
    >{{ '#' + get(tag_id).name }}</v-btn>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TagButtons",
  computed: {
    ...mapGetters({
      get: "tags/get"
    })
  },
  props: {
    tag_ids: {
      type: Array,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
.tag-buttons {
  display: flex;
}
</style>