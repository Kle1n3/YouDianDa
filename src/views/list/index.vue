<template>
  <div class="list-container">
    <van-nav-bar
      :title="cateList[active].catename"
      fixed
      placeholder
      left-arrow
      @click-left="$router.back()"
    />
    <van-tabs v-model="active" animated swipeable sticky offset-top="46px">
      <van-tab v-for="obj in cateList" :key="obj.id" :title="obj.catename">
        <ArticleList :cateId="obj.id"></ArticleList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getAllCatesApi } from "@/api/classify";
import ArticleList from "./components/articleList.vue";
export default {
  name: "List",
  components: {
    ArticleList,
  },
  data() {
    return {
      active: this.$route.query.index * 1,
      cateList: [],
    };
  },

  created() {
    this.initData();
  },

  methods: {
    async initData() {
      try {
        const { data } = await getAllCatesApi();
        console.log(data);
        this.cateList = data.data.allCate;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-nav-bar {
  background-color: #1989fa;
  .van-icon {
    color: #fff;
  }
  .van-nav-bar__title {
    color: #fff;
  }
}
/deep/[class*="van-hairline"]::after {
  border: none;
}
</style>