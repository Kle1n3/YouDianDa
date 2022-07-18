<template>
  <div>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="'http://124.223.14.236:8060/' + image.advimgsrc" />
      </van-swipe-item>
    </van-swipe>
    <van-notice-bar
      left-icon="volume-o"
      text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
    />
    <van-cell title="热门推荐" />
    <van-grid :border="false" :column-num="3">
      <van-grid-item
        border
        v-for="obj in hotNewsList"
        :key="obj.id"
        text="文字"
      >
        <van-image :src="'http://124.223.14.236:8060/' + obj.pic" />
        <span>{{ obj.title }}</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="最近更新" value="24小时: /1周: " />
    <NewsList></NewsList>
  </div>
</template>

<script>
import { getHotListApi } from "@/api/home";
import { getAllCatesApi } from "@/api/classify";
import NewsList from "@/views/mobile/home/components/newsList.vue";
export default {
  name: "Home",
  components: {
    NewsList,
  },
  data() {
    return {
      images: [
        "http://124.223.14.236:8060/upload/images/20211101/1635756787611.jpg",
        "http://124.223.14.236:8060/upload/images/20220614/1655192446879.jpg",
      ],
      hotNewsList: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      try {
        const { data } = await getHotListApi();
        const res = await getAllCatesApi();
        console.log(res);
        this.hotNewsList = data.data.list;
        this.images = res.data.data.banner;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.van-swipe-item {
  width: 100%;
  height: 340px;
  img {
    width: 100%;
    height: 100%;
  }
}
.van-cell__title {
  color: #1989fa;
  font-weight: 700;
}
.van-grid {
  .van-grid-item {
    font-size: 24px;
    .van-image {
      height: 180px;
    }
  }
}
.update {
  display: flex;
  justify-content: space-between;
  padding: 20px 32px;
  .left {
    color: #1989fa;
    font-weight: 700;
    font-size: 24px;
  }
  .van-cell {
    .van-cell__value {
      font-size: 12px;
    }
  }
}
</style>