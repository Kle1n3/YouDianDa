<template>
  <div class="reg-box">
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      @click-left="$router.back(1)"
    />
    <h1 class="title">欢迎注册</h1>
    <van-form @submit="onSubmit">
      <van-field
        v-model="userInfo.mobile"
        name="用户名"
        label="用户名"
        left-icon="manager"
        placeholder="用户名"
        :rules="rules.mobile"
      />
      <van-field
        v-model="userInfo.password"
        type="password"
        name="密码"
        label="密码"
        left-icon="warning"
        placeholder="密码"
        :rules="rules.password"
      />
      <van-field
        v-model="repassword"
        type="password"
        name="确认密码"
        label="确认密码"
        left-icon="warning"
        placeholder="确认密码"
        :rules="rules.repassword"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { userRegApi } from "@/api/reg";
export default {
  data() {
    return {
      userInfo: {
        mobile: "",
        password: "",
      },
      repassword: "",
      rules: {
        mobile: [
          { required: true, message: "请输入手机号码" },
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "请输入正确的手机号码",
          },
        ],
        password: [
          { required: true, message: "请填写密码" },
          {
            pattern: /^[a-zA-Z]\w{5,17}$/,
            message:
              "密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线",
          },
        ],
        repassword: [
          { required: true, message: "请确认密码" },
          { validator: this.validator, message: "两次输入的密码不一致" },
        ],
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = await userRegApi(this.userInfo);
        if (data.errno == 1000) {
          this.$toast.fail(data.errmsg);
          return;
        }
      } catch (error) {
        console.log(error);
      }
      this.$toast.success("注册成功");
      this.$router.push({
        path: "/login",
      });
    },
    validator() {
      return this.userInfo.password === this.repassword ? true : false;
    },
  },
};
</script>

<style lang="less" >
.reg-box {
  .title {
    font-size: 0.8rem;
    color: #1989fa;
    font-weight: 400;
    text-align: center;
  }
}
</style>