<template>
  <section
    class="sidebar__container"
    :class="{ 'sidebar__container--minimized': this.isSidebarMinimized }"
  >
    <div class="sidebar__heading">
      <app-logo class="sidebar__logo" />
      <transition name="text-minimize">
        <h2 v-if="!isSidebarMinimized" class="heading__title">
          <!-- Computed property based on route to show correct sidebar heading -->
          PROJECTS
        </h2>
      </transition>
    </div>

    <!-- Sidebar button controls -->
    <component :is="renderControlsPerRoute" />

    <transition name="minimize">
      <section v-if="!isSidebarMinimized" class="sidebar__content">
        <!-- WILL MOST LIKELY WANT TO MAKE SidebarContentTemplate USING SLOTS -->
        <!-- /Summary, /Graphs - show projects -->
        <!-- /Notes - show list of Project's Notes -->
        <!-- /Thesaurus - show list of created Lexicons -->
        <!-- /Write - show version history?? -->
        <component :is="renderContentPerRoute" />
      </section>
    </transition>

    <div class="sidebar__spacer" />

    <button
      class="btn-dark sidebar__settings"
      :class="{ 'sidebar__settings--active': isSidebarMinimized }"
      @click="openSettings"
    >
      <app-icon-gear class="settings__gear" />
      <transition name="text-minimize">
        <p v-if="!isSidebarMinimized" class="settings__text">
          Settings
        </p>
      </transition>
    </button>

    <button
      class="btn-none arrow__container--sidebar"
      @click="handleSidebarOpen"
    >
      <div
        :class="{
          'arrow--sidebar': true,
          'arrow--sidebar--active': !isSidebarMinimized
        }"
      ></div>
    </button>
  </section>
</template>

<script>
import { setterMixin } from "../mixins/modalMixins";
import AppLogo from "./AppLogo";
import AppIconGear from "./AppIconGear";
import SidebarContentProject from "./SidebarContentProject.vue";
import UserFormSettings from "./UserFormSettings.vue";
import SidebarControlsProject from "./SidebarControlsProject.vue";
import { mapMutations, mapState } from "vuex";

export default {
  components: {
    AppLogo,
    SidebarContentProject,
    AppIconGear,
    SidebarControlsProject
  },
  data() {
    // SET DEFAULT VALUES BASED ON USER SETTINGS (WHATEVER THE USER LAST CLICKED ON, IS WHAT YOU SHOW)
    // ALWAYS SAVE THE LAST ROUTE USER WAS AT AND RELOAD THAT VIEW
    return {
      areDetailsVisible: true
    };
  },

  mixins: [setterMixin],

  methods: {
    ...mapMutations("layout", ["setIsSidebarMinimized"]),
    openSettings() {
      this.setModal("Form", UserFormSettings);
    },
    handleSidebarOpen() {
      this.setIsSidebarMinimized(!this.isSidebarMinimized);
    }
  },

  computed: {
    ...mapState("layout", ["isSidebarMinimized"]),
    renderControlsPerRoute() {
      const route = this.$route.name;
      switch (route) {
        case "Summary":
          return SidebarControlsProject;

        default:
          return SidebarControlsProject;
      }
    },
    renderContentPerRoute() {
      const route = this.$route.name;
      switch (route) {
        case "Summary":
          return SidebarContentProject;

        default:
          return SidebarContentProject;
      }
    }
  }
};
</script>

<style scoped>
.sidebar__container {
  display: flex;
  flex-flow: column nowrap;
  color: var(--white);
  background: var(--black);
  box-shadow: var(--shadowRight);
  padding-top: 10px;
  overflow-y: hidden;
  overflow-x: hidden;
}

.sidebar__container--minimized {
  justify-content: space-between;
}

.sidebar__heading {
  display: grid;
  grid-template-columns: 42px 207px;
  align-items: flex-end;
  margin-bottom: 8px;
  height: 41px;
}

.heading__title {
  grid-column: 2;
  place-self: self-start;
  align-self: center;
  font-size: 1.2rem;
  font-weight: var(--weightBolder);
  letter-spacing: var(--spacingSmall);
  user-select: none;
  margin: 0;
  padding-left: 8px;
}

.sidebar__content {
  flex-grow: 1;
  height: 80%;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar__spacer {
  flex-grow: 1;
}

.sidebar__settings {
  align-self: center;
  margin-top: 10px;
  width: 110px;
  transition: all 0.6s;
}

.sidebar__settings--active {
  width: 52px;
  height: 29.95px;
}

.settings__gear {
  position: absolute;
  width: 20px;
  height: 20px;
  transition: var(--btnHover);
}

.settings__text {
  padding: 0;
  margin: 0;
  margin-left: 25px;
}

.sidebar__settings:hover > .settings__gear {
  fill: var(--lightDarkGray);
}

/* State transitions */
.minimize-enter-active,
.text-minimize-enter-active {
  transition: all 0.6s ease;
  overflow: hidden;
}

.minimize-enter,
.text-minimize-enter {
  transform: translateX(-30px);
  opacity: 0;
}

.minimize-leave-active,
.text-minimize-leave-active {
  transition: all 0.6s ease;
  overflow: hidden;
}

.minimize-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

.text-minimize-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
</style>
