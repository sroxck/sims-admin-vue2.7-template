import { defineComponent, ref, watch } from "vue";
import { useAppStore, useSettingsStore, storeToRefs } from "@/store";
import { useRouter } from "@/router";
import './index.scss'
export default defineComponent({
  setup() {
    const appStore = useAppStore();
    const settingStore = useSettingsStore();

    const { title, switchTitle } = storeToRefs(settingStore);
    const { isCollapsed } = storeToRefs(appStore);

    const showTitle = ref(false);
    const router = useRouter()
    const toRoot = ()=>{
      router.push('/')
    }
    watch(isCollapsed, (item) => {
      setTimeout(() => {
        item ? (showTitle.value = true) : (showTitle.value = false);
      }, 200);
    });
    const logo = () => (
      <div class="logo" style={{ opacity: showTitle.value ? "1" : "0" }} onClick={toRoot}>
        {switchTitle.value || title.value}
      </div>
    );
    const logoWide = () => (
      <div class="logo" style={{ opacity: showTitle.value ? "0" : "1" }} onClick={toRoot}>
        {title.value || switchTitle.value}
      </div>
    );
    return () => (isCollapsed.value ? logo() : logoWide());
  },
});
