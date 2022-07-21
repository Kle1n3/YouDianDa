<template>
  <van-button
    :icon="Collect ? 'star' : 'star-o'"
    type="default"
    @click="changeCollect"
  />
</template>

<script>
import {
  addCollectArticleApi,
  cancelCollectArticleApi,
} from "@/api/articleDetail";
export default {
  name: "Collect",
  props: {
    article_id: {
      type: [String, Number],
      required: true,
    },
    isCollect: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      Collect: this.isCollect,
    };
  },

  mounted() {},

  methods: {
    async changeCollect() {
      if (!this.$store.getters.token) return this.$toast.fail("请登录");
      try {
        if (this.Collect) {
          await cancelCollectArticleApi({
            type: 1,
            article_id: this.article_id,
            action: "del",
          });
          this.$toast.success("取消成功");
        } else {
          await addCollectArticleApi({
            type: 1,
            article_id: this.article_id,
            action: "add",
          });
          this.$toast.success("收藏成功");
        }
        this.Collect = !this.Collect;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>