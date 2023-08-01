<template>
  <div style="margin:0px;padding:0px;">
    <div class="background">
      <div style="width:50%;height:100%;background:rgb(249 170 51 / 35%);">
        <!-- <img src="../assets/a4140a1012.jpg"> -->
      </div>
      <div
        style="width:50%;height:100%;background:#344955;filter:opacity(0.95);display: flex;flex-direction: column;align-items: center;justify-content: center;"
      >
        <div class="logo"></div>
        <v-card
          v-show="!loginOrChangePwd"
          class="mx-auto"
          max-width="400"
          width="400px"
          style="border-radius:15px;box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12) !important;"
        >
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline" style="font-size:1.2rem !important;">股票评分</v-list-item-title>
              <v-list-item-subtitle>登录以继续</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-form style="padding:16px;" ref="loginForm" v-model="loginValid" lazy-validation>
            <v-text-field
              outlined
              dense
              v-model="name"
              :error-messages="nameErrors"
              :rules="nameRules"
              label="用户名"
              required
              @keyup.enter="login"
            ></v-text-field>
            <v-text-field
              outlined
              dense
              :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPwd ? 'text' : 'password'"
              label="密码"
              v-model="password"
              :rules="passwordRules"
              @click:append="showPwd = !showPwd"
              @keyup.enter="login"
            ></v-text-field>
            <v-switch v-model="keepLogin" :label="`勾选后能保持较长时间免登录`" dense small></v-switch>
          </v-form>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn text @click="goToChangeForm">更改密码</v-btn> -->
            <v-btn
              rounded
              color="secondary"
              dense
              @click="login"
              style="margin-right: 8px;"
              :disabled="!loginValid"
            >登录</v-btn>
          </v-card-actions>
        </v-card>

        <v-card
          v-show="loginOrChangePwd"
          class="mx-auto"
          max-width="400"
          style="border-radius:15px;box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12) !important;width:400px;"
        >
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline" style="font-size:1.3rem !important;">修改密码</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-form
            style="padding:16px;"
            ref="changePwdForm"
            v-model="changePwdValid"
            lazy-validation
          >
            <v-text-field
              outlined
              dense
              :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPwd ? 'text' : 'password'"
              label="原密码"
              v-model="orginalPwd"
              :rules="orginalPwdRules"
              @click:append="showPwd = !showPwd"
            ></v-text-field>

            <v-text-field
              outlined
              dense
              :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPwd ? 'text' : 'password'"
              label="新密码"
              v-model="newPwd"
              :rules="newPwdPwdRules"
              @click:append="showPwd = !showPwd"
            ></v-text-field>

            <v-text-field
              outlined
              dense
              :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPwd ? 'text' : 'password'"
              label="确认新密码"
              v-model="newPwdConfirm"
              :rules="confirmRules"
              @click:append="showPwd = !showPwd"
            ></v-text-field>
          </v-form>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="goToChangeForm">取消</v-btn>
            <v-btn
              rounded
              color="secondary"
              dense
              style="margin-right: 8px;"
              @click="doneChangePwd"
              :disabled="!changePwdValid"
              :loading="loginLoading"
            >确定</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import loginData from "../data/login/loginData";
import session from "../util/SessionStorage";
import notice from "../util/Notice";

export default {
  name: "Login",
  data: () => ({
    loginOrChangePwd: false,
    name: "",
    nameErrors: "",
    showPwd: false,
    password: "",
    keepLogin: false,
    orginalPwd: "",
    newPwd: "",
    newPwdConfirm: "",
    loginValid: false,
    nameRules: [(v) => !!v || "用户名必须填写哦！"],
    passwordRules: [(v) => !!v || "密码必须填写哦！"],
    changePwdValid: false,
    orginalPwdRules: [(v) => !!v || "需要确认原密码哦！"],
    newPwdPwdRules: [(v) => !!v || "新密码必须填写哦！"],
    confirmRules: [(v) => !!v || "必须二次确认密码哦！"],
    loginLoading: false,
  }),
  created() {},
  methods: {
    // 点击在login form与Change Password Form 之间切换
    goToChangeForm() {
      this.loginOrChangePwd = !this.loginOrChangePwd;
    },
    // 执行修改密码
    doneChangePwd() {
      if (!this.$refs.changePwdForm.validate()) {
        return;
      }
      // loginData.changePwd({}).then((res) => {
      // })
      this.loginOrChangePwd = false;
    },
    // 执行登录请求
    login() {
      if (!this.$refs.loginForm.validate()) {
        return;
      }
      let _self = this;
      this.loginLoading = true;
      loginData
        .doLogin({
          username: this.name,
          password: this.password,
        })
        .then(function (res) {
          _self.loginLoading = false;
          if (res.code === "0" && res.msg === "success") {
            session.setSessionStorage("token", res.token);
            session.setSessionStorage("userid", res.res.rowid);
            session.setSessionStorage("userName", res.res.name);
            if (res.res) {
              session.setSessionStorage("userRole", res.res.role);
              _self.$router.push({ name: "stockRating" });
            } else {
              notice.setNotice(
                "error",
                "没有获取到你的权限，请联系一下管理员吧。"
              );
            }
          } else {
            window.alert("用户名或密码错误!");
          }
        });
    },
  },
};
</script>
<style scoped>
.background {
  /* background-image: url("../assets/texture.png");
  background: linear-gradient(to bottom, #232f34 50%, #edf0f2 50%); */
  background: url("../assets/auto-draft-39.jpg") no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  margin: 0px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
}
.v-label {
  font-size: 14px !important;
}
.logo {
  width: 100px;
  height: 100px;
  position: absolute;
  background: url("../assets/logo.png");
  background-color: white;
  left: calc(50% - 50px);
  top: 120px;
  background-size: 450%;
  background-position-x: -196px;
  background-position-y: 0px;
  border-radius: 50%;
}
</style>
