<template>
  <div class="articleList-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ArticleItem v-for="obj in list" :key="obj.id" :articleItem="obj" />
    </van-list>
  </div>
</template>

<script>
import ArticleItem from "./articleItem.vue";
import { getArticleListApi } from "@/api/list";
export default {
  name: "YddArticleList",
  components: {
    ArticleItem,
  },
  props: {
    cateId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      limit: 20,
    };
  },

  created() {
    this.initData();
  },

  methods: {
    async initData() {
      try {
        const { data } = await getArticleListApi({
          page: this.page,
          limit: this.limit,
          cateid: this.cateId,
        });
        this.list = data.data.list.data;
      } catch (error) {
        console.log(error);
      }
    },
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        this.page++;
        const { data } = await getArticleListApi({
          page: this.page,
          limit: this.limit,
          cateid: this.cateId,
        });
        if (data.data.list.data.length < this.limit)
          return (this.finished = true);
        this.loading = false;
        this.list.push(...data.data.list.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>