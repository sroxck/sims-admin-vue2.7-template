import { defineComponent } from "vue";
import { useAppStore, useSettingsStore, storeToRefs } from "@/store";

export default defineComponent({
  setup() {
    const appStore = useAppStore();
    const settingStore = useSettingsStore();

    const { title, switchTitle } = storeToRefs(settingStore);
    const { isCollapsed } = storeToRefs(appStore);

    const logo = () => (
      <div class="h-20 pt-7">
        {switchTitle.value ? switchTitle.value : title.value}
      </div>
    );
    const logoWide = () => (
      <div class="h-20 pt-7">{title.value ? title.value : switchTitle.value}</div>
    );
    return () => (isCollapsed.value ? logo() : logoWide());
  },
});
