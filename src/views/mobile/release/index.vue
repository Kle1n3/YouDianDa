<template>
  <div class="release-container">
    <div class="nologin" v-if="!token">
      <van-empty image="error" description="请登录" />
    </div>
    <div class="login" v-else>
      <van-form ref="form">
        <van-field
          v-model="article_name"
          name="article_name"
          label="文章标题"
          placeholder="请输入文章标题"
          :rules="[{ required: true, message: '请输入文章标题' }]"
        />
        <van-field
          v-model="article_cate"
          name="article_cate"
          label="文章分类"
          @click="isCateShow = true"
          placeholder="请选择文章分类"
          :rules="[{ required: true, message: '请选择文章分类' }]"
        />
        <van-popup
          v-model="isCateShow"
          position="bottom"
          :style="{ height: '30%' }"
        >
          <van-picker
            title="文章分类"
            show-toolbar
            :columns="cateList"
            @confirm="onConfirmCate"
            @cancel="onCancel"
          />
        </van-popup>
        <van-field
          v-model="article_tage"
          name="article_tage"
          label="文章标签"
          @click="isTageShow = true"
          placeholder="请选择文章标签"
          :rules="[{ required: true, message: '请选择文章标签' }]"
        />
        <van-popup
          v-model="isTageShow"
          position="bottom"
          :style="{ height: '30%' }"
        >
          <van-picker
            title="文章标签"
            show-toolbar
            :columns="tageList"
            @confirm="onConfirmTage"
            @cancel="onCancel"
          />
        </van-popup>
        <van-field
          name="fileList"
          label="文件上传"
          :rules="[{ required: true }]"
        >
          <template #input>
            <van-uploader v-model="fileList" />
          </template>
        </van-field>
        <van-field
          v-model="article_content"
          rows="3"
          autosize
          label="文章正文"
          type="textarea"
          placeholder="请输入文章正文"
          :rules="[{ required: true, message: '请输入文章正文' }]"
        />
        <div class="btn" style="margin: 16px">
          <van-button @click="release" icon="plus" type="primary"
            >发布</van-button
          >
          <van-button @click="saveArt" icon="send-gift-o" type="info"
            >存草稿</van-button
          >
          <van-button @click="reset" icon="revoke" type="danger"
            >重置</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAllCatesApi } from "@/api/classify";
import { uploadImageApi, releaseArtApi } from "@/api/release";
export default {
  name: "Release",
  data() {
    return {
      article_name: "",
      article_cate: "",
      isCateShow: false,
      cateList: [],
      article_tage: "",
      isTageShow: false,
      tageList: [],
      fileList: [],
      article_content: "",
      allCate: [],
    };
  },
  computed: {
    ...mapGetters(["token"]),
  },
  created() {
    if (this.token) {
      this.initData();
    }
  },
  methods: {
    async initData() {
      try {
        const { data } = await getAllCatesApi();
        this.allCate = data.data.allCate;
        data.data.allCate.forEach((obj) => {
          this.cateList.push(obj.catename);
        });
        data.data.allTag.forEach((obj) => {
          this.tageList.push(obj.tagname);
        });
      } catch (error) {
        console.log(error);
      }
    },
    onConfirmCate(value, index) {
      this.article_cate = value;
      this.isCateShow = false;
    },
    onConfirmTage(value, index) {
      this.article_tage = value;
      this.isTageShow = false;
    },
    onCancel() {
      this.isCateShow = false;
      this.isTageShow = false;
    },
    async release() {
      try {
        await this.$refs.form.validate([
          "article_name",
          "article_cate",
          "article_cate",
          "tageList",
          "fileList",
          "article_content",
        ]);
      } catch (error) {
        return;
      }
      try {
        let fd = new FormData();
        fd.append("file", this.fileList[0].file);
        const { data } = await uploadImageApi(fd);

        const pic = data.data.savePath;
        let cateid = 0;
        this.allCate.forEach((obj) => {
          if (obj.catename === this.article_cate) {
            cateid = obj.id;
          }
        });
        await releaseArtApi({
          author: "",
          cateid,
          content: this.article_content,
          pic,
          status: "2",
          tags: this.article_tage,
          title: this.article_name,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async saveArt() {
      try {
        await this.$refs.form.validate([
          "article_name",
          "article_cate",
          "article_cate",
          "tageList",
          "fileList",
          "article_content",
        ]);
      } catch (error) {
        return;
      }
      try {
        let fd = new FormData();
        fd.append("file", this.fileList[0].file);
        const { data } = await uploadImageApi(fd);

        const pic = data.data.savePath;
        let cateid = 0;
        this.allCate.forEach((obj) => {
          if (obj.catename === this.article_cate) {
            cateid = obj.id;
          }
        });
        await releaseArtApi({
          author: "",
          cateid,
          content: this.article_content,
          pic,
          status: "1",
          tags: this.article_tage,
          title: this.article_name,
        });
      } catch (error) {
        console.log(error);
      }
    },
    reset() {
      document.getElementById("pubarticle").reset();
      this.fileList = [];
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  display: flex;
  justify-content: space-between;
  padding: 0 0.4rem;
}
</style>