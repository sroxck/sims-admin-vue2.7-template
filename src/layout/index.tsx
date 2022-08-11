import { computed, defineComponent, watch } from "vue";
import sidbar from "./component/sidbar";
import navbar from "./component/navbar";
import "./index.scss";
import { useAppStore, storeToRefs } from "@/store";
import { useRoute,useRouter } from "@/router";
import { indexOf, remove } from "sims-tools";

export default defineComponent({
  components: {
    sidbar,
    navbar,
  },
  setup() {
    const store = useAppStore();

    const { catchList } = storeToRefs(store);
    console.log(catchList.value,'catchList.value');
    const route= useRoute()
    const router= useRouter()
    if(catchList.value.length == 0){
    }else if(catchList.value.length ==1){
      
    }
    function tagClose(obj:Record<string,any>){
      if(route.value.meta && obj.title == '首页面板'){
        return 
      }
      if(catchList.value.length==1) return
      
      remove(catchList.value,obj)
      if(route.value.path !== catchList.value[catchList.value.length-1].fullPath){
        router.value.push(catchList.value[catchList.value.length-1].fullPath)

      }
      
    }
    return () => (
      <div class="content flex h-screen">
        <sidbar></sidbar>
        <navbar>
          <el-scrollbar>
            <div class="card">
              {catchList.value.map((item) => {
                return (
                  <el-tag size="small" type="primary" closable effect="plain" onClose={()=>tagClose(item)}>
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
