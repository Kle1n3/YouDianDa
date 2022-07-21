<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <van-cell
      @click="$refs.file.click()"
      class="avatar-cell"
      title="头像"
      is-link
      center
    >
      <input type="file" ref="file" hidden @change="uploadfile" />
      <van-image
        class="avatar"
        round
        fit="cover"
        :src="'http://124.223.14.236:8060/' + userProfile.icon"
      />
    </van-cell>
    <van-cell
      @click="isUpdateNameShow = true"
      title="昵称"
      :value="userProfile.username"
      is-link
    />
    <van-cell
      @click="isUpdatePhoneNumShow = true"
      title="手机号码"
      :value="userProfile.mobile"
      is-link
    />
    <van-cell
      @click="isUpdateGenderShow = true"
      title="性别"
      :value="userProfile.sex === 0 ? '男' : '女'"
      is-link
    />
    <van-cell
      @click="isUpdateBirthdayShow = true"
      title="出生年月"
      :value="userProfile.birthday"
      is-link
    />
    <van-cell
      @click="isUpdateAddressShow = true"
      title="家庭地址"
      :label="userProfile.address"
      is-link
    />
    <van-cell
      @click="isUpdateNotesShow = true"
      title="个性留言"
      :label="userProfile.notes"
      is-link
    />
    <!-- /个人信息 -->

    <van-popup
      v-model="isUpdatePhotoShow"
      style="height: 100%"
      position="bottom"
    >
      <UpdatePhotoday
        @uploadPhoto="userProfile.icon = $event"
        :img="previewURL"
        :id="userProfile.id"
        @close="isUpdatePhotoShow = false"
      />
    </van-popup>
    <van-popup
      v-model="isUpdateNameShow"
      style="height: 100%"
      position="bottom"
    >
      <UpdateName
        v-if="isUpdateNameShow"
        @close="isUpdateNameShow = false"
        v-model="userProfile.username"
        :id="userProfile.id"
      ></UpdateName>
    </van-popup>
    <van-popup
      v-model="isUpdatePhoneNumShow"
      style="height: 100%"
      position="bottom"
    >
      <UpdatePhoneNum
        v-if="isUpdatePhoneNumShow"
        @close="isUpdatePhoneNumShow = false"
        v-model="userProfile.mobile"
        :id="userProfile.id"
      ></UpdatePhoneNum>
    </van-popup>
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <UpdateGender
        v-if="isUpdateGenderShow"
        @close="isUpdateGenderShow = false"
        v-model="userProfile.sex"
        :id="userProfile.id"
      />
    </van-popup>
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <UpdateBirthday
        v-if="isUpdateBirthdayShow"
        @close="isUpdateBirthdayShow = false"
        v-model="userProfile.birthday"
        :id="userProfile.id"
      />
    </van-popup>
    <van-popup
      v-model="isUpdateAddressShow"
      style="height: 100%"
      position="bottom"
    >
      <UpdateName
        v-if="isUpdateAddressShow"
        @close="isUpdateAddressShow = false"
        v-model="userProfile.address"
        :id="userProfile.id"
      ></UpdateName>
    </van-popup>
    <van-popup
      v-model="isUpdateNotesShow"
      style="height: 100%"
      position="bottom"
    >
      <UpdateName
        v-if="isUpdateNotesShow"
        @close="isUpdateNotesShow = false"
        v-model="userProfile.notes"
        :id="userProfile.id"
      ></UpdateName>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfileApi } from "@/api/userProfile";
import UpdateName from "./components/update-name.vue";
import UpdatePhoneNum from "./components/update-phonenum.vue";
import UpdateGender from "./components/update-gender.vue";
import UpdateBirthday from "./components/update-birthday.vue";
import UpdatePhotoday from "./components/update-photo.vue";
import UpdateAddress from "./components/update-address.vue";
import UpdateNotesShow from "./components/update-notes.vue";
export default {
  name: "UserProfile",
  components: {
    UpdateName,
    UpdatePhoneNum,
    UpdateGender,
    UpdateBirthday,
    UpdatePhotoday,
    UpdateAddress,
    UpdateNotesShow,
  },
  data() {
    return {
      userProfile: {},
      isUpdatePhotoShow: false,
      isUpdateNameShow: false,
      isUpdatePhoneNumShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdateAddressShow: false,
      isUpdateNotesShow: false,
      previewURL: "",
    };
  },

  created() {
    this.initData();
  },

  methods: {
    async initData() {
      try {
        const { data } = await getUserProfileApi();
        this.userProfile = data.data.userInfo;
      } catch (error) {
        console.log(data);
      }
    },
    async uploadfile() {
      const imgFile = this.$refs.file.files[0];
      console.log(imgFile);
      if (
        !["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(
          imgFile.type
        )
      ) {
        return this.$toast.fail("文件类型不正确");
      }
      const maxSize = 1024 * 1024 * 3;
      if (imgFile.size > maxSize) return this.$toast.fail("文件不允许超过3MB");
      this.previewURL = URL.createObjectURL(imgFile);
      this.isUpdatePhotoShow = true;
      this.$refs.file.value = null;
      /* try {
        let fd = new FormData();
        fd.append("photo", imgFile);
        const { data } = await uploadFileApi(fd);
        console.log(data);
        this.img2 = data.data.photo;
      } catch (error) {
        console.log(error);
      } */
    },
  },
};
</script>

<style lang="less" scoped>
.user-profile {
  [class*="van-hairline"]::after {
    border: none;
  }
  .van-nav-bar {
    background-color: #1989fa;
    /deep/.van-nav-bar__title {
      color: #fff;
    }
    /deep/.van-icon {
      color: #fff;
    }
  }
  .avatar-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }
    .avatar {
      width: 60px;
      height: 60px;
    }
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>