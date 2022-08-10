import { defineComponent, getCurrentInstance, ref, watch } from "vue";
import "./index.scss";
import collapse from "./collapse";
import { useRoute } from "@/router";
import { escapeDate, findMax } from "sims-tools";
export default defineComponent({
  components: {
    collapse,
  },
  setup(props, { slots }) {
    const route = useRoute()
    watch(route,(e)=>{
      console.log(e);
    })
    let date = ref(escapeDate(new Date(),'yyyy-MM-dd HH:mm:ss') )
    setInterval(()=>{
      date.value =( escapeDate(new Date(),'yyyy-MM-dd HH:mm:ss')) as string
    },1000)
    
    return () => (
      <div class="navbar">
        <nav class="navbar-content  flex " style="align-items: center;height:60px" >
          <collapse />
          <div>
            344
          </div>
          <div class="float-right justify-end flex" style="flex:1;align-items: center;">
            <div class="flex flex-col items-start">
              <span class="rightFont text-gray-600  font-medium">你好，管理员小陈</span>
              <span class="rightFont text-gray-500 ">{date.value}</span>
            </div>
            <span class="mx-3">
            <i class="el-icon-setting"></i>
            </span>
          </div>
        </nav>
        {slots.default && slots.default()}
      </div>
    );
  },
});

