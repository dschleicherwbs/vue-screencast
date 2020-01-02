<template>
  <div>
    Hello
    <div class="users" v-for="user in users" :key="user.id">
      <div>{{ user.name }}</div>
      <v-btn color="secondary" x-small depressed @click="loginUSer(user)">Login</v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["users"])
  },
  methods: {
    loginUSer(user) {
      this.$store.dispatch("loginUser", user);
    }
  },
  mounted() {
    this.$store.dispatch("loadUsers");
  }
};
</script>

<style lang="scss" scoped>
.users {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-items: start;

  grid-template-columns: 200px min-content;
}
</style>