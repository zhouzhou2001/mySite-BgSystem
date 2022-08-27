<template>
  <div class="app-container">
    <div class="block">关于我</div>
    <el-input placeholder="请输入内容" v-model="input" :disabled="isDisabled">
    </el-input>
    <el-button
      style="margin-top: 15px"
      type="primary"
      round
      @click="handleIsDisabled"
      >{{ isDisabled ? "编辑" : "完成" }}</el-button
    >
  </div>
</template>

<script>
import { setAbout, getAbout } from "@/api/about";
export default {
  data() {
    return {
      input: "",
      isDisabled: true,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    //获取关于我url
    fetchData() {
      getAbout().then((res) => {
        if (!res.code && res.data) {
          this.input = res.data;
        }
      });
    },
    // 编辑关于我url
    handleIsDisabled() {
      if (this.isDisabled) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
        setAbout({ url: this.input }).then(() => {
          this.$message({
            type: "success",
            message: "编辑成功",
          });
          this.fetchData();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  font-size: 20px;
  margin: 15px 10px;
  color: #000;
}
</style>