<!-- Popout menu will be a hover-over and click-based menu
  PopoutMenuTemplate
    - Has the off-click event listener for clicking anywhere outside of pop-out menu
      (unless this is for a isHover then hovering off pop-out will turn it off)
   -->
<template>
  <!-- NEED TO WRAP IN A TRANSITION!! FOR ANIMATING! -->
  <section class="popout__container">
    <button
      ref="popoutButton"
      class="btn-white icon__btn"
      @click="handlePopoutMenu"
    >
      <slot name="popout-btn-icon">
        Icon
      </slot>
    </button>
    <transition name="open-slide">
      <section
        v-if="this.isOpen"
        v-closable="{
          exclude: ['popoutButton'],
          handler: 'handlePopoutMenu'
        }"
        class="container__items"
      >
        <slot name="popout-content">
          Items Here
        </slot>
      </section>
    </transition>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    handlePopoutMenu() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style scoped>
.icon__btn {
  padding: 0;
  width: 4.5rem;
  display: flex;
  justify-content: center;
  box-shadow: none;
}

.popout__container {
  background-color: var(--white);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadowCentered);
}

.container__items {
  background-color: var(--white);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadowCentered);
}

/* Transitions */
.open-slide-enter-active,
.open-slide-leave-active {
  transition: all 0.1s;
}

.open-slide-enter,
.open-slide-leave-to {
  margin-top: -30px;
  opacity: 0;
}
</style>
