<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择出生日期"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>

<script>
import dayjs from "dayjs";
import { updateUserProfileApi } from "@/api/userProfile";
export default {
  name: "UpdateBirthday",
  props: {
    value: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.value),
    };
  },

  mounted() {},

  methods: {
    async onConfirm(value) {
      const birthday = dayjs(value).format("YYYY-MM-DD");
      try {
        await updateUserProfileApi({
          birthday: birthday,
          id: this.id,
        });
        this.$emit("close");
        this.$emit("input", birthday);
        this.$toast.success("修改成功");
      } catch (error) {
        this.$toast.fail("更改失败！");
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