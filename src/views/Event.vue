<template>
  <div>
    <p>{{ eventDetails }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["eventDetails"])
  },
  beforeDestroy() {
    this.$store.commit("clearEventDetails");
  }
};
</script>

<style></style>
