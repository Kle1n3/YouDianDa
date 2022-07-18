<template>
  <div>
    <van-grid :column-num="2">
      <van-grid-item
        v-for="(obj, index) in cateList"
        :key="obj.id"
        icon-prefix="fa"
        icon-size="20px"
        :icon="obj.icon.replace(reg, '')"
        :text="obj.catename"
        @click="toList(obj.id, index)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllCatesApi } from "@/api/classify";
export default {
  name: "Classify",
  data() {
    return {
      cateList: [],
      reg: new RegExp("fa-", "gi"),
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
    toList(id, ind) {
      this.$router.push({
        path: "/list",
        query: {
          id: id,
          index: ind,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-grid-item__icon {
  font-size: 40px;
}
</style>