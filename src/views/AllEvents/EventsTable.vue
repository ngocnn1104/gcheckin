<template>
  <div>
    <el-table
      v-loading="loading"
      :data="eventsList"
      border
      @row-click="handleRowClick"
      style="cursor: pointer;"
    >
      <el-table-column type="index" :index="indexMethod" align="center" />
      <el-table-column label="Starts at" align="left">
        <template slot-scope="{ row }">
          <span>{{ new Date(row.startAt).toLocaleString("en-GB") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Name" align="left">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" align="center">
        <template slot-scope="{ row }">
          <el-tag
            :type="row.status.includes('CLOSING') ? 'danger' : 'success'"
            >{{ row.status }}</el-tag
          >
        </template>
      </el-table-column>
      <!-- <el-table-column label="Actions" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
            {{ $t('table.publish') }}
          </el-button>
          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
            {{ $t('table.draft') }}
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(row,'deleted')">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: false
    };
  },

  computed: {
    ...mapGetters(["eventsList"])
  },

  methods: {
    indexMethod(index) {
      return index + 1;
    },
    handleRowClick(row) {
      this.$store.commit("updateEventDetails", row);
      this.$router.push("/dashboard/event");
    }
  }
};
</script>

<style></style>
