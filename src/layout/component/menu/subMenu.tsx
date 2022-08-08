import { defineComponent, ref, watch } from "vue";
import item from "./item";
import "./subMenu.scss";
import "animate.css";
import { useAppStore, storeToRefs } from "@/store/index";

export default defineComponent({
  setup(props, { slots }) {
    const store = useAppStore();
    const { isCollapsed } = storeToRefs(store);
    const toggle = ref(false);
    const showTitle = ref(false);
    watch(isCollapsed, (item) => {
      setTimeout(() => {
        item ? (showTitle.value = true) : (showTitle.value = false);
      }, 200);
    });

    function renderMenu() {
      return (
        <li class="gruop">
          <div
            class="sMenu leading-extra-loose h-14 cursor-pointer hover:bg-blue-300 select-none px-3"
            onClick={() => {
              if (isCollapsed.value) return;
              toggle.value = !toggle.value;
            }}
          >
            <div class="title">
            <el-tooltip placement="right" disabled={!isCollapsed.value}>
              <div slot="content"> {slots.title && slots.title()}</div>
              <div>
                {slots.icon && slots.icon()}
                <span
                  style={{
                    display: isCollapsed.value ? "none" : "inline-block",
                    opacity: showTitle.value ? "0" : "1",
                  }}
                >
                  {!isCollapsed.value ? slots.title && slots.title() : ""}
                </span>
              </div>
            </el-tooltip>
            </div>
          </div>
          <el-collapse-transition>
            {toggle.value ? (
              <ul class={["transition-all", "duration-400"]}>
                {slots.default && slots.default()}
              </ul>
            ) : ""}
          </el-collapse-transition>
        </li>
      );
    }
    return () => renderMenu();
  },
  components: {
    item,
  },
});
