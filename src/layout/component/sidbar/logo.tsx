import { defineComponent, ref, watch } from "vue";
import { useAppStore, useSettingsStore, storeToRefs } from "@/store";

export default defineComponent({
  setup() {
    const appStore = useAppStore();
    const settingStore = useSettingsStore();

    const { title, switchTitle } = storeToRefs(settingStore);
    const { isCollapsed } = storeToRefs(appStore);

    const showTitle = ref(false);
    watch(isCollapsed, (item) => {
      setTimeout(() => {
        item ? (showTitle.value = true) : (showTitle.value = false);
      }, 200);
    });
    const logo = () => (
      <div class="h-20 pt-7 " style={{ opacity: showTitle.value ? "1" : "0" }}>
        {switchTitle.value || title.value}
      </div>
    );
    const logoWide = () => (
      <div class="h-20 pt-7" style={{ opacity: showTitle.value ? "0" : "1" }}>
        {title.value || switchTitle.value}
      </div>
    );
    return () => (isCollapsed.value ? logo() : logoWide());
  },
});
