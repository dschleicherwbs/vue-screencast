// https://www.youtube.com/watch?v=vaCrzaeC-RE 27min

<template>
  <div class="home">
    <h1 class="heading-1">Videos</h1>
    <div class="video-container">
      <router-link
        v-for="video in videos"
        :key="video.name"
        :to="'/video/' + video.id"
      >
        <div class="video-card">
          <img :src="video.thumbnail" alt />
          <div class="text">
            <div class="video-card__header">
              <h4>{{ video.name }}</h4>
            </div>
            <div class="video-card__body">{{ video.description | limit }}</div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",

  computed: {
    videos() {
      return this.$store.state.videos;
    }
  },
  filters: {
    limit(str) {
      const limit = 80;

      if (str.length > limit) {
        const words = str
          .replace("<p>", "")
          .replace("</p>", "")
          .split(" ");
        let shortenStr = "";

        for (let word of words) {
          if (word.length + shortenStr.length < limit) {
            shortenStr += word + " ";
          } else {
            break;
          }
        }

        return shortenStr + "...";
      }
      return str;
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  padding-top: 5rem;
  background-color: var(--bg-med-color);
}

.heading-1 {
  margin-bottom: var(--space-2);
}

.video-container {
  padding-top: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 270px));
  gap: 2rem;
  align-items: flex-start;
  justify-content: left;
}

.video-card {
  text-align: left;
  box-shadow: var(--shadow-m);
  background-color: var(--main-color);
  border-radius: var(--br-m);
  display: flex;
  flex-direction: column;

  &__header,
  &__body {
    padding: var(--space-05);
    border-radius: 0 0 var(--br-m) var(--br-m);
  }

  &__header {
    background-color: var(--highlight-color);
    border-top: 5px solid var(--highlight-color);
    color: var(--highlight-font-color);
    letter-spacing: 1.5px;
  }

  &__body {
    padding-bottom: var(--space-1);
    border-radius: 0 0 var(--br-m) var(--br-m);
    background-image: linear-gradient(
      to bottom,
      var(--main-color),
      var(--main-color-light)
    );
    border-bottom: 3px solid var(--main-color-light);
  }

  img {
    border-radius: var(--br-m) var(--br-m) 0 0;
    display: inline-block;
    width: 100%;
  }
}
</style>
