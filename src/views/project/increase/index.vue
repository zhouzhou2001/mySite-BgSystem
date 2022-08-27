<template>
  <div class="app-container">
    <!-- 项目名称 -->
    <div class="block">项目名称</div>
    <el-input
      v-model="form.name"
      placeholder="请输入项目名称"
      style="width: 35%"
    ></el-input>
    <!-- 项目描述 -->
    <div class="block">项目描述（多个描述之间以英文逗号分隔）</div>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入项目描述"
      v-model="form.description"
      style="width: 50%"
    >
    </el-input>
    <!-- 项目链接 -->
    <div class="block">项目链接</div>
    <el-input
      v-model="form.url"
      placeholder="请输入项目链接"
      style="width: 50%"
    ></el-input>
    <!-- github地址 -->
    <div class="block">github地址</div>
    <el-input
      v-model="form.github"
      placeholder="请输入github地址"
      style="width: 50%"
    ></el-input>
    <!-- 项目预览图 -->
    <div class="block">预览图地址</div>
    <upload v-model="form.thumb" />
    <!-- 项目排序等级 -->
    <div class="block">排序等级</div>
    <el-select v-model="form.order" placeholder="请选择排序等级">
      <el-option label="1" value="1"></el-option>
      <el-option label="2" value="2"></el-option>
      <el-option label="3" value="3"></el-option>
      <el-option label="4" value="4"></el-option>
      <el-option label="5" value="5"></el-option>
    </el-select>
    <!-- 发布按钮 -->
    <div class="block">
      <el-button
        type="primary"
        style="margin: 10px 10px"
        @click.prevent="handleAddProject"
        >添加项目</el-button
      >
    </div>
  </div>
</template>

<script>
import { addProject } from "@/api/project";
import Upload from "@/components/Upload";

export default {
  components: {
    Upload,
  },
  data() {
    return {
      form: {
        name: "",
        description: "",
        url: "",
        github: "",
        thumb: "",
        order: "",
      },
    };
  },
  methods: {
    //添加项目信息
    handleAddProject() {
      let blog = { ...this.form };
      blog.description = blog.description.split(",");
      blog.order = Number(blog.order);
      if (
        blog.name &&
        blog.description &&
        blog.github &&
        blog.thumb &&
        blog.order &&
        blog.url
      ) {
        // 发送提交项目请求
        addProject(blog).then(() => {
          this.$message({
            type: "success",
            message: "项目添加成功",
          });
        });
      } else {
        this.$message({
          type: "error",
          message: "请完成所有项目信息",
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