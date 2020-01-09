<template>
  <v-app>
    <v-app-bar class="app-bar pl-12 pr-12" height="120px" app flat>
      <div class="d-flex align-center justify-center">
        <router-link to="/">
          <v-img
            alt="Logo"
            contain
            src=".\assets\logo.svg"
            transition="scale-transition"
            width="100"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <div class="nav">
        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/admin/videos" v-if="currentUser.admin">Admin</v-btn>
        <div v-if="currentUser.name">
          <v-btn class="nav__user" text>{{ currentUser.name }}</v-btn>
          <v-btn text @click="logoutUser">
            <font-awesome-icon icon="sign-out-alt" />
          </v-btn>
        </div>
        <div class="nav" v-else>
          <v-btn text to="/login">Login</v-btn>
          <v-btn text to="/registration">SignUp</v-btn>
        </div>
      </div>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter(s => s.show)"
      v-model="snackbar.show"
      :key="snackbar.text + Math.random()"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :style="`bottom: ${index * 60 + 10}px`"
      left
      bottom
    >
      {{ snackbar.text }}
      <v-btn text @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser,
      snackbars: state => state.snackbar.snackbars
    })
  },
  components: {},
  mounted() {
    this.$store.dispatch("videos/loadAll");
    this.$store.dispatch("users/loadCurrent");
    this.$store.dispatch("tags/loadAll");
  },
  methods: {
    logoutUser() {
      this.$store.dispatch("users/logout");
    }
  },
  data() {
    return {
      //
    };
  }
};
</script>

<style lang="scss">
@import url("./assets/styles/variables.css");
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a:link,
a:visited {
  text-decoration: none;
  color: currentColor !important;
}

.container {
  display: grid;
  gap: 2rem;
}

.display-3 {
  text-align: left !important;
}

.app-bar {
  background-color: rgba($color: #fff, $alpha: 0.985) !important;
  .text-highlight {
    font-weight: 700;
  }
}

.nav {
  display: grid;
  grid-auto-flow: column;
  column-gap: 2rem;

  &__user {
    font-weight: 700 !important;
  }
}
#app {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.8;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: var(--font-color);
  padding: 4rem 5rem;
}
</style>
