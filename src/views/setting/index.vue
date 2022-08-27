<template>
  <div class="app-container">
    <!-- 网站信息 -->
    <div style="padding-bottom: 20px; border-bottom: 2px solid #ccc">
      <div class="block">网站信息</div>
      <div class="aside">网站标题</div>
      <el-input
        placeholder="请输入内容"
        v-model="data.siteTitle"
        :disabled="isDisabled"
        style="width: 50%"
      >
      </el-input>

      <div class="aside">邮箱</div>
      <el-input
        placeholder="请输入内容"
        v-model="data.mail"
        :disabled="isDisabled"
        style="width: 50%"
      >
      </el-input>

      <div class="aside">备案号</div>
      <el-input
        placeholder="请输入内容"
        v-model="data.icp"
        :disabled="isDisabled"
        style="width: 50%"
      >
      </el-input>
    </div>
    <!-- 网站头像 -->
    <div style="padding-bottom: 20px; border-bottom: 2px solid #ccc">
      <div class="block">网站头像信息</div>
      <upload v-model="data.avatar" :isDisabled="isDisabled" />
    </div>
    <!-- 网址图标信息 -->
    <div style="padding-bottom: 20px; border-bottom: 2px solid #ccc">
      <div class="block">网址图标信息</div>
      <div class="aside">网址图标地址</div>
      <el-input
        placeholder="请输入内容"
        v-model="data.favicon"
        :disabled="isDisabled"
        style="width: 75%"
      >
      </el-input>

      <div class="aside">网址图标预览</div>
      <el-image :src="faviconSrc" style="width: 50px; height: 50px"></el-image>
    </div>
    <!-- github信息 -->
    <div style="padding-bottom: 20px; border-bottom: 2px solid #ccc">
      <div class="block">github信息</div>
      <div class="aside">github名字</div>
      <el-input
        placeholder="请输入内容"
        v-model="data.githubName"
        :disabled="isDisabled"
        style="width: 50%"
      >
      </el-input>

      <div class="aside">github地址</div>
      <el-input
        placeholder="请输入内容"
        v-model="data.github"
        :disabled="isDisabled"
        style="width: 50%"
      >
      </el-input>
    </div>
    <!-- QQ信息 -->
    <div style="padding-bottom: 20px; border-bottom: 2px solid #ccc">
      <div class="block">QQ信息</div>
      <div class="aside">QQ号码</div>
      <el-input
        placeholder="请输入内容"
        v-model="data.qq"
        :disabled="isDisabled"
        style="width: 50%"
      >
      </el-input>

      <div class="aside">QQ二维码图片预览</div>
      <upload v-model="data.qqQrCode" :isDisabled="isDisabled" />
    </div>
    <!-- 微信信息 -->
    <div style="padding-bottom: 20px; border-bottom: 2px solid #ccc">
      <div class="block">微信信息</div>
      <div class="aside">微信号码</div>
      <el-input
        placeholder="请输入内容"
        v-model="data.weixin"
        :disabled="isDisabled"
        style="width: 50%"
      >
      </el-input>

      <div class="aside">QQ二维码图片预览</div>
      <upload v-model="data.weixinQrCode" :isDisabled="isDisabled" />
    </div>
    <el-button
      type="primary"
      style="margin: 20px 15px"
      @click="handleEditSetting"
      >{{ isDisabled ? "进入编辑" : "完成编辑" }}</el-button
    >
  </div>
</template>

<script>
import { getSetting, setSetting } from "@/api/setting";
import Upload from "@/components/Upload";

export default {
  components: {
    Upload,
  },
  data() {
    return {
      data: {},
      isDisabled: true,
      faviconSrc: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    //处理编辑设置
    handleEditSetting() {
      if (this.isDisabled) {
        this.isDisabled = false;
      } else {
        setSetting(this.data).then(() => {
          this.$message({
            type: "success",
            message: "编辑成功",
          });
          this.fetchData();
          this.isDisabled = true;
        });
      }
    },
    //获取全局设置信息
    fetchData() {
      getSetting().then((res) => {
        if (!res.code && res.data) {
          this.data = res.data;
          this.faviconSrc = this.data.favicon;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  font-size: 20px;
  margin: 15px 0;
}
.aside {
  margin: 10px;
  font-weight: 200;
}
</style>