import { defineComponent } from "vue";
import { useAppStore, storeToRefs } from "@/store";
import logo from "./logo";
export default defineComponent({
  name: "sidbar",
  components: {
    logo,
  },
  setup() {
    const appStore = useAppStore()
    const { isCollapsed } = storeToRefs(appStore);
    return () => (
      <div
        class={[
          isCollapsed.value ? "w-20" : "w-60",
          "bg-gray-500",
          "transition-all",
          "duration-400"
        ]}
      >
        <logo class="text-center  align-middle  break-words"/>
        <ul>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
        </ul>
      </div>
    );
  },
});
