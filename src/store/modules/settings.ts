import { defineStore } from "pinia";
import defaultSettings from "@/settings";
const { title, switchTitle } = defaultSettings;
export const useSettingsStore = defineStore("settings", {
  state: () => {
    return {
      title,
      switchTitle
    };
  },
});
