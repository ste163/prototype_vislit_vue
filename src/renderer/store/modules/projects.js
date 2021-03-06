import { ipcRenderer } from "electron";

const state = () => ({
  projects: [],
  selectedProject: {}
});

const mutations = {
  setProjects(state, payload) {
    state.projects = payload;
  },
  setSelectedProject(state, payload) {
    state.selectedProject = payload;
  }
};

// TODO:
// Change all actions to use
// A error handler with
// (response instanceof Error) {
// display error toast
// }
const actions = {
  async getProjects({ commit }) {
    const response = await ipcRenderer.invoke("db-projects-get-all");
    if (response) {
      commit("setProjects", response);
    } else {
      console.error(
        "ERROR WHILE GETTING ALL PROJECTS. RESPONSE WAS:",
        response
      );
    }
  },

  async addProject({ dispatch }, project) {
    // TODO:
    // Return the project's ID
    // So we can re-route to the newly created project after creation
    const response = await ipcRenderer.invoke("db-projects-add", project);
    console.log("RENDERER RESPONSE:", response);
    if (response) {
      dispatch("getProjects");
    } else {
      console.error("ERROR WHILE ADDING PROJECT. RESPONSE WAS:", response);
    }
  },

  async updateProject({ dispatch }, project) {
    const response = await ipcRenderer.invoke("db-projects-update", project);

    // THIS WORKS
    if (response instanceof Error) {
      // If you're an error, display the error toast
      // And the error message
      console.log("YOURE AN ERROR!", response);
    }

    if (response) {
      dispatch("getProjects");
    }
  },

  async getSelectedProject({ commit }, projectId) {
    if (projectId === undefined) {
      commit("setSelectedProject", {});
      return;
    }

    const response = await ipcRenderer.invoke(
      "db-projects-get-selected",
      projectId
    );

    if (response) {
      commit("setSelectedProject", response);
    } else {
      console.error(
        "ERROR WHILE GETTING SELECTED PROJECT. RESPONSE WAS:",
        response
      );
    }
  },

  async deleteProject({ dispatch, commit }, projectId) {
    const response = await ipcRenderer.invoke("db-projects-delete", projectId);

    if (response) {
      dispatch("getProjects");
      commit("setSelectedProject", {});
      return true;
    } else {
      console.error("ERROR WHILE DELETING PROJECT. RESPONSE WAS: ", response);
      return false;
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
