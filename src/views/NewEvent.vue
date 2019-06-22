<template>
  <div class="create-event-form">
    <h3>CREATE NEW EVENT</h3>
    <event-form @FormValidated="createEvent" />

    <el-button class="clear-button" @click="clearForm" :disabled="loading"
      >Clear</el-button
    >
    <el-button
      class="create-button"
      type="primary"
      @click="triggerValidate"
      :loading="loading"
      >Create event</el-button
    >
  </div>
</template>

<script>
import events from "@/graphql/events";
import EventForm from "@/components/EventForm.vue";
import EventBus from "@/EventBus";

export default {
  components: {
    EventForm
  },
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
      EventBus.$emit("clear-event-form");
    },
    triggerValidate() {
      EventBus.$emit("validate-event-form");
    },
    async createEvent(valid) {
      if (valid) {
        this.loading = true;
        try {
          const res = await this.$apollo.mutate(
            events.CREATE({ ...this.newEvent })
          );
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
    }
  }
};
</script>

<style lang="scss">
.create-event-form {
  .create-button {
    margin-top: 50px;
  }
}
</style>
