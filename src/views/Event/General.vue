<template>
  <div>
    <event-form @FormValidated="updateEvent" />
    <el-button
      type="primary"
      style="margin-top: 30px;"
      :loading="loading"
      @click="triggerValidate"
      >Save</el-button
    >
  </div>
</template>

<script>
import EventForm from "@/components/EventForm.vue";
import EventBus from "@/EventBus";
import events from "@/graphql/events";
import { mapGetters } from "vuex";

export default {
  components: {
    EventForm
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapGetters(["eventDetails"])
  },
  methods: {
    triggerValidate() {
      EventBus.$emit("validate-event-form");
    },
    async updateEvent(valid) {
      if (valid) {
        this.loading = true;
        const {
          id,
          name,
          startAt,
          maxSeats,
          status,
          isPaid,
          endAt
        } = this.eventDetails;
        try {
          const res = await this.$apollo.mutate(
            events.UPDATE({
              id,
              name,
              startAt,
              maxSeats,
              status,
              isPaid,
              endAt
            })
          );
          this.$store.commit("updateEventDetails", res.data.updateEvent);
          EventBus.$emit("clear-validate");
          this.$message({
            message: "Event saved.",
            type: "success"
          });
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

<style></style>
