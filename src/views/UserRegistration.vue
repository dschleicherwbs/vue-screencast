<template>
  <div>
    <h1>Sign Up</h1>
    <UserAuthForm :submitForm="registerUser" buttonText="Sign Up" hasName />
  </div>
</template>

<script>
import UserAuthForm from "@/components/UserAuthForm.vue";

export default {
  components: {
    UserAuthForm
  },
  methods: {
    async registerUser(userInfo) {
      const user = await this.$store.dispatch("registerUser", userInfo);
      if (user.error) {
        alert(user.error);
      } else {
        alert("Welcome to our App, " + user.name);
      }
    }
  }
};
</script>

<style></style>
