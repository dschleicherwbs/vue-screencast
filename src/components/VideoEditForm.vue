<template>
  <v-form class="form" v-model="formValidated">
    <v-text-field
      v-model="video.name"
      label="Title"
      counter="50"
      :rules="[requriedInput('Name'), minLenght(5), maxLenght(50)]"
    />
    <v-textarea
      rows="4"
      counter
      v-model="video.description"
      label="Description"
      :rules="[requriedInput('Description'),  minLenght(20)]"
    />
    <v-text-field v-model="video.thumbnail" label="Thumbnail URL" />
    <v-text-field v-model="video.videoUrl" label="Video URL" />
    <div class="btn-box">
      <v-btn @click.prevent="endEdit" color="primary" outlined>cancel</v-btn>
      <v-btn
        @click.prevent="saveVideo"
        :disabled="!formValidated"
        color="primary"
        depressed
      >{{ buttonText }}</v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      formValidated: false,
      requriedInput(fieldName) {
        return str => (str && str.length > 0) || `${fieldName} is required`;
      },
      minLenght(length) {
        return str =>
          (str && str.length > length) ||
          `Minimum length is ${length} characters`;
      },
      maxLenght(length) {
        return str =>
          (str && str.length < length) ||
          `Maximum length is ${length} characters`;
      }
    };
  },
  props: ["video", "saveVideo", "endEdit", "buttonText"]
};
</script>

<style lang="scss" scoped>
.btn-box {
  display: grid;
  grid-auto-flow: column;
  gap: 0.7rem;
}
</style>