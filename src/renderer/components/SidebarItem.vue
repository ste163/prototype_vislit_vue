<template>
  <!-- Clicking sets the id in route param -->
  <button @click="handleItemSelect" class="btn-none item__container">
    <h4 class="item__header">{{ item.title }}</h4>
    <p class="item__details">{{ item.description }}</p>
    <p v-if="item.dateCreated" class="item__date">
      {{ formatDateString(item.dateCreated) }}
    </p>
  </button>
</template>

<script>
import { dateMixin } from "../mixins/dateMixins";

export default {
  props: { item: Object },
  mixins: [dateMixin],
  methods: {
    handleItemSelect() {
      this.$emit("item-selected", this.item);
    }
  }
};
</script>

<style>
.item__container {
  /* Will need to be a grid for placing the 'pinned' icon in correct place */
  display: flex;
  flex-flow: column nowrap;
  align-items: start;
  width: 100%;
  color: var(--white);
  background-color: var(--darkGray);
  font-size: 0.9rem;
  margin-bottom: 10px;
  padding-left: 10px;
  text-align: left;
  transition: all 0.2s;
}

.item__container:hover {
  background-color: var(--vislitBlue);
  color: var(--darkBlack);
}

.item__container:active {
  background-color: var(--vislitDarkBlue);
  color: var(--white);
}

.item__header {
  user-select: none;
  font-weight: var(--weightBolder);
  font-size: 0.9rem;
  letter-spacing: var(--spacingSmaller);
  margin: 0;
}

.item__details {
  user-select: none;
  margin: 0;
}

.item__date {
  user-select: none;
  margin: 0;
}
</style>
