import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {},
    sidebar: {
      opened: false,
      withoutAnimation: false
    },
    device: "desktop",
    avatar: "",
    permission_routes: [
      {
        meta: {
          activeMenu: true,
          title: "Dashboard",
          icon: "dashboard"
        },
        path: "/dashboard"
      },
      {
        meta: {
          activeMenu: false,
          title: "New event",
          icon: "plus"
        },
        path: "/dashboard/new-event"
      },
      {
        meta: {
          activeMenu: false,
          title: "Manage events",
          icon: "list"
        },
        path: "/dashboard/all-events"
      }
    ],
    eventDetails: {
      name: "",
      startAt: null,
      endAt: null,
      maxSeats: 100
    },
    events: []
  },
  mutations: {
    updateAuth(state, payload) {
      state.auth = { ...payload };
      window.localStorage.setItem("apollo-token", payload.token);
    },
    toggleSidebar(state) {
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
    },
    updateEventDetails(state, payload) {
      state.eventDetails = { ...payload };
    },
    clearEventDetails(state) {
      state.eventDetails = {};
    },
    updateEvents(state, value) {
      state.events = value;
    },
    updateSingleEventDetail(state, { key, value }) {
      state.eventDetails[key] = value;
    },
    resetEventDetails(state) {
      state.eventDetails = {
        name: "",
        startAt: null,
        maxSeats: 100
      };
    }
  },
  actions: {},
  getters: {
    username: state => (state.auth.user ? state.auth.user.name : ""),
    sidebar: state => state.sidebar,
    device: state => state.device,
    avatar: state => state.avatar,
    permission_routes: state => state.permission_routes,
    eventDetails: state => state.eventDetails,
    eventsList: state => state.events
  }
});
