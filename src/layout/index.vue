<template>
  <div>
    <Navbar />
    <Sidebar v-if="!$route.fullPath.includes('/event')" />
    <router-view
      class="main-content"
      :class="{ 'full-width': $route.fullPath.includes('/event') }"
    />
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";

export default {
  components: { Sidebar, Navbar }
};
</script>

<style lang="scss">
.main-content {
  margin: 20px 10px 0 60px;

  &.full-width {
    margin-left: 0px;
  }
}

.sidebar {
  z-index: 1000;
}
</style>
