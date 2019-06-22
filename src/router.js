import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: () =>
        import(/* webpackChunkName: "auth" */ "./views/Login.vue")
    },
    {
      path: "/signup",
      name: "Signup",
      component: () =>
        import(/* webpackChunkName: "auth" */ "./views/Signup.vue")
    },
    {
      path: "/dashboard",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layout/index.vue"),
      children: [
        {
          path: "/",
          name: "Dashboard",
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "./views/Dashboard.vue")
        },
        {
          path: "new-event",
          name: "New event",
          component: () =>
            import(/* webpackChunkName: "events" */ "./views/NewEvent.vue")
        },
        {
          path: "all-events",
          name: "Manage events",
          component: () =>
            import(/* webpackChunkName: "events" */ "./views/AllEvents")
        },
        {
          path: "event",
          name: "Event details",
          component: () =>
            import(/* webpackChunkName: "events" */ "./views/Event/index.vue")
        }
      ]
    }
  ]
});
