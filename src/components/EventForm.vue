<template>
  <el-form
    ref="event-form"
    :model="eventDetails"
    :rules="formRules"
    class="event-form"
  >
    <el-form-item prop="name">
      <label>Event name</label>
      <el-input
        v-model="eventDetails.name"
        type="text"
        tabindex="1"
        maxlength="50"
        @change="value => updateSingleEventDetail({ key: 'name', value })"
      ></el-input>
    </el-form-item>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12">
        <el-form-item prop="startAt">
          <label>Event starts at</label>
          <el-date-picker
            v-model="eventDetails.startAt"
            name="start time"
            type="datetime"
            tabindex="2"
            clearable
            picker-options="pickerOptions"
            @change="
              value => updateSingleEventDetail({ key: 'startAt', value })
            "
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <!-- <el-col :xs="24" :sm="12">
        <el-form-item prop="endAt">
          <label>Event ends at</label>
          <el-date-picker
            v-model="eventDetails.endAt"
            name="end time"
            type="datetime"
            tabindex="2"
            clearable
            picker-options="pickerOptions"
            @change="value => updateSingleEventDetail({ key: 'endAt', value })"
          ></el-date-picker>
        </el-form-item>
      </el-col> -->
    </el-row>

    <el-form-item prop="maxSeats">
      <label>Maximum seats</label>
      <el-slider
        v-model="eventDetails.maxSeats"
        :min="10"
        :max="500"
        :step="10"
        :marks="marks"
        @change="value => updateSingleEventDetail({ key: 'maxSeats', value })"
      >
      </el-slider>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import EventBus from "@/EventBus";

export default {
  data() {
    return {
      formRules: {
        name: [
          {
            required: true,
            trigger: "blur",
            message: "Please input event name."
          }
        ],
        startAt: [
          {
            required: true,
            trigger: "blur",
            message: "Please select event starting date and time."
          }
        ]
      },
      pickerOptions: {
        // disabledDate: date => {
        //   return date < new Date();
        // }
      },
      marks: {
        10: "10",
        100: "100",
        200: "200",
        300: "300",
        400: "400",
        500: "500"
      }
    };
  },
  computed: {
    ...mapGetters(["eventDetails"])
  },
  created() {
    EventBus.$on("validate-event-form", this.validateForm);
    EventBus.$on("clear-event-form", this.clearForm);
    EventBus.$on("clear-validate", this.clearValidate);
  },
  beforeDestroy() {
    EventBus.$off("validate-event-form", this.validateForm);
    EventBus.$off("clear-event-form", this.clearForm);
    EventBus.$off("clear-validate", this.clearValidate);
  },
  methods: {
    ...mapMutations(["updateSingleEventDetail", "resetEventDetails"]),
    async validateForm() {
      const valid = await this.$refs["event-form"].validate();
      this.$emit("FormValidated", valid);
    },
    clearForm() {
      this.clearValidate();
      this.resetEventDetails();
    },
    clearValidate() {
      this.$refs["event-form"].clearValidate();
    }
  }
};
</script>

<style lang="scss">
.event-form {
  max-width: 90%;
  margin: 0 auto;

  label {
    display: block;
    text-align: left;
  }

  .el-date-editor {
    width: 100%;
  }
}
</style>
