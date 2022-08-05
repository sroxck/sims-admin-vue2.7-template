import { defineComponent } from "vue";
import { useAppStore, storeToRefs } from "@/store/index";
export default defineComponent({
  setup(props, ctx) {
    const store = useAppStore();
    const { isCollapsed } = storeToRefs(store);

    const toggle = () => {
      isCollapsed.value = !isCollapsed.value;
      console.log(isCollapsed.value);
    };
    return () => (
      <span class="text-xl">
        <i
          class={isCollapsed.value ? "el-icon-s-unfold" : "el-icon-s-fold"}
          onClick={toggle}
        />
      </span>
    );
  },
});
