<template>
  <div class="newsList-container">
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
import { getNewsListApi } from "@/api/home";
import ArticleItem from "@/views/list/components/articleItem.vue";
export default {
  name: "NewsList",
  components: {
    ArticleItem,
  },
  data() {
    return {
      list: [],
      params: {
        page: 1,
        limit: 10,
      },
      loading: false,
      finished: false,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      try {
        const { data } = await getNewsListApi(this.params);
        console.log(data);
        this.list = data.data.list.data;
      } catch (error) {
        console.log(error);
      }
    },
    async onLoad() {
      this.params.page += 1;
      const { data } = await getNewsListApi(this.params);
      this.loading = false;
      console.log(data.data.list.data);
      if (!data.data.list.data.length < this.params.limit)
        return (this.finished = true);
      this.list.push(...data.data.list.data);
    },
  },
};
</script>

<style lang="less" scoped>
.van-cell__value {
  flex: 1;
}
/deep/.van-multi-ellipsis--l2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>