<template>
  <el-row v-if="!eventsList.length">
    <el-col :xs="24">
      <img :src="localBlankPageImage" alt="blank page" class="blank-page" />
      <p>No events found.</p>
    </el-col>
  </el-row>

  <el-row v-else class="events-grid">
    <el-col
      v-for="event in eventsList"
      :key="event.id"
      :xs="24"
      :sm="8"
      :md="6"
    >
      <el-card class="box-card-component" style="margin-left:8px;">
        <div style="position:relative;" @click="handleClick(event)">
          <pan-thumb :image="eventImage(event.status)" class="panThumb" />
          <p class="event-name">{{ event.name }}</p>
          <div
            style="padding: 30px 0 10px 6px; text-align: left;"
            class="progress-item"
          >
            <i class="el-icon-time" style="margin-right: 10px;"></i>
            <span>{{ eventDateTime(event.startAt, event.endAt) }}</span>
          </div>
          <div class="progress-item">
            <strong class="small-text">Attendees</strong>
            <el-progress :percentage="97" :color="dangerToSuccess(97)" />
          </div>
          <div class="progress-item">
            <strong class="small-text">Emails sent</strong>
            <el-progress :percentage="85" :color="successToDanger(85)" />
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import PanThumb from "@/components/PanThumb";
import openImage from "@/assets/open.png";
import closeImage from "@/assets/close.png";
import blankPage from "@/assets/blank-page.png";
import { mapGetters } from "vuex";

const dangerColor = "#f56c6c";
const warningColor = "#e6a23c";
const successColor = "#67c23a";

export default {
  components: { PanThumb },

  computed: {
    ...mapGetters(["eventsList"]),
    localOpenImage() {
      return openImage;
    },
    localCloseImage() {
      return closeImage;
    },
    localBlankPageImage() {
      return blankPage;
    },
    eventImage() {
      return status =>
        status.includes("CLOSING") ? this.localCloseImage : this.localOpenImage;
    },
    eventDateTime() {
      return (startAt, endAt) => {
        const startString = new Date(startAt).toLocaleString("en-GB");
        let endString;
        if (endAt) endString = new Date(endAt).toLocaleString("en-GB");
        if (endString) {
          return `${startString} to ${endString}`;
        }
        return startString;
      };
    },
    dangerToSuccess() {
      return percentage => {
        if (percentage < 11) {
          return dangerColor;
        } else if (percentage < 81) {
          return warningColor;
        }
        return successColor;
      };
    },
    successToDanger() {
      return percentage => {
        if (percentage < 11) {
          return successColor;
        } else if (percentage < 80) {
          return warningColor;
        }
        return dangerColor;
      };
    }
  },

  methods: {
    handleClick(event) {
      this.$store.commit("updateEventDetails", event);
      this.$router.push("/dashboard/event");
    },
    format(percentage) {
      return percentage === 100 ? "Full" : `${percentage}%`;
    }
  }
};
</script>

<style lang="scss">
img.blank-page {
  width: 30%;
}

.events-grid {
  .box-card-component {
    .el-card__header {
      padding: 0px !important;
    }

    .el-card__body {
      padding: 10px;
    }
    overflow: visible;
    margin-top: 10px;
    cursor: pointer;

    .panThumb {
      z-index: 100;
      height: 55px !important;
      width: 55px !important;
      position: absolute !important;
      top: -26px;
      left: -20px;
      margin: auto;
      box-shadow: none !important;

      .pan-thumb {
        border-radius: 0 !important;
      }

      /deep/ .pan-info {
        display: none;
      }
    }
    .progress-item {
      margin-bottom: 10px;
      font-size: 14px;
    }
  }

  .small-text {
    font-size: 12px;
  }

  .event-name {
    font-weight: bold;
    text-align: left;
    margin-left: 75px;
    margin-top: 10px;
    margin-bottom: 0;
  }
}
</style>
