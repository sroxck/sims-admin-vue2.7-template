import { defineComponent, ref } from "vue";
import Vue from "vue";
import { useLoginStore } from "@/store/modules/login";
import { Message } from "element-ui";
import { useRouter } from "@/router";
import './index.scss'
export default defineComponent({
  // components:{
  //   formDemo
  // },
  setup() {
    const loginStore = useLoginStore()
    let account = ref("");
    let password = ref("");
    const router = useRouter()
    function login() {
      loginStore.login({ account: account.value, password: password.value }).then((res) => {

        if (res) {
          router.value.push('/home')
        }
      })

    }
    return () => (
      <div style="width: 100%; height: 100vh; background-color: #4fa9e4;   " class="ces">
        <div class="dynamics"></div>
        {/* <div class="wrap">
          <div class="shadowTop">
          </div>
          <div class="shadowBottom"></div>
        </div> */}
        <p id="login">
          <h1>Login</h1>
          <el-form label-position="right" inline label-width="80px">
            <el-row>
              <el-form-item label="账号">
                <el-input
                  placeholder="admin"
                  style="width:220px;"
                  value={account.value}
                  onInput={(e: string) => (account.value = e)}
                ></el-input>
              </el-form-item>

            </el-row>
            <el-row>
              <el-form-item label="密码">
                <el-input
                  style="width:220px;"
                  placeholder="123456"
                  value={password.value}
                  onInput={(e: string) => (password.value = e)}
                ></el-input>
              </el-form-item>
            </el-row>

            <el-row>
              <el-button onClick={login} type="primary">
                登录
              </el-button>
            </el-row>
          </el-form>
        </p>
        {/* <formDemo></formDemo> */}

      </div>
    );
  },
});
