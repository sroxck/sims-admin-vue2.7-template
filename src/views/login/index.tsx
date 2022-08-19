import { defineComponent, ref } from "vue";
import Vue from "vue";
import { useLoginStore } from "@/store/modules/login";
import { Message } from "element-ui";
import { useRouter } from "@/router";

export default defineComponent({
  // components:{
  //   formDemo
  // },
  setup() {
    const loginStore = useLoginStore()
    let account = ref("");
    let password = ref("");
    const router = useRouter()
    function login(){
       loginStore.login({account:account.value, password:password.value}).then((res)=>{

        if(res ){
          router.value.push('/')
        }
      })
     
    }
    return () => (
      <div>
        {/* <formDemo></formDemo> */}
        <el-input
          style="width:100px"
          value={account.value}
          onInput={(e: string) => (account.value = e)}
        ></el-input>
        <el-input
          style="width:100px"
          value={password.value}
          onInput={(e: string) => (password.value = e)}
        ></el-input>
        <el-button onClick={login}>
          登录
        </el-button>
      </div>
    );
  },
});
