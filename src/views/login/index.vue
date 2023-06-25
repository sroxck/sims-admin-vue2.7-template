<template>
  <el-row class="login-container" :style="note" type="flex">
    <el-col :xs="24" :sm="24" :md="8">
      <el-row :span="24" class="grid-content bg-left">
        <div class="loginFrom">
          <div class="login-s">
            <img :src="logo" alt srcset width="150">
          </div>
          <div class="dl">
            <!-- <h2>中医可信联合循证分析平台</h2> -->
            <h2>
              中医科学院新闻后台管理系统
            </h2>
          </div>
          <!-- <div style="text-align: center;margin-bottom:25px;">
            <img :src="loginLogo" width="220px">
          </div>-->
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" autocomplete="on" label-position="top"
            hide-required-asterisk @submit.native.prevent="handleLogin">
            <el-form-item prop="username" label="用户名">
              <span class="svg-container">
                <!-- <svg-icon icon-class="user" /> -->
                <span class="icon iconfont iconusername" />
              </span>
              <el-input ref="username" v-model="loginForm.username" placeholder="用户名" name="username" type="text"
                tabindex="1" autocomplete="on" clearable />
            </el-form-item>

            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
              <el-form-item prop="password" label="密码">
                <span class="svg-container">
                  <!-- <svg-icon icon-class="password" /> -->
                  <span class="icon iconfont iconpassword" />
                </span>
                <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
                  placeholder="密码" name="password" tabindex="2" autocomplete="on" @keyup.native="checkCapslock"
                  @blur="capsTooltip = false" @keyup.enter.native="handleLogin" />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>
              <!-- <p class="alert" v-if="alertHtml == '' ? false : true" v-html="alertHtml"></p>s -->
            </el-tooltip>
            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual
              style="width:100%;margin-bottom: 10px !important;" class="fl">
              <el-form-item prop="captcha" class="captchaBox" label="验证码">
                <span class="svg-container">
                  <!-- <svg-icon icon-class="captcha" /> -->
                  <span class="icon iconfont iconcode" />
                </span>
                <el-input ref="captcha" v-model="loginForm.captcha" placeholder="验证码" name="captcha" class="captcha"
                  tabindex="2" @blur="capsTooltip = false" />
                <div class="captchaImg">
                  <img title="刷新验证码" :src="captchaImg" @click="captchaFun()">
                  <span class="refresh" @click="captchaFun">
                    <!-- <svg-icon icon-class="refresh" /> -->
                    <span class="icon iconfont iconreflash" />
                  </span>
                </div>
              </el-form-item>
            </el-tooltip>

            <!-- <el-link
              class="captchaSx"
              style="color:#ccc"
              :underline="false"
              @click="captchaFun()"
            >刷新</el-link>-->
            <p v-if="alertHtml == '' ? false : true" class="alert" v-html="alertHtml" />
            <div class="el-btn-div">
              <el-button class="el-btn" :loading="loading" native-type="submit" style="color:#fff;">登录</el-button>
            </div>

            <!-- <div style="text-align: center;margin-top:260px;">
              <el-link
                class="el-lk"
                :underline="false"
                @click.native.prevent="forgetPassword"
              >忘记密码?</el-link>
            </div>-->
            <!-- :class="loginDemo ? 'password' : 'password1'" -->
          </el-form>
        </div>
      </el-row>
    </el-col>

    <el-col :xs="0" :sm="16" :md="16">
      <el-row :span="24" class="grid-content bg-right">
        <img :src="loginRight" width="90%" height="100%">
        <!-- <p>Coyrihgt©{{editionDate}}{{editionDate === effectiveDate ?  '' : '-'+ effectiveDate}}博雅正链（北京）科技有限公司</p> -->
      </el-row>
    </el-col>
    <p :xs="0" :sm="0" :md="16" class="coyrihgt">copyrihgt©{{ editionDate }}{{ editionDate === effectiveDate ? '' : '-' +
      effectiveDate }}博雅正链（北京）科技有限公司</p>
  </el-row>
</template>

<script>
import { useLoginStore } from "@/store/modules/login";

import {
  getList,
  postFun,
  getFun
} from '@/api/common' /* 表格列表、post请求、get请求 */
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { alertMsg } from '@/utils/alert' /* 消息提示*/
import { captcha, getAuthMenu } from '@/api/user'
// import { getUserInfo } from '@/utils/auth' /** 获取用户信息 */
import svgIcon from '@/components/SvgIcon/index.vue'
export default {

  components: {
    svgIcon: svgIcon
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value == undefined || value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      editionDate: '2021',
      effectiveDate: '',
      rules: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为 11 个字符', trigger: 'blur' }
        ],
        validCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      isloading: false,
      validcodeTip: '获取验证码',
      form: {
        phone: '',
        validCode: ''
      },
      loginForm: {
        username: '',
        password: '',
        captchaToken: '',
        captcha: '',
      },
      /** 验证码图片 */
      captchaImg: '',
      loginRules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }
        ],
        captcha: [
          {
            required: true,
            trigger: 'blur',
            validator: validateCode
          }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      disabledCodeBtn: false,
      ukeyLogin: '1',
      note: {},
      logo: import('@/assets/hospital.png'),
      loginLogo: import('@/assets/hospital.png'),
      loginRight: import('@/assets/login-bg.png'),
      photo: '',
      code: '',
      alertHtml: ''
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        console.log(query)
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    /** 获取验证码 */
    var data = new Date()
    this.effectiveDate = data.getFullYear().toString()
    console.log(this.effectiveDate, '今年年份')
    this.captchaFun()
    this.loginForm.username = this.$route.query.name
    this.loginForm.password = this.$route.query.password
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    gotoMenu() {
      // 通过push进行跳转
      this.$router.push('/loginDemo')
    },
    // 获取验证码
    async getValidCode() {
      this.$refs['form'].validateField('phone', async valid => {
        if (valid.length <= 0) {
          this.isloading = true
          try {
            const res = await postFun(
              '/elcs-system/api/phoneBinding/verificationCode',
              { phone: this.form.phone, sms_type: 'login' }
            )
            if (res && res.status == 200) {
              this.$notify.success('短信发送成功')
            }
            this.isloading = false
            this.countDown(60)
          } catch (error) {
            console.log(error)
          }
        } else {
          return false
        }
      })
    },
    countDown(time) {
      if (time === 0) {
        this.disabledCodeBtn = false
        this.validcodeTip = '获取验证码'
        return
      } else {
        this.disabledCodeBtn = true
        this.validcodeTip = '重新发送(' + time + ')'
        time--
      }
      this.timeName = setTimeout(() => {
        this.countDown(time)
      }, 1000)
    },
    msgLogin() {
      // this.$refs['form'].validateField('validCode', async valid => {
      //   if (valid.length <= 0) {
      //     if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      //       // 判断当前浏览器为ie
      //       try {
      //         var bSelectCertResult = this.CryptoAgent.SelectCertificate(
      //           this.SubjectDNFilter,
      //           this.IssuerDNFilter,
      //           this.SerialNumFilter,
      //           this.CSPNameFilter
      //         )
      //         // Opera浏览器，NPAPI函数执行结果为false时，不能触发异常，需要自己判断返回值。
      //         if (bSelectCertResult == true) {
      //           // 获取证书DN值
      //           this.loginForm.usbkey = this.CryptoAgent.GetSignCertInfo(
      //             'SubjectDN'
      //           )
      //         }
      //       } catch (e) {}
      //     } else {
      //       // 当前浏览器非ie
      //       this.loginForm.usbkey = ''
      //     }
      //     // 短信登陆接口
      //     this.$store
      //       .dispatch('user/login11', {
      //         phone: this.form.phone,
      //         captcha: this.form.validCode,
      //         usbkey: this.loginForm.usbkey
      //       })
      //       .then(res => {
      //         this.$router.push({
      //           path: '/shouYe',
      //           query: this.otherQuery
      //         })
      //         this.loading = false
      //       })
      //   } else {
      //     return false
      //   }
      // })
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    /** 获取验证码 */
    captchaFun() {
      captcha()
        .then(res => {
          if (res.status == 200) {
            this.captchaImg = 'data:image/png;base64,' + res.data.captcha
            this.loginForm.captchaToken = res.data.captchaToken
          }
        })
        .catch(() => { })
    },
    /** 忘记密码 */
    // forgetPassword() {
    //   this.$router.push({
    //     path: '/forget'
    //   })
    // },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      const loginStore = useLoginStore()
      loginStore.login(this.loginForm).then((res) => {
        console.log(res,'resresres')
        if (res.status ==200) {
          this.$router.push('/home')
        }
      })

      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true
      //     this.$store
      //       .dispatch('user/login', this.loginForm)
      //       .then(res => {
      //         this.$router.push({
      //           path: '/',
      //           query: this.otherQuery
      //         })
      //         this.loading = false
      //       })
      //       .catch((error, vm, info) => {
      //         this.alertHtml =
      //           error.message != null &&
      //             error.message != '' &&
      //             error.message != undefined
      //             ? error.message.split('原因:')[1]
      //             : ''

      //         setTimeout(() => {
      //           this.alertHtml = false
      //         }, 5000)
      //         this.loading = false
      //         /** 获取验证码 */
      //         this.captchaFun()
      //       })
      //   } else {
      //     /** 获取验证码 */
      //     this.captchaFun()
      //     return false
      //   }
      // })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    password() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss">
.login-s {
  margin: -80px 0 80px;
  height: 50px;
  text-align: center;
}

.dl {
  margin-bottom: 60px;
  text-align: center;
}

.login-container {
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;

  .el-col {
    height: 100%;
    position: absolute;

    //background: $bg;
    .bg-left,
    .bg-right {
      height: 100%;
    }

    .bg-right {
      position: relative;
      background: #f4f8ff;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      img {
        justify-content: flex-start;
        margin: 0 auto;
      }
    }

    .bg-left {
      background: #fff;
      left: 0;

      .loginFrom {
        width: 342px;
        position: absolute;
        right: 50%;
        margin-right: -171px;
        top: 50%;
        margin-top: -300px;

        input {
          width: 100%;
          height: 48px;
          background: #f4f8fd;
          border-radius: 24px;
          padding: 0px 5px 0px 50px;
          border: rgb(175, 210, 255) 1px solid;

          &:focus {
            // outline:#2784FF solid 1px ;
            border: none;
            box-shadow: 0 0 0 1px rgb(30, 128, 255);
          }
        }
      }

      .svg-container {
        color: #8794ae;
        vertical-align: middle;
        display: inline-block;
        position: absolute;
        top: 9px;
        left: 15px;
        z-index: 10;
        /* width: 40px; */
        /* height: 40px; */
        text-align: center;
        //.icon {
        //vertical-align: -0.58em;
        //}
      }

      .show-pwd {
        position: absolute;
        right: 10px;
        font-size: 26px;
        color: #8794ae;
        cursor: pointer;
        user-select: none;
        margin-top: 4px;

        .svg-icon {
          width: 16px;
          // height: 0.8em;
          // margin-bottom: 3px;
        }
      }

      .captchaBox .el-form-item__content {
        position: relative;

        .captchaImg {
          position: absolute;
          right: 33px;
          top: 7px;

          img {
            width: 120px;
          }

          .refresh {
            position: absolute;
            color: #8794ae;
            cursor: pointer;
            top: 2px;
            right: -23px;

            .svg-icon {
              width: 1.3em;
              height: 1.3em;
            }
          }
        }
      }

      .el-btn-div {
        float: left;
        // top: 100px;
        width: 100%;
        height: 50px !important;
        border: 1px solid #2784ff;
        border-radius: 25px;
        margin-top: 48px;
        padding: 4px;
        // z-index: 1;
      }

      .el-btn {
        width: 100%;
        height: 40px;
        background: linear-gradient(270deg, #7bb4ff 0%, #2784ff 100%);
        border-radius: 24px !important;
        // z-index: 2;
      }

      .el-lk {
        display: block;
        margin: 0 auto;
      }

      .el-form-item--small .el-form-item__label {
        color: #1d212a !important;
      }
    }
  }

  .coyrihgt {
    position: absolute;
    bottom: 1%;
    font-size: 14px;
    color: #9c9c9c;
    left: 50%;
    transform: translate(-50%, -50%);
    /* 50%为自身尺寸的一半 */
  }

  .el-col:nth-child(1) {
    //display: inline-table;
    left: 0;
  }

  .el-col:nth-child(2) {
    //display: block;
    right: 0;
  }

  .alert {
    clear: both;
    font-size: 12px;
    margin-bottom: 0px;
    color: red;
  }
}
</style>

