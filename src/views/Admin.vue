<template>
  <div>
    <h1 class="display-3 mb-10">Admin Page</h1>

    <v-tabs class="mb-5">
      <v-tab :to="{ name: 'admin-video-list' }">Videos</v-tab>
      <v-tab :to="{ name: 'admin-tag-list' }">Tags</v-tab>
      <v-tab :to="{ name: 'admin-user-list' }">Users</v-tab>
    </v-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
