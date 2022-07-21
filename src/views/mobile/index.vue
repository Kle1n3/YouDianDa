<template>
  <div>
    <van-nav-bar
      :title="$route.meta.title"
      :left-arrow="
        $route.meta.title === '我的文章' ||
        $route.meta.title === '我的收藏' ||
        $route.meta.title === '我的点赞'
      "
      @click-left="$router.back(1)"
      placeholder
      fixed
      v-show="$route.meta.title !== '登录' && $route.meta.title !== '注册'"
    >
      <template #right>
        <van-icon
          name="setting-o"
          size="18"
          @click="toProfile"
          v-if="$route.meta.title === '我的' && token"
        />
      </template>
    </van-nav-bar>
    <router-view />

    <van-tabbar
      route
      placeholder
      v-show="$route.meta.title !== '登录' && $route.meta.title !== '注册'"
    >
      <van-tabbar-item replace to="/index" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/classify" icon="apps-o"
        >分类</van-tabbar-item
      >
      <van-tabbar-item replace to="/release" icon="newspaper-o"
        >发布</van-tabbar-item
      >
      <van-tabbar-item replace to="/my" icon="user-o">{{
        token ? "我的" : "未登录"
      }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["token"]),
  },
  methods: {
    toProfile() {
      this.$router.push({
        path: "/profile",
      });
    },
  },
};
</script>

<style lang="less" >
.van-nav-bar {
  background-color: #1989fa;
  .van-nav-bar__title {
    font-size: 40px;
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }

  .van-cell::after {
    border: none;
  }
}
.van-hairline--bottom::after {
  border: none;
}
</style>