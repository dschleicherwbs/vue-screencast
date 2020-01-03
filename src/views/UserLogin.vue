<template>
  <div>
    <h1>Login</h1>
    <UserAuthForm :submitForm="loginUser" buttonText="Login" />
  </div>
</template>

<script>
import UserAuthForm from "@/components/UserAuthForm.vue";

export default {
  components: {
    UserAuthForm
  },
  methods: {
    async loginUser(userInfo) {
      const user = await this.$store.dispatch("loginUser", userInfo);
      if (user.error) {
        alert(user.error);
      } else {
        alert("Thank you for signing in, " + user.name);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
