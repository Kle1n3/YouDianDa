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
        <van-cell title="相关推荐" />
        <van-grid :column-num="2">
          <van-grid-item v-for="obj in recommendList" :key="obj.id">
            <van-image width="120px" height="100px" :src="obj.pic" />
            <p class="recommend-title">{{ obj.title }}</p>
          </van-grid-item>
        </van-grid>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <Collect
            :article_id="articleInfo.id"
            :isCollect="articleInfo.isCollect"
          />
          <Like :article_id="articleInfo.id" :isLike="articleInfo.isLike" />
          <van-button
            @click="showShare = true"
            icon="share"
            type="default"
          ></van-button>
          <van-share-sheet
            v-model="showShare"
            title="立即分享给好友"
            :options="options"
          />
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
import Collect from "@/components/collect";
import Like from "@/components/like";
export default {
  name: "articleInfos",
  components: {
    Collect,
    Like,
  },
  data() {
    return {
      isStatusCode: 1,
      articleInfo: {},
      recommendList: [],
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
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
        this.recommendList = data.data.recommend;
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
    .van-cell__title {
      font-size: 30px;
    }
    .recommend-title {
      padding: 0 0.33333rem;
      font-size: 20px;
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
        text-indent: 0 !important;
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