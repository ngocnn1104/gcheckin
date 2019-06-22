<template>
  <div class="login-container">
    <el-form
      ref="signupForm"
      :model="signupForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          Sign up form
        </h3>
      </div>

      <el-form-item prop="name">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="name"
          v-model="signupForm.name"
          placeholder="Name"
          name="name"
          type="text"
          tabindex="1"
          auto-complete="on"
          @keyup.enter.native="handleSignup"
        />
      </el-form-item>

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email" />
        </span>
        <el-input
          ref="email"
          v-model="signupForm.email"
          placeholder="Email"
          name="email"
          type="text"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleSignup"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="`password-${passwordType}`"
            ref="password"
            v-model="signupForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="3"
            auto-complete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleSignup"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="confirmPassword">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="`confirm-password-${passwordType}`"
            ref="confirmPassword"
            v-model="signupForm.confirmPassword"
            :type="passwordType"
            placeholder="Confirm password"
            name="confirm password"
            tabindex="4"
            auto-complete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleSignup"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:10px;"
        @click.native.prevent="handleSignup"
      >
        Sign up
      </el-button>

      <el-row class="connect-with" align="middle" type="flex">
        <el-col :span="8" class="border-line"></el-col>
        <el-col :span="8">OR CONNECT WITH</el-col>
        <el-col :span="8" class="border-line"></el-col>
      </el-row>

      <el-button type="danger" class="thirdparty-button">
        <svg-icon
          icon-class="google"
          style="margin-right: 10px; font-size: 20px;"
        />
        Google
      </el-button>
    </el-form>
  </div>
</template>

<script>
import auth from "@/graphql/auth.js";

export default {
  name: "Signup",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    const validateConfirmPassword = (rule, value, callback) => {
      if (value != this.signupForm.password) {
        callback(new Error("Passwords do not match"));
      } else {
        callback();
      }
    };
    return {
      signupForm: {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      loginRules: {
        name: [{ required: true, trigger: "blur" }],
        email: [{ required: true, trigger: "blur", type: "email" }],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        confirmPassword: [
          {
            required: true,
            trigger: "change",
            validator: validateConfirmPassword
          }
        ]
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false
    };
  },
  mounted() {
    if (this.signupForm.email === "") {
      this.$refs.email.focus();
    } else if (this.signupForm.password === "") {
      this.$refs.password.focus();
    }
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && (key >= "a" && key <= "z")) ||
          (!shiftKey && (key >= "A" && key <= "Z"))
        ) {
          this.capsTooltip = true;
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === "CapsLock" && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleSignup() {
      this.$refs.signupForm.validate(async valid => {
        if (valid) {
          this.loading = true;
          try {
            const res = await this.$apollo.mutate(
              auth.SIGN_UP({
                name: this.signupForm.name,
                email: this.signupForm.email,
                password: this.signupForm.password
              })
            );
            this.$store.commit("updateAuth", res.data.signup);
            window.localStorage.setItem(
              "auth",
              JSON.stringify(res.data.signup)
            );
            this.$message({
              message: `Welcome, ${res.data.signup.user.name}!`,
              type: "success"
            });
            this.$router.push("/dashboard");
          } catch (err) {
            this.$message({
              message: err.message,
              type: "error"
            });
          }
          this.loading = false;
        } else {
          console.log("form invalid");
          return;
        }
      });
    }
  }
};
</script>

<style lang="scss">
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .connect-with {
    color: white;
    font-size: 13px;
    margin: 20px 0;

    .border-line {
      border-top: thin solid white;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 50px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    margin-bottom: 20px;
    // width: 100%;

    .svg-icon {
      color: white;
    }
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
