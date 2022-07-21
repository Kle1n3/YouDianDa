<template>
  <van-swipe-cell>
    <ArticleItem :articleItem="listItem" />
    <template #right>
      <van-button
        @click="$emit('edit', listItem.id)"
        class="swipecell"
        square
        type="danger"
        :text="options"
      />
      <van-button
        v-if="title === '我的文章'"
        class="swipecell"
        square
        type="primary"
        text="修改"
        @click="toRelease"
      />
    </template>
  </van-swipe-cell>
</template>

<script>
import ArticleItem from "@/views/list/components/articleItem.vue";
export default {
  name: "List-item",
  components: {
    ArticleItem,
  },
  props: {
    listItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      title: this.$route.meta.title,
    };
  },
  computed: {
    options() {
      if (this.title === "我的点赞") {
        return "取消点赞";
      } else if (this.title === "我的收藏") {
        return "取消收藏";
      } else {
        return "删除";
      }
    },
  },
  mounted() {},
  methods: {
    toRelease() {
      this.$router.push({
        path: "/release",
        query: {
          id: this.listItem.id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.swipecell {
  height: 100%;
}
</style>