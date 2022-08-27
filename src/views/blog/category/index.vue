<template>
  <div class="app-container">
    <!-- 添加文章 -->
    <div style="margin-top: 15px">
      <el-input
        placeholder="请输入要添加的文章分类，并在左侧选择分类等级"
        v-model="input"
        class="input-with-select"
        style="width: 500px; margin: 10px"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-input>
      <el-button type="primary" @click="handleAddClick">添加</el-button>
    </div>
    <!-- 分类列表 -->
    <el-table
      :data="data"
      border
      style="width: 100%; margin-top: 20px"
      v-loading="listLoading"
    >
      <el-table-column prop="data" label="序号" width="50" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="博客类别" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="articleCount" label="文章数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.articleCount }}
        </template>
      </el-table-column>
      <el-table-column prop="data" label="操作" width="150" align="center">
        <template slot-scope="scope">
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
              @click="handleEditType(scope.row.id)"
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
              @click="handleDleType(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑分类弹窗 -->
    <el-dialog
      title="请编辑该分类信息"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleFormUpload">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addBlogType,
  delBlogType,
  editBlogType,
  getAllBlogType,
} from "@/api/blogType";

export default {
  data() {
    return {
      input: "",
      select: 1,
      listLoading: false,
      data: [],
      dialogFormVisible: false,
      form: {},
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    //删除分类
    handleDleType(id) {
      this.$confirm(
        "删除此分类，此分类下的文章将需要重新分类, 是否继续?",
        "是否删除此分类",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          delBlogType(id).then(() => {
            //删除成功后重新获取数据
            this.fetchData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //编辑分类
    handleEditType(editInfo) {
      this.dialogFormVisible = true;
      for (let i of this.data) {
        if (i.id === editInfo) {
          this.form = { ...i };
        }
      }
    },
    //提交编辑
    handleFormUpload() {
      editBlogType(this.form.id, {
        name: this.form.name,
        order: this.form.order,
      }).then(() => {
        this.dialogFormVisible = false;
        this.$message({
          message: "编辑成功",
          type: "success",
        });
        this.fetchData();
      });
    },
    //添加分类
    handleAddClick() {
      if (this.input) {
        addBlogType({ name: this.input, order: this.select }).then((res) => {
          this.fetchData();
          this.$message.success("分类添加成功");
          this.input = "";
        });
      } else {
        this.$message.error("分类名称不能为空");
      }
    },
    //获取文章分类数据
    fetchData() {
      this.listLoading = true;
      getAllBlogType().then((res) => {
        this.data = res.data;
        this.listLoading = false;
      });
    },
  },
};
</script>

<style>
</style>