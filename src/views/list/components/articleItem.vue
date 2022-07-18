<template>
  <div class="articleItem-container" @click="toArtDetails">
    <van-cell>
      <template #title>
        <span class="custom-title van-multi-ellipsis--l2">{{
          articleItem.title
        }}</span>
      </template>
      <template #label>
        <div>
          <span class="van-multi-ellipsis--l2">{{
            articleItem.description
          }}</span>
          <span>
            <van-icon name="star-o" />
            收藏 ({{ articleItem.lovenum }})
          </span>
          <span>
            <van-icon name="good-job-o" />
            点赞 ({{ articleItem.click }})
          </span>
        </div>
      </template>
      <template #default>
        <van-image
          height="100px"
          fit="cover"
          :src="'http://124.223.14.236:8060/' + articleItem.pic"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "YddArticleItem",
  props: {
    articleItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {
    toArtDetails() {
      this.$router.push({
        path: "/details",
        query: {
          id: this.articleItem.id,
        },
      });
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