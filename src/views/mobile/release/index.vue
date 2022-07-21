<template>
  <div class="release-container">
    <div class="nologin" v-if="!token">
      <van-empty image="error" description="请登录" />
    </div>
    <div class="login" v-else>
      <van-form id="pubarticle">
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
        <div v-if="$route.query.id" class="btn" style="margin: 16px">
          <van-button @click="saveAsDraft" icon="send-gift-o" type="info"
            >存草稿</van-button
          >
          <van-button @click="edit" icon="plus" type="warning"
            >修改文章</van-button
          >

          <van-button @click="reset" icon="revoke" type="danger"
            >重置</van-button
          >
        </div>
        <div v-else class="btn" style="margin: 16px">
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
import {
  uploadImageApi,
  releaseArtApi,
  getArticleInfo,
  editArticleApi,
} from "@/api/release";
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
      articleInfo: {},
      id: this.$route.query.id,
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
        if (this.$route.query.id) {
          const { data } = await getArticleInfo({
            id: this.$route.query.id,
          });
          this.articleInfo = data.data.info;
          this.article_name = data.data.info.title;
          this.article_cate = data.data.info.catename;
          this.article_tage = data.data.info.tags;
          this.article_content = data.data.info.content;
        }
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
          "fileList",
          "article_content",
        ]);
      } catch (error) {
        console.log(error);
      }
      try {
        let fd = new FormData();
        fd.append("file", this.fileList[0].file);
        const { data } = await uploadImageApi(fd);
        const pic = data.data.savePath;
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
        this.$toast.success("发布成功");
        this.$router.push("/article");
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
          "fileList",
          "article_content",
        ]);
      } catch (error) {
        console.log(error);
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
        this.$toast.success("保存成功");
        this.$router.push("/article");
      } catch (error) {
        console.log(error);
      }
    },
    async edit() {
      try {
        await this.$refs.form.validate([
          "article_name",
          "article_cate",
          "article_cate",
          "article_content",
        ]);
      } catch (error) {
        console.log(error);
      }
      try {
        if (this.fileList.length > 0) {
          let fd = new FormData();
          fd.append("file", this.fileList[0].file);
          const { data } = await uploadImageApi(fd);
          this.articleInfo.pic = data.data.savePath;
        }
        this.allCate.forEach((obj) => {
          if (obj.catename === this.article_cate) {
            this.articleInfo.cateid = obj.id;
          }
        });
        this.articleInfo.name = this.article_name;
        this.articleInfo.tags = this.article_tage;
        this.articleInfo.content = this.article_content;
        await editArticleApi(this.articleInfo);
        this.$toast.success("修改文章成功");
        this.$router.push("/article");
      } catch (error) {
        console.log(error);
      }
    },
    async saveAsDraft() {
      try {
        await this.$refs.form.validate([
          "article_name",
          "article_cate",
          "article_cate",
          "article_content",
        ]);
      } catch (error) {
        console.log(error);
      }
      try {
        if (this.fileList.length > 0) {
          let fd = new FormData();
          fd.append("file", this.fileList[0].file);
          const { data } = await uploadImageApi(fd);
          this.articleInfo.pic = data.data.savePath;
        }
        this.allCate.forEach((obj) => {
          if (obj.catename === this.article_cate) {
            this.articleInfo.cateid = obj.id;
          }
        });
        this.articleInfo.name = this.article_name;
        this.articleInfo.tags = this.article_tage;
        this.articleInfo.content = this.article_content;
        await editArticleApi(this.articleInfo);
        this.$toast.success("修改文章成功");
        this.$router.push("/article");
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