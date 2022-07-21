<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <ListItem
      v-for="obj in list"
      :key="obj.id"
      :listItem="obj"
      @edit="cancelLike"
    />
  </van-list>
</template>

<script>
import ListItem from "./components/list-item.vue";
import { getUserDataList } from "@/api/userProfile";
import { cancelLikeArticleApi } from "@/api/articleDetail";
export default {
  name: "MyLikes",
  components: {
    ListItem,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      limit: 10,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      try {
        const { data } = await getUserDataList({
          type: 2,
          page: this.page,
          limit: this.limit,
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
        const { data } = await getUserDataList({
          type: 2,
          page: this.page,
          limit: this.limit,
        });
        this.list.push(...data.data.list.data);
        this.loading = false;
        if (data.data.list.data.length < this.limit)
          return (this.finished = true);
      } catch (error) {
        console.log(error);
      }
    },
    async cancelLike(id) {
      try {
        await cancelLikeArticleApi({
          type: 2,
          article_id: id,
          action: "del",
        });
        this.$toast.success("取消成功");
        const ind = this.list.findIndex((obj) => obj.id === id);
        this.list.splice(ind, 1);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>