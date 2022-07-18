<template>
  <div class="my-box">
    <div class="no-login" v-if="!token">
      <van-cell class="base-info" to="/login">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="left">
            <div class="avator">
              <van-image
                round
                width="2rem"
                height="2rem"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
              />
            </div>
            <div class="custom-title">
              <h1>请登录</h1>
              <span>登录之后更加精彩</span>
            </div>
          </div>
        </template>
        <template #right-icon>
          <van-icon name="arrow" class="arrow" />
        </template>
      </van-cell>
      <van-cell title="我的文章" to="/article" icon="newspaper-o" is-link />
      <van-cell title="我的收藏" to="/collect" icon="star-o" is-link />
      <van-cell title="我的点赞" to="/like" icon="good-job-o" is-link />
    </div>
    <div class="login" v-else>
      <van-cell class="base-info" to="/login">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="left">
            <div class="avator">
              <van-image
                round
                width="2rem"
                height="2rem"
                :src="'http://124.223.14.236:8060/' + userInfo.icon"
              />
            </div>
            <div class="custom-title">
              <h1>{{ userInfo.username }}</h1>
              <span>{{ userInfo.notes }}</span>
            </div>
          </div>
        </template>
        <template #right-icon v-if="!token">
          <van-icon name="arrow" class="arrow" />
        </template>
      </van-cell>
      <van-grid :column-num="3">
        <van-grid-item icon="like-o" text="收藏" />
        <van-grid-item icon="good-job-o" text="点赞" />
        <van-grid-item icon="newspaper-o" text="文章" />
      </van-grid>
      <van-cell title="我的文章" to="/article" icon="newspaper-o" is-link />
      <van-cell title="我的收藏" to="/collect" icon="star-o" is-link />
      <van-cell title="我的点赞" to="/like" icon="good-job-o" is-link />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit" @click="quit"
          >立即退出</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getUserInfoApi } from "@/api/my";
export default {
  name: "My",
  data() {
    return {
      userInfo: {},
    };
  },
  computed: {
    ...mapGetters(["token"]),
  },
  created() {
    this.initData();
  },
  methods: {
    ...mapMutations(["getUserToken"]),
    async initData() {
      try {
        const { data } = await getUserInfoApi();
        this.userInfo = data.data.userInfo;
      } catch (error) {
        console.log(error);
      }
    },
    async quit() {
      await this.$dialog.confirm({
        title: "提示",
        message: "是否确认退出？",
      });
      this.getUserToken({});
    },
  },
};
</script>

<style lang="less">
.my-box {
  .base-info {
    display: flex;
    align-items: center;
    padding: 40px;
    height: 250px;
    background-color: #1989fa;
    .van-cell::after {
      border: none;
    }
    .left {
      display: flex;
      color: #fff;
      .avator {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        .van-icon {
          font-size: 60px;
          color: #e2dedf;
        }
      }
      .custom-title {
        margin-left: 30px;
        h1 {
          margin-bottom: 0px;
          font-size: 38px;
        }
        span {
          font-size: 25px;
        }
      }
    }

    .arrow {
      font-size: 60px;
      color: #fff;
    }
  }
}
</style>