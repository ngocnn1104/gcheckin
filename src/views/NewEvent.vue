<template>
  <div class="create-event-form">
    <h3>CREATE NEW EVENT</h3>
    <el-form ref="create-event-form" :model="newEvent" :rules="formRules">
      <el-form-item prop="name">
        <label>Event name</label>
        <el-input
          v-model="newEvent.name"
          type="text"
          tabindex="1"
          maxlength="50"
        ></el-input>
      </el-form-item>
      <el-form-item prop="startAt">
        <label>Event starts at</label>
        <el-date-picker
          v-model="newEvent.startAt"
          name="start time"
          type="datetime"
          tabindex="2"
          clearable
          picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="maxSeats">
        <label>Maximum seats</label>
        <el-slider
          v-model="newEvent.maxSeats"
          :min="10"
          :max="500"
          :step="10"
          :marks="marks"
        >
        </el-slider>
      </el-form-item>

      <el-button class="clear-button" @click="clearForm" :disabled="loading"
        >Clear</el-button
      >
      <el-button
        class="create-button"
        type="primary"
        @click="createEvent"
        :loading="loading"
        >Create event</el-button
      >
    </el-form>
  </div>
</template>

<script>
import events from "@/graphql/events";

export default {
  data() {
    return {
      newEvent: {
        name: "",
        startAt: null,
        maxSeats: 100
      },
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
        disabledDate: date => {
          return date < new Date();
        }
      },
      marks: {
        10: "10",
        100: "100",
        200: "200",
        300: "300",
        400: "400",
        500: "500"
      },
      loading: false
    };
  },
  methods: {
    clearForm() {
      this.$refs["create-event-form"].resetFields();
    },
    createEvent() {
      this.$refs["create-event-form"].validate(async valid => {
        if (valid) {
          this.loading = true;
          try {
            const res = await this.$apollo.mutate({
              mutation: events.CREATE,
              variables: {
                ...this.newEvent
              }
            });
            this.$store.commit("updateEventDetails", res.data.createEvent);
            this.$router.push("/dashboard/event");
          } catch (err) {
            this.$message({
              message: err.message,
              type: "error"
            });
          }
          this.loading = false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.create-event-form {
  max-width: 80%;
  margin: 0 auto;

  label {
    display: block;
    text-align: left;
  }

  .el-date-editor {
    width: 100%;
  }

  .create-button {
    margin-top: 50px;
  }
}
</style>
