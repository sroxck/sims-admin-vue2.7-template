import { defineComponent, inject, ref, watch } from "vue";
import style from "./subMenu.module.scss";
import { useAppStore, storeToRefs } from "@/store/index";
import { useRoute, useRouter } from "@/router";
import { indexOf } from "sims-tools";
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
    watch(route, (item) => {
      console.log(route.value.matched[0].path, props.index, isActive.value, '---')
      console.log(item, 'item');
      isActive.value = item.fullPath
      const obj = {
        fullPath: item.fullPath,
        title: item.meta?.title
      }
      if (indexOf(catchList.value, obj) == -1) {
        catchList.value.push(obj);
      }
    })

    const itemClick = (_: any) => {
      if (props.index == location.hash.replace("#", "")) return;
      router.value.push(props.index as string)
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
    };

    function renderMenu() {
      return (
        <div>
          <el-link type='info' underline={false} onClick={itemClick} style="display: inline-block;width: 100%;overflow: hidden;">
            <li
              onClick={itemClick}
              class={[style["menu-item"], "cursor-pointer hover:bg-primary"]}
              style={{
                lineHeight: '60px',
                borderRadius: isCollapsed.value ? '5px' : '',
                overflow: isCollapsed.value ? 'hidden' : '', height: '60px',
                backgroundColor: route.value.matched[0].path == props.index ? '#f5f6fb!important' : ""
              }}
            >
              <div class="title ">
                <el-tooltip placement="right" disabled={!isCollapsed.value} class="style.tooltip-outside">
                  <div slot="content"> {slots.default && slots.default()} </div>
                  <div>
                    {slots.icon ? <em style="width: 35px; display: inline-block;" class={[isActive.value == props.index ? style['icon-active'] : "", style["menu-icon"]]}>{slots.icon()}</em> : <i class="el-icon-"></i>}
                    <span
                      style={{
                        display: isCollapsed.value ? "none" : "inline-block",
                        opacity: showTitle.value ? "0" : "1",
                        color: isActive.value == props.index ? (activeColor as string) : "",
                      }}
                    >
                      {!isCollapsed.value ? slots.default && slots.default() : ""}
                    </span>
                  </div>
                </el-tooltip>
              </div>
            </li>
          </el-link>
        </div >
        // <li
        //   class=" leading-extra-loose cursor-pointer hover:bg-blue-200 outside "
        //   onClick={itemClick}
        //   style={{ borderRadius: isCollapsed.value ? '5px' : '', overflow: isCollapsed.value ? 'hidden' : '', height: '60px' }}
        // >
        //   <div class="title ">
        //     <el-tooltip placement="right" disabled={!isCollapsed.value} class="tooltip-outside">
        //       <div slot="content"> {slots.default && slots.default()} </div>
        //       <div>
        //         {slots.icon ? slots.icon() : <i class="el-icon-"></i>}
        //         <span
        //           style={{
        //             display: isCollapsed.value ? "none" : "inline-block",
        //             opacity: showTitle.value ? "0" : "1",
        //             color:
        //               isActive.value == props.index ? (activeColor as any) : "",
        //           }}
        //         >
        //           {!isCollapsed.value ? slots.default && slots.default() : ""}
        //         </span>
        //       </div>
        //     </el-tooltip>
        //   </div>
        // </li>
      );
    }
    return () => renderMenu();
  },
});
function route(route: any) {
  throw new Error("Function not implemented.");
}
