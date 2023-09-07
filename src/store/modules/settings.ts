import { Module } from "vuex";
// import type { SettingModule } from "./module.d.ts";
import type { RootState, SettingsModule } from "../store.d.ts";

const settings: Module<SettingsModule, RootState> = {
  namespaced: true,
  state: {
    isCollapse: false,
  },
  mutations: {
    SWITCH_MENU: (state: { isCollapse: boolean }) => {
      state.isCollapse = !state.isCollapse;
    },
  },
  actions: {},
};

export default settings;
