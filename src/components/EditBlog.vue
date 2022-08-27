<template>
  <div class="app-container">
    <!-- 文章标题 -->
    <div class="block">文章标题</div>
    <el-input
      v-model="form.title"
      placeholder="请输入标题"
      style="width: 50%"
    ></el-input>
    <!-- 文章内容 -->
    <div class="block">文章内容</div>
    <editor ref="toastuiEditor" :initialValue="form.content" height="500px" />
    <!-- 文章描述 -->
    <div class="block">文章描述</div>
    <el-input
      type="textarea"
      :rows="4"
      placeholder="请输入描述"
      v-model="form.description"
      style="width: 75%"
    >
    </el-input>
    <!-- 文章头图 -->
    <Upload uploadTitle="文章头图" v-model="form.thumb" />
    <!-- 选择分类 -->
    <div class="block">选择分类</div>
    <el-select v-model="form.select" placeholder="请选择文章分类">
      <el-option
        v-for="item in typeList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
    <!-- 发布按钮 -->
    <div>
      <el-button
        type="primary"
        style="margin: 10px 10px"
        @click.prevent="handleEditClick"
        >{{ mode === "add" ? "添加文章" : "完成编辑" }}</el-button
      >
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/Upload";
import { getAllBlogType } from "@/api/blogType";
import { editBlog, getOneBlog, addBlog } from "@/api/blog";

export default {
  props: ["mode"],
  components: {
    Editor,
    Upload,
  },
  data() {
    return {
      form: {
        title: "",
        editorText: "",
        description: "",
        thumb: "",
        select: "",
      },
      typeList: [],
      editorOption: {
        language: "zh-CN",
      },
    };
  },
  created() {
    //获取分类列表
    getAllBlogType().then(({ data }) => {
      this.typeList = data;
    });
    //如果是编辑文章就要回填数据
    if (this.mode === "edit") {
      //根据id获取文章内容并回填信息
      getOneBlog(this.$router.history.current.params.id).then(({ data }) => {
        this.form = { ...data, select: "" };
        this.$refs.toastuiEditor.invoke("setHTML", this.form.htmlContent);
      });
    }
  },
  methods: {
    //完成文章编辑
    handleEditClick() {
      //根据接口创建提交数据
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      let blog = {
        title: this.form.title,
        categoryId: this.form.select,
        description: this.form.description,
        createDate: new Date().getTime(),
        //传入markdown服务器生成toc
        toc: [],
        thumb: this.form.thumb,
        htmlContent: html,
        markdownContent: markdown,
      };
      if (
        blog.title &&
        blog.description &&
        blog.htmlContent &&
        blog.categoryId
      ) {
        if (this.mode === "add") {
          //提交添加文章
          addBlog(blog).then(() => {
            this.$message({
              type: "success",
              message: "发布成功!",
            });
          });
        }
        if (this.mode === "edit") {
          //提交编辑信息
          editBlog(this.form.id, blog).then(() => {
            this.$message({
              type: "success",
              message: "发布成功!",
              message: "编辑成功!",
            });
          });
        }
      } else {
        this.$message({
          type: "error",
          message: "请完成文章标题，描述，内容，分类!",
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
  font-weight: 100;
}
</style>