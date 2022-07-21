<template>
  <van-button
    :icon="Like ? 'good-job' : 'good-job-o'"
    type="default"
    @click="changeLike"
  />
</template>

<script>
import { addLikeArticleApi, cancelLikeArticleApi } from "@/api/articleDetail";
export default {
  name: "Like",
  props: {
    article_id: {
      type: [String, Number],
      required: true,
    },
    isLike: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      Like: this.isLike,
    };
  },

  mounted() {},

  methods: {
    async changeLike() {
      console.log(111);
      if (!this.$store.getters.token) return this.$toast.fail("请登录");
      try {
        if (this.Like) {
          await cancelLikeArticleApi({
            type: 2,
            article_id: this.article_id,
            action: "del",
          });
          this.$toast.success("取消成功");
        } else {
          await addLikeArticleApi({
            type: 2,
            article_id: this.article_id,
            action: "add",
          });
          this.$toast.success("点赞成功");
        }
        this.Like = !this.Like;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>