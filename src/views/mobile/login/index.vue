<template>
  <div class="login-box">
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      @click-left="$router.back(1)"
    />
    <h1 class="title">优点达资讯</h1>
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
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <div class="reg">
      <router-link to="/reg">没有账号,立即注册</router-link>
    </div>
  </div>
</template>

<script>
import { userLoginApi } from "@/api/login";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      userInfo: {
        mobile: "",
        password: "",
      },
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
      },
    };
  },
  methods: {
    ...mapMutations(["getUserToken"]),
    async onSubmit() {
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const { data } = await userLoginApi(this.userInfo);
        console.log(data);
        this.getUserToken(data.data);
      } catch (error) {
        console.log(error);
      }
      this.$toast.clear();
      this.$toast.success("登录成功");
      const url = this.$route.query.url;
      if (url) {
        this.$router.replace(url);
      } else {
        this.$router.push({
          path: "/my",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login-box {
  .title {
    font-size: 0.8rem;
    color: #1989fa;
    font-weight: 400;
    text-align: center;
  }
  .reg {
    text-align: center;
    a {
      font-size: 25px;
    }
  }
}
</style>