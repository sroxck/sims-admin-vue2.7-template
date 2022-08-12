import { defineComponent, ref, watch } from "vue";
import item from "./item";
import "./subMenu.scss";
import "animate.css";
import { useAppStore, storeToRefs } from "@/store/index";
import { useRoute, useRouter } from "@/router";

export default defineComponent({
  props: {
    index: { required: true },
    child: {},
  },
  setup(props, { slots }) {
    const store = useAppStore();
    const { isCollapsed, isActive } = storeToRefs(store);

    const toggle = ref(false);
    const showTitle = ref(false);
    const route = useRoute();
    watch(route, (item) => {
      if (!isCollapsed.value) {
        (props.child as any).map((item2: any) => {
          if (item2.path == item.path) {
            toggle.value = true;
          }

          if (item2.children?.length > 0) {
            item2.children.map((item3: any) => {
              if (item3.path == item.path) {
                toggle.value = true;
              }
            });
          }
        });
      }
    });
    watch(isCollapsed, (item) => {
      setTimeout(() => {
        item
          ? (showTitle.value = true) && (toggle.value = false)
          : (showTitle.value = false);
      }, 200);

      if (isCollapsed.value == false) {
        if ((props as any).child.length > 0) {
          (props as any).child.forEach((item: any) => {
            if (item.path === location.hash.replace("#", "")) {
              setTimeout(() => {
                toggle.value = true;
              }, 300);
            } else {
              item.children?.forEach((zc: any) => {
                if (zc.path === location.hash.replace("#", "")) {
                  setTimeout(() => {
                    toggle.value = true;
                  }, 300);
                }
              });
            }
          });
        }
        if (isActive.value == props.index) {
          setTimeout(() => {
            toggle.value = true;
          }, 300);
        }
      }
    });
    if ((props as any).child.length > 0) {
      (props as any).child.forEach((item: any) => {
        if (item.path === location.hash.replace("#", "")) {
          toggle.value = true;
        }
        if (item.children?.length > 1) {
          item.children.forEach((chil: any) => {
            if (chil.path === location.hash.replace("#", "")) {
              toggle.value = true;
            }
          });
        }
      });
    }
    if (props.index == location.hash.replace("#", "")) {
      toggle.value = true;
    }

    function renderMenu() {
      return (
        <div>
          <li class="gruop">
            <div class="">
              <div
                class="sMenu leading-extra-loose px-3 h-14 cursor-pointer hover:bg-blue-200 select-none "
                style="position:relative;"
                onClick={() => {
                  if (isCollapsed.value) return;
                  toggle.value = !toggle.value;
                }}
              >
                <div class="title">
                  <el-tooltip
                    placement="right"
                    disabled={!isCollapsed.value}
                    class="toplip "
                  >
                    <div slot="content"> {slots.title && slots.title()}</div>
                    <div>
                      {slots.icon && slots.icon()}
                      <span
                        style={{
                          display: isCollapsed.value ? "none" : "inline-block",
                          opacity: showTitle.value ? "0" : "1",
                          flex: 5,
                        }}
                      >
                        {!isCollapsed.value ? slots.title && slots.title() : ""}
                      </span>
                      {!isCollapsed.value ? (
                        toggle.value ? (
                          <i class="el-icon-arrow-up float-right align-middle text-xs jb"></i>
                        ) : (
                          <i class="el-icon-arrow-down float-right align-middle text-xs jb"></i>
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  </el-tooltip>
                </div>
              </div>
              <el-collapse-transition>
                {toggle.value ? (
                  <ul class={["transition-all", "duration-400", "bg-white"]}>
                    {slots.default && slots.default()}
                  </ul>
                ) : (
                  ""
                )}
              </el-collapse-transition>
            </div>
          </li>
        </div>
      );
    }
    return () => renderMenu();
  },
  components: {
    item,
  },
});
