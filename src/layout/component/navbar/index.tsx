import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch,
  watchEffect,
} from "vue";
import "./index.scss";
import collapse from "./collapse";
import breadcrumb from '@/components/Breadcrumb/index.vue'
import { useRoute } from "@/router";
import { escapeDate, findMax, indexOf, remove } from "sims-tools";
import item from "../menu/item";
import { RouteRecord } from "vue-router";
export default defineComponent({
  components: {
    collapse,
    breadcrumb
  },
  setup(props, { slots }) {
    const route = useRoute();
    const bread = ref<any>([]);
    let date = ref(escapeDate(new Date(), "yyyy-MM-dd"));
    setInterval(()=>{
      date.value =( escapeDate(new Date(),'yyyy-MM-dd HH:mm:ss')) as string
    },1000)
    const levelList = ref<any>([]);

    watch(route, () => {
      getMbx();
    });
    getMbx();
    function getMbx() {
      let matched = route.value.matched.filter(
        (item) => item.meta && item.meta.title
      );

      levelList.value = matched.filter((item) => item.meta && item.meta.title);
    }
    const logout = () => {
      localStorage.removeItem('pinia-app')
      localStorage.removeItem('pinia-login')
      location.reload()
    }
    return () => (
      <div class="navbar">
        <nav
          class="  flex "
          style="align-items: center;height:60px"
        >
          {/* <collapse /> */}
          <div>
              <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

            {/* <el-breadcrumb separator-class="el-icon-arrow-right">
              {levelList.value.map((item: any) => (
                <el-breadcrumb-item>{item.meta.title}</el-breadcrumb-item>
              ))}
            </el-breadcrumb> */}
          </div>
          <div
            class="float-right justify-end flex"
            style="flex:1;align-items: center;height:60px;"
          >
            <div class="flex flex-col items-start">
              <span class="rightFont text-gray-600  font-medium">
                你好，管理员小陈
              </span>
              <span class="rightFont text-gray-500 ">{date.value}</span>
            </div>
            <span class="mx-3">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="el-icon-setting"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  {/* <el-dropdown-item icon="el-icon-plus">
                    个人信息
                  </el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus-outline">
                    全屏
                  </el-dropdown-item> */}
                  <el-dropdown-item icon="el-icon-circle-plus" >
                    <span onClick={logout}>
                      退出登录

                    </span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </div>
        </nav>
        {slots.default && slots.default()}
      </div>
    );
  },
});
