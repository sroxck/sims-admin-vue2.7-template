import { computed, defineComponent, watch } from "vue";
import sidbar from "./component/sidbar";
import navbar from "./component/navbar";
import "./index.scss";
import { useAppStore, storeToRefs } from "@/store";
import { useRoute, useRouter } from "@/router";
import { indexOf, remove } from "sims-tools";

export default defineComponent({
  components: {
    sidbar,
    navbar,
  },
  setup() {
    const store = useAppStore();

    const { catchList, isActive } = storeToRefs(store);
    const route = useRoute();
    const router = useRouter();
    if (catchList.value.length == 0) {
      // todo 如果没有选项卡 将 路由中 永久固定的页面追加进行,并且将当前页面追加进行
    } else if (catchList.value.length == 1) {
      // 如果有一个,判断是不是当前页面,不是的话要追加当前
    }
    function tagClose(obj: Record<string, any>) {
      if (route.value.meta && obj.title == "首页面板") {
        return;
      }
      if (catchList.value.length == 1) return;

      remove(catchList.value, obj);
      if (
        route.value.path !==
        catchList.value[catchList.value.length - 1].fullPath
      ) {
        router.value.push(catchList.value[catchList.value.length - 1].fullPath);
        isActive.value = catchList.value[catchList.value.length - 1].fullPath;
      }
    }

    return () => (
      <div class="content flex h-screen">
        <sidbar></sidbar>
        <navbar>
          <div class="tags-view-container">
            <el-scrollbar class="scrollBar">
              {catchList.value.map((item, index) => {
                return (
                  <el-tag
                    type={
                      item.fullPath == route.value.path ? "primary" : "info"
                    }
                    closable={item.fullPath != "/home333"}
                    style="height:30px;line-height: 30px;"
                    onClose={() => tagClose(item)}
                    disable-transitions
                  >
                    <router-link to={item.fullPath}>{item.title}</router-link>
                  </el-tag>
                );
              })}
            </el-scrollbar>
          </div>
          <main class="pt-2 overflow-auto">
            <transition name="sale-fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </main>
        </navbar>
      </div>
    );
  },
});
