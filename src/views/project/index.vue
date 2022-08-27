<template>
  <div class="app-container">
    <!-- 项目列表 -->
    <el-table
      :data="data"
      border
      style="width: 100%"
      v-loading="projectLoading"
      element-loading-text="项目加载中"
      fit
      highlight-current-row
    >
      <el-table-column prop="data" label="序号" width="50" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="项目名称" width="200" align="center">
        <template slot-scope="scope">
          <a
            href="#"
            target="_blank"
            @click.prevent="handleToProject(scope.row.url)"
            >{{ scope.row.name }}</a
          >
        </template>
      </el-table-column>

      <el-table-column prop="description" label="项目描述" align="center">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>

      <el-table-column prop="thumb" label="预览图" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.thumb"
            fit="corver"
            :preview-src-list="thumbList"
          >
          </el-image>
        </template>
      </el-table-column>

      <el-table-column prop="data" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <!-- github -->
          <el-tooltip
            class="item"
            effect="dark"
            content="github"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="info"
              class="iconfont icon-github"
              circle
              size="mini"
              @click="handleToGithub(scope.row.github)"
            ></el-button>
          </el-tooltip>

          <!-- 编辑 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="warning"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="handleEditProject(scope.row)"
            ></el-button>
          </el-tooltip>
          <!-- 删除 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="handleDelProject(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑项目信息 -->
    <el-dialog
      title="请编辑该项目信息"
      :visible.sync="dialogFormVisible"
      top="5vh"
    >
      <el-form :model="form">
        <!-- 项目名称 -->
        <el-form-item label="项目标题">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 项目描述(每一项描述以英文逗号分隔) -->
        <el-form-item label="项目描述（多个描述之间以英文逗号分隔）">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.description"
          >
          </el-input>
        </el-form-item>
        <!-- 项目链接 -->
        <el-form-item label="项目链接">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
        <!-- github地址 -->
        <el-form-item label="github地址">
          <el-input v-model="form.github" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 预览图地址 -->
        <el-form-item label="预览图地址">
          <Upload v-model="form.imageUrl" />
        </el-form-item>
        <!-- 排序等级 -->
        <el-form-item label="排序等级">
          <el-select v-model="form.order">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 编辑提交按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSuccess">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { serverURL } from "@/utils/server_URL";
import { getProject, delProject, editProject } from "@/api/project";
import Upload from "@/components/Upload";

export default {
  components: {
    Upload,
  },
  data() {
    return {
      data: [],
      projectLoading: false,
      thumbList: [],
      form: {},
      dialogFormVisible: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    //获取项目列表数据
    fetchData() {
      this.projectLoading = true;
      getProject().then((res) => {
        if (!res.code && res.data) {
          this.data = res.data;
          for (let i of this.data) {
            i.description = i.description.toString();
            i.imageUrl = i.thumb;
            i.thumb = `${serverURL}${i.thumb}`;
            this.thumbList.push(i.thumb);
          }
          this.projectLoading = false;
        }
      });
    },
    //跳转到目标项目
    handleToProject(url) {
      window.open(url);
    },
    //跳转到目标github
    handleToGithub(github) {
      window.open(github);
    },
    //删除目标项目
    handleDelProject(id) {
      this.$confirm("此操作将永久删除该项目, 是否继续?", "删除项目", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delProject(id)
            .then(() => {
              this.fetchData();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            })
            .catch(() => {
              this.$message({
                type: "success",
                message: "删除失败!",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //编辑项目信息
    handleEditProject(row) {
      this.dialogFormVisible = true;
      // 回填项目数据
      this.form = { ...row };
    },
    //提交项目编辑
    handleEditSuccess() {
      this.dialogFormVisible = false;
      let project = {
        description: this.form.description.split(","),
        name: this.form.name,
        url: this.form.url,
        github: this.form.github,
        thumb: this.form.imageUrl,
        order: Number(this.form.order),
      };
      // 发送提交编辑请求
      editProject(this.form.id, project)
        .then(() => {
          this.$message({
            type: "success",
            message: "编辑成功",
          });
          this.fetchData();
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "编辑失败",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.css";
</style>