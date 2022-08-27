<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <el-table :data="data" border style="width: 100%">
      <el-table-column prop="data" label="序号" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>

      <el-table-column prop="description" label="描述" align="center">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>

      <el-table-column prop="midImg2" label="中图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.midImg2"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column prop="bigImg2" label="大图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 150x; height: 100px"
            :src="scope.row.bigImg2"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column prop="data" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="right"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="handleEditClick(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑 -->
    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible" top="5vh">
      <el-form :model="form">
        <!-- 标题 -->
        <el-form-item label="标题">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 描述 -->
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.description"
          >
          </el-input>
        </el-form-item>
        <!-- 上传图片 -->
        <el-row>
          <el-col :span="12">
            <!-- 中图预览 -->
            <el-form-item label="首页中图">
              <Upload v-model="form.midImg" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 大图预览 -->
            <el-form-item label="首页大图">
              <Upload v-model="form.bigImg" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleFormUpload">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Upload from "@/components/Upload.vue";
import { serverURL } from "@/utils/server_URL";
import { getBanner } from "@/api/banner";
import { setBanner } from "@/api/banner";

export default {
  components: {
    Upload,
  },
  data() {
    return {
      data: [],
      dialogFormVisible: false,
      form: {},
    };
  },
  created() {
    this.fetchData();
  },

  methods: {
    //获取首页标语数据
    fetchData() {
      //根据接口获取首页标语数据
      getBanner().then((res) => {
        this.data = res.data;
        for (let i of this.data) {
          i.bigImg2 = serverURL + i.bigImg;
          i.midImg2 = serverURL + i.midImg;
        }
      });
    },
    //编辑表单数据响应
    handleEditClick(editInfo) {
      this.form = { ...editInfo };
      this.dialogFormVisible = true;
    },
    //提交编辑
    handleFormUpload() {
      //根据接口格式上传数据
      let arr = [...this.data];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === this.form.id) {
          arr[i] = this.form;
        }
      }
      setBanner(arr).then((res) => {
        this.dialogFormVisible = false;
        this.$message({
          message: "图片上传成功",
          type: "success",
        });
        this.fetchData();
      });
    },
  },
};
</script>

<style>
</style>