<template>
  <section class="controls">
    <div class="controls__container">
      <search-bar
        @searched="searchGlobally"
        :results="searchResults"
        class="controls__searchbar"
      />

      <!-- Date filtering drop-downs populated with currently selected projects available dates -->
      <div class="DATESORTING">
        Date sorting
      </div>
    </div>
    <hr class="controls__hr" />
  </section>
</template>

<script>
import { ipcRenderer } from "electron";
import SearchBar from "./SearchBar.vue";

export default {
  data() {
    return {
      searchResults: []
    };
  },
  components: { SearchBar },
  methods: {
    async searchGlobally(query) {
      // Once you get the returned input value, send the search ipc event out
      const response = await ipcRenderer.invoke("search-globally", query);

      if (response) {
        this.searchResults = response;
      } else {
        console.log("ERROR WHILE SEARCHING. RESPONSE WAS:", response);
      }
    }
  }
};
</script>

<style scoped>
.controls {
  padding-top: 15px;
  width: 95%;
}

.controls__container {
  height: 2.5rem;
}

/* CHANGE TO ACTIVE 1 or 0 BASED ON GLOBAL IS MODAL OPEN STATE!!! */
.controls__searchbar {
  z-index: 1;
}

.DATESORTING {
  margin-top: 8px;
  float: right;
}

.controls__hr {
  background-color: var(--lightGray);
  margin: 15px 0 0 0;
}
</style>
