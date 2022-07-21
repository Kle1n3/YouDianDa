<template>
  <van-picker
    title="更改性别"
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="onCancel"
    :default-index="defaultIndex"
  />
</template>

<script>
import { updateUserProfileApi } from "@/api/userProfile";
export default {
  name: "UpdateGender",
  props: {
    value: {
      type: [String, Number],
      required: true,
      default: 0,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
      defaultIndex: this.value,
    };
  },
  methods: {
    async onConfirm(value, index) {
      try {
        await updateUserProfileApi({
          id: this.id,
          sex: index,
        });
        this.$emit("close");
        this.$emit("input", index);
        this.$toast.success("修改成功");
      } catch (error) {
        console.log(error);
      }
    },
    onCancel() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="less" scoped>
</style>