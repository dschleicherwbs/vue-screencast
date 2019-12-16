<template>
  <div id="app">
    <div class="navbar">
      <div class="logo">
        <router-link to="/">
          <img src="./assets/logo.svg" class="logo__img" />
        </router-link>
      </div>
      <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/about">Videos</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/video">Contact</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    this.$store.dispatch("loadVideos");
  },
  components: {}
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
  color: currentColor;
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
  line-height: 1.5;
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
