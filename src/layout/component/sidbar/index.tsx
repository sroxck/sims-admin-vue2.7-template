import { computed, defineComponent, getCurrentInstance, watch } from "vue";
import { useAppStore, storeToRefs } from "@/store";
import logo from "./logo";
import sMenu from "../menu";
import sMenuItem from "../menu/item";
import sSubMenu from "../menu/subMenu";
import { useRouter, useRoute } from "@/router";
import { useWindowSize } from "@vueuse/core";
import "./index.scss";
export default defineComponent({
  name: "sidbar",
  components: {
    logo,
    sMenu,
    sMenuItem,
    sSubMenu,
  },
  setup() {
    const appStore = useAppStore();
    const { isCollapsed, isActive } = storeToRefs(appStore);
    const { width, height } = useWindowSize();
    watch(width, (e) => {
      // console.log(e);
    });

    const router = useRouter();
    const route = useRoute();
    console.log(router,route,);
    
    isActive.value = location.hash.replace("#", "");
    const scopedSlots = (item: any) => {
      return {
        title: () => item.meta?.title,
        default: () =>
          item.children?.map((item: any) => {
            return item.children?.length > 0 ? (
              <sSubMenu
                scopedSlots={scopedSlots(item)}
                index={item.path}
                child={item.children}
              ></sSubMenu>
            ) : (
              <sMenuItem
                index={item.path}
                nativeOnclick={() => {
                  setTimeout(() => {
                    isActive.value = location.hash.replace("#", "");
                  }, 300);
                }}
              >
                <template slot="icon">
                <i class={[item.meta?.icon?item.meta.icon:'el-icon-']}></i>
                </template>
                {item.meta.title}
              </sMenuItem>
            );
          }),
        icon: () => (
          <i class={[item.meta?.icon?item.meta.icon:'el-icon-']}></i>
        ),
      };
    };

    return () => (
      <div
        style="border-right: 1px solid #eee;height: 100%;"
        class={[
          "sidebarClass",
          isCollapsed.value ? "w-16" : "w-64",
          "transition-all",
          "duration-400",
        ]}
      >
        <logo class="text-center  align-middle  break-words" />
        <sMenu route={route} activeColor="#409eff">
          {router.value.options.routes?.map((item: any) => {
            return (item.children && item.children.length > 1) ||
              item.meta.alwaysShow ? (
              <sSubMenu
                scopedSlots={scopedSlots(item)}
                index={item.path}
                child={item.children}
              ></sSubMenu>
            ) : (
              <sMenuItem
                index={item.path}
                nativeOnclick={() => {
                  isActive.value = location.hash.replace("#", "");
                }}
              >
                <template slot="icon">
                <i class={[item.meta?.icon ]}></i>
                  {/* <i class={[item.meta.icon]}></i> */}
                </template>
                {item.meta.title}
              </sMenuItem>
            );
          })}
        </sMenu>
      </div>
    );
  },
});
