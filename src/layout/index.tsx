import { computed, defineComponent, watch } from "vue";
import sidbar from "./component/sidbar";
import navbar from "./component/navbar";
import "./index.scss";
import { useAppStore, storeToRefs } from "@/store";

export default defineComponent({
  components: {
    sidbar,
    navbar,
  },
  setup() {
    const store = useAppStore();

    const { catchList } = storeToRefs(store);
    console.log(catchList.value,'catchList.value');
    
    return () => (
      <div class="content flex h-screen">
        <sidbar></sidbar>
        <navbar>
          <el-scrollbar>
            <div class="card">
              {catchList.value.map((item) => {
                return (
                  <el-tag size="small" type="primary" closable effect="plain">
                    <router-link to={item.fullPath}>{item.title}</router-link>
                  </el-tag>
                );
              })}
            </div>
          </el-scrollbar>
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
