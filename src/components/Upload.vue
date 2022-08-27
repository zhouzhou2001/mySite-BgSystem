<template>
  <div>
    <div class="title">{{ uploadTitle }}</div>
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :headers="header"
      :disabled="isDisabled"
    >
      <el-image v-if="value" :src="imageUrl" class="avatar"></el-image>
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
        style="outline: 1px dashed #d9d9d9"
      ></i>
    </el-upload>
  </div>
</template>

<script>
import { serverURL } from "@/utils/server_URL";

export default {
  props: ["uploadTitle", "value", "isDisabled"],
  computed: {
    header() {
      return {
        Authorization: "Bearer " + localStorage.getItem("adminUser"),
      };
    },
    imageUrl() {
      return serverURL + this.value;
    },
  },
  methods: {
    handleAvatarSuccess(res) {
      if (!res.code && res.data) {
        this.$emit("input", res.data);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin: 10px 10px;
  font-weight: 100;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>