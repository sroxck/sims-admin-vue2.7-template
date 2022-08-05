import { defineComponent } from "vue";
import { useAppStore, storeToRefs } from "@/store";

const logo = () => <div class="h-20 pt-7">typescript + tsx</div>;
const logoWide = () => <div class="h-20 pt-7">typescript</div>;
export default defineComponent({
  setup() {
    const appStore = useAppStore();
    const { isCollapsed } = storeToRefs(appStore);
    return () => (isCollapsed.value ? logoWide() : logo());
  },
});
