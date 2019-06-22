<template>
  <div>
    <el-tabs v-model="activeTab" tab-position="left">
      <el-tab-pane label="General" name="general">
        <General />
      </el-tab-pane>
      <el-tab-pane label="Reports" name="reports">Config</el-tab-pane>
      <el-tab-pane label="Editors" name="editors">Role</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import General from "./General.vue";

export default {
  components: { General },
  data() {
    return {
      activeTab: "general"
    };
  },
  computed: {
    ...mapGetters(["eventDetails"])
  },
  beforeDestroy() {
    this.$store.commit("clearEventDetails");
  }
};
</script>

<style></style>
