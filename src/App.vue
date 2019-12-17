<template>
  <v-app>
    <v-app-bar class="app-bar pl-12 pr-12" height="120px" app color="#fff" flat>
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

      <v-btn text>
        <span>Login</span>
      </v-btn>
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
.app-bar {
  // background-color: #fff;
  // z-index: 999;
}

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

.heading-1 {
  font-weight: 700;
  text-align: left;
  line-height: 1.3;
}

#app {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--font-color);
  background-color: #fff;
  padding: 4rem 7rem;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  // background-color: var(--main-color);

  a {
    text-decoration: none;
    font-weight: bold;
    color: var(--font-color);

    &:not(:last-child) {
      margin-right: 3rem;
    }

    &:hover {
      color: var(--highlight-color);
    }

    &.router-link-exact-active {
      color: var(--highlight-color);
    }
  }
}
</style>