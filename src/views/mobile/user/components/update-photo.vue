<template>
  <div class="update-photo">
    <img class="img" :src="img" ref="img" />

    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { uploadPhotoApi, updateUserProfileApi } from "@/api/userProfile";
export default {
  name: "UpdatePhoto",

  props: {
    // 预览图片地址信息
    img: {
      type: [String, Object],
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },

  mounted() {
    this.cropper = new Cropper(this.$refs.img, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
    });
  },

  methods: {
    onConfirm() {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        let fd = new FormData();
        fd.append("file", blob);
        const { data } = await uploadPhotoApi(fd);
        const res = await updateUserProfileApi({
          icon: data.data.savePath,
          id: this.id,
        });
        this.$emit("uploadPhoto", data.data.savePath);
        this.$toast.success(res.data.errmsg);
        this.$emit("close");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  display: block;
  max-width: 100%;
}
</style>