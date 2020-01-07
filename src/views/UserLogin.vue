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
      const snackbar = {};
      if (user.error) {
        snackbar.text = user.error;
        snackbar.color = "error";
        this.$store.dispatch("setSnackbar", snackbar);
      } else {
        snackbar.text = "Thank you for signing in, " + user.name;
        this.$store.dispatch("setSnackbar", snackbar);
        if (user.admin) {
          this.$router.push("/admin/videos");
        } else {
          this.$router.push("/");
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
