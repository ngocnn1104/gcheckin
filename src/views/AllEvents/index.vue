<template>
  <div class="all-events" v-loading="loading">
    <div style="text-align: left;">
      <h3 style="display: inline-block; margin-left: 10px;">ALL EVENTS</h3>
      <el-button-group
        style="float: right; display: inline-block; padding-top: 15px;"
      >
        <el-button
          size="small"
          icon="el-icon-menu"
          :class="{ active: view === 'grid' }"
          @click="view = 'grid'"
        >
          Grid
        </el-button>
        <el-button
          size="small"
          :class="{ active: view === 'list' }"
          @click="view = 'list'"
        >
          <svg-icon
            icon-class="list"
            style="font-size: 12px; margin-right: 5px; padding-bottom: 2px;"
          />
          List
        </el-button>
      </el-button-group>
    </div>

    <events-table v-if="view === 'list' && !loading" />
    <events-grid v-if="view === 'grid' && !loading" />
  </div>
</template>

<script>
import EventsTable from "./EventsTable.vue";
import EventsGrid from "./EventsGrid.vue";
import events from "@/graphql/events";

export default {
  components: { EventsTable, EventsGrid },

  data() {
    return {
      view: "grid",
      loading: false
    };
  },

  async created() {
    this.loading = true;
    try {
      const res = await this.$apollo.query(events.GET);
      this.$store.commit("updateEvents", res.data.events);
    } catch (err) {
      this.$message({
        message: err.message,
        type: "error"
      });
    }
    this.loading = false;
  }
};
</script>

<style lang="scss">
.all-events {
  .el-button.active {
    z-index: 10;
    border-color: #b3d8ff;
    color: #409eff;
    background-color: #ecf5ff;
  }

  .el-button:hover {
    background-color: white;
  }
}
</style>

<style lang="scss" scoped>
body {
  margin: 0;
}
</style>
