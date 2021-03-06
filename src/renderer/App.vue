<template>
  <section id="app" class="app__layout">
    <sidebar-container
      :class="{ sidebar: true, 'sidebar--minimized': isSidebarMinimized }"
    />

    <div class="main__container">
      <the-controls class="controls" />

      <transition name="project-fade">
        <div :key="this.dashboardTransitionKey">
          <the-dashboard-heading class="dashboard__heading" />
          <!-- To have route-based transitions,
      need to watch the route and check where we are and where we're going
      and dynamically change the class-->
          <transition name="slide-up">
            <router-view class="dashboard" />
          </transition>
        </div>
      </transition>
    </div>

    <the-modal />
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TheControls from "./components/TheControls.vue";
import TheModal from "./components/TheModal.vue";
import SidebarContainer from "./components/SidebarContainer.vue";
import TheDashboardHeading from "./components/TheDashboardHeading.vue";

export default {
  components: { SidebarContainer, TheControls, TheModal, TheDashboardHeading },
  data() {
    return {
      dashboardTransitionKey: 0
    };
  },

  methods: {
    ...mapActions("projects", ["getProjects"]),
    // forces component to rerender because changes in state do not force re-renders
    forceRerender() {
      this.dashboardTransitionKey++;
    }
  },

  computed: {
    ...mapState("layout", ["isSidebarMinimized"])
  },

  // added ...mapState outside a method so created() can use it
  ...mapState("projects", ["selectedProject"]),

  // Using created() method because we are not changing the DOM, only state.
  // if changing the DOM, use mounted()
  created() {
    // On page reload/refresh, state resets but not the URL, so id params exist without fetching data, this code resets the url
    if (this.selectedProject === undefined && this.$route.path !== "/summary") {
      this.$router.push("/summary");
    }
    // TODO
    // Need to check, on create, if slectedProject state is === an empty object, if it is, set route to /summary
    this.getProjects();
  },

  watch: {
    // Whenever the route path changes, run this code
    $route(to, from) {
      const initialRouteId = from.params.id;
      const nextRouteId = to.params.id;

      // Check if transition class should change if the project changes
      if (initialRouteId !== nextRouteId) {
        console.log("GOING TO NEW ID, TRANSITION!");
        this.forceRerender();
      }

      // Need to ensure the user can not go back or forwards through URLs
      // https://forum.vuejs.org/t/vue-router-is-there-a-way-to-flush-the-history/6798/3
      // above link talks about storing the previous route to compare it to the one the user is trying to go to
      // You can then try to intercept it and route them elsewhere to simulate disabled forward & backwards
      console.log("ROUTE CHANGE:", this.$router.currentRoute);
    }
  }
};
</script>

<style>
@import "./global.css";

.app__layout {
  display: flex;
  flex-flow: row nowrap;
  height: 100vh;
  width: 100%;
}

.sidebar {
  flex-shrink: 0;
  width: 250px;
  margin-right: 30px;
  transition: all 0.35s ease;
}

.sidebar--minimized {
  width: 50px;
}

.main__container {
  width: 100%;
  overflow-y: scroll;
}

.controls,
.dashboard__heading {
  background-color: var(--darkestWhite);
}

.dashboard {
  z-index: -1;
}

/* Header transitions */
.project-fade-enter-active,
.project-fade-leave-active {
  transition: all 0.3s;
  position: absolute;
}

.project-fade-enter,
.project-fade-leave-to {
  opacity: 0;
}

/* Dashboard transitions */
/* Currently not drilling down and then rising on reverse, will need to add that logic */
/* https://router.vuejs.org/guide/advanced/transitions.html#route-based-dynamic-transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.8s;
  position: absolute;
}

.slide-up-enter {
  opacity: 0;
  transform: translateY(200px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-200px);
}
</style>
