import { defineComponent, ref, watch } from "vue";
import "./subMenu.scss";
import { useAppStore, storeToRefs } from "@/store/index";
import { useRouter } from "@/router";

export default defineComponent({
  props: {
    index: { required: false },
  },
  setup(props, { slots }) {
    const store = useAppStore();
    const { isCollapsed } = storeToRefs(store);
    const router = useRouter()
   
    const showTitle = ref(false);
    watch(isCollapsed, (item) => {
      setTimeout(() => {
        item ? (showTitle.value = true) : (showTitle.value = false);
      }, 200);
    });
    function renderMenu() {
      return (
        <li
          class="px-3 leading-extra-loose h-14 cursor-pointer hover:bg-blue-200 transition-all duration-400"
          onClick={_=> router.push((props.index as string))}
        >
          <div class="title ">
            <el-tooltip placement="right" disabled={!isCollapsed.value}>
              <div slot="content"> {slots.default && slots.default()}</div>
              <div>
                {
                  slots.icon ? slots.icon() : <i class="el-icon-question"></i>
                }
                <span
                  style={{
                    display: isCollapsed.value ? "none" : "inline-block",
                    opacity: showTitle.value ? "0" : "1",
                  }}
                >
                  {!isCollapsed.value ? slots.default && slots.default() : ""}
                </span>
              </div>
            </el-tooltip>
          </div>
        </li>
      );
    }
    return () => renderMenu();
  },
});