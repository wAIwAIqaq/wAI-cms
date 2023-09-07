import { createStore } from "vuex";
import settings from "./modules/settings";
import visitedViews from "./modules/visitedViews"
const store = createStore({
  state() {
    return {};
  },
  mutations: {},
  modules: {
    settings,
    visitedViews
  },
});

export default store;
