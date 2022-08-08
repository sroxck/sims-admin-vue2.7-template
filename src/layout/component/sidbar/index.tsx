import { defineComponent } from "vue";
import { useAppStore, storeToRefs } from "@/store";
import logo from "./logo";
import sMenu from "../menu";
import sMenuItem from "../menu/item";
import sSubMenu from "../menu/subMenu";
import { useRouter } from "@/router";
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
    const { isCollapsed } = storeToRefs(appStore);

    const router = useRouter();
    const scopedSlots = (item: any) => {
      return {
        title: () => item.meta.title,
        default: () =>
          item.children.map((item: any) => {
            return (
              <sMenuItem index={item.path}>
                <template slot="icon">
                  <i class={[item.meta.icon]}></i>
                </template>
                {item.meta.title}
              </sMenuItem>
            );
          }),
        icon: () => <i class={[item.meta.icon]}></i>,
      };
    };

    return () => (
      <div
        class={[
          isCollapsed.value ? "w-16" : "w-60",
          "bg-gray-500",
          "transition-all",
          "duration-400",
        ]}
      >
        <logo class="text-center  align-middle  break-words" />
        <sMenu>
          {router.options.routes?.map((item: any) => {
            return item.children ? (
              <sSubMenu scopedSlots={scopedSlots(item)}></sSubMenu>
            ) : (
              <sMenuItem index={item.path}>
                <template slot="icon">
                  <i class={[item.meta.icon]}></i>
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
