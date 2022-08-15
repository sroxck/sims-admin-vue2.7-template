import { defineComponent, inject, ref, watch } from "vue";
import "./subMenu.scss";
import { useAppStore, storeToRefs } from "@/store/index";
import { useRoute, useRouter } from "@/router";
import { indexOf, remove } from "sims-tools";
// import { useStorage } from "@vueuse/core";
export default defineComponent({
  props: {
    index: { required: true },
    active: { required: false },
  },
  setup(props, { slots }) {
    const store = useAppStore();

    const { isCollapsed, isActive, catchList } = storeToRefs(store);
    const router = useRouter();
    const route = useRoute();
    const activeColor = inject("activeColor");
    const showTitle = ref(false);
    watch(isCollapsed, (item) => {
      setTimeout(() => {
        item ? (showTitle.value = true) : (showTitle.value = false);
      }, 200);
    });
    watch(route,(item)=>{
     
      isActive.value = item.fullPath
    })

    const itemClick = (_: any) => {
      if (props.index == location.hash.replace("#", "")) return;
      router.value.push(props.index as string).then((_) => {
        let object: Record<string, any>;
        if (route.value && route.value.meta) {
          object = {
            title: route.value.meta.title,
            fullPath: route.value.fullPath,
          };
          
          if (indexOf(catchList.value, object) == -1) {
            catchList.value.push(object);
          }
        }
      }).catch(err=>{
        
      })
    };

    function renderMenu() {
      return (
        <li
          class="px-3 leading-extra-loose h-14 cursor-pointer hover:bg-blue-200  "
          onClick={itemClick}
        >
          <div class="title ">
            <el-tooltip placement="right" disabled={!isCollapsed.value}>
              <div slot="content"> {slots.default && slots.default()} </div>
              <div>
                {slots.icon ? slots.icon() : <i class="el-icon-"></i>}
                <span
                  style={{
                    display: isCollapsed.value ? "none" : "inline-block",
                    opacity: showTitle.value ? "0" : "1",
                    color:
                      isActive.value == props.index ? (activeColor as any) : "",
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
function route(route: any) {
  throw new Error("Function not implemented.");
}
