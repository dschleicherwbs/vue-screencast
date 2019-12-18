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
        <v-btn text to="/video/new">Add Video</v-btn>
        <v-btn text>
          Login
        </v-btn>
      </div>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},
  mounted() {
    this.$store.dispatch("loadVideos");
  },
  data: () => ({
    //
  })
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

.display-3 {
  text-align: left !important;
}

.app-bar {
  .text-highlight {
    font-weight: 700;
  }
}

#app {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.8;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--font-color);
  padding: 4rem 5rem;
}

.app-bar {
  background-color: rgba($color: #fff, $alpha: 0.985) !important;
}
</style>
