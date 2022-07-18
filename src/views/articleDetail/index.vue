<template>
  <div class="article-container">
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />
    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isStatusCode === 1">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-if="isStatusCode === 2">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleInfo.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div slot="title" class="user-name">{{ articleInfo.author }}</div>
          <div slot="label" class="publish-date">
            {{ articleInfo.create_date | relativeTime }}
          </div>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          ref="content"
          class="article-content markdown-body"
          v-html="articleInfo.content"
        >
          这是文章内容
        </div>
        <van-divider>正文结束</van-divider>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button color="#777" icon="star-o" type="default"></van-button>
          <van-button
            color="#777"
            icon="good-job-o"
            type="default"
          ></van-button>
          <van-button color="#777" icon="share" type="default"></van-button>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-if="isStatusCode === 4">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-if="isStatusCode === 3">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="initData">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getArticleDetailApi } from "@/api/articleDetail.js";
export default {
  name: "articleInfos",

  data() {
    return {
      isStatusCode: 1,
      articleInfo: {},
    };
  },

  created() {
    this.initData();
  },

  methods: {
    async initData() {
      try {
        const { data } = await getArticleDetailApi({
          id: this.$route.query.id,
        });
        this.articleInfo = data.data.info;
        this.isStatusCode = 2;
      } catch (error) {
        if (error.response && error.response === 404) {
          this.isStatusCode = 4;
        } else {
          this.isStatusCode = 3;
        }
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "@/style/github-markdown.css";
.article-container {
  [class*="van-hairline"]::after {
    border: none;
  }
  /deep/.van-nav-bar__content {
    background-color: #5094f3;
    .van-icon {
      color: #fff;
    }
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    width: 100%;
    .van-button::before {
      border: none;
    }
    .van-button--default {
      border: none;
    }
  }
}
</style>