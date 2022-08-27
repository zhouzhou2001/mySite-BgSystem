<template>
  <div class="app-container">
    <!-- 文章列表 -->
    <el-table
      :data="data.rows"
      border
      style="width: 100%"
      v-loading="conmentLoading"
    >
      <el-table-column prop="data" label="序号" width="50" align="center">
        <template slot-scope="scope">
          {{ scope.$index + (currentPage - 1) * eachPage + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="data" label="头像" width="75" align="center">
        <template slot-scope="scope">
          <el-avatar
            shape="square"
            size="small"
            :src="scope.row.avatar"
          ></el-avatar>
        </template>
      </el-table-column>

      <el-table-column prop="data" label="昵称" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>

      <el-table-column prop="data" label="留言内容" align="center">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>

      <el-table-column prop="data" label="留言日期" width="200" align="center">
        <template slot-scope="scope">
          {{ formatDate(scope.row.createDate) }}
        </template>
      </el-table-column>

      <el-table-column prop="data" label="操作" width="150" align="center">
        <template slot-scope="scope">
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
              @click="handledelmessage(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      style="margin: 30px"
      :page-sizes="[5, 10]"
      :page-size="eachPage"
      layout=" prev, pager, next,total, ->,sizes, jumper"
      :total="count"
      @size-change="handleSizeChange"
      @current-change="handleCurrentPage"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getMessage, delMessage } from "@/api/message";
import formatDate from "@/utils/formatDate";
import { serverURL } from "@/utils/server_URL";

export default {
  data() {
    return {
      data: {},
      currentPage: 1, //当前页
      count: 0, //总数据
      totalPage: 0, //总页数
      eachPage: 5, //页容量
      conmentLoading: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    //删除评论
    handledelmessage(id) {
      delMessage(id).then(() => {
        this.$message({
          type: "success",
          message: "删除评论成功",
        });
        this.fetchData();
      });
    },
    formatDate,
    //分页获取文章评论信息
    fetchData() {
      this.conmentLoading = true;
      getMessage(this.currentPage, this.eachPage).then((res) => {
        if (!res.code && res.data) {
          this.data = res.data;
          for (let i of this.data.rows) {
            i.avatar = serverURL + i.avatar;
          }
        }
        this.count = this.data.total;
        this.totalPage = Math.ceil(this.count / this.eachPage);
        //如果在删除当前页最后一个评论后跳转到最大页码并重新获取数据
        if (this.currentPage > this.totalPage) {
          this.currentpage = this.totalPage;
          this.fetchData();
        }
        this.conmentLoading = false;
      });
    },
    //分页相关事件
    handleSizeChange(siziNum) {
      this.eachPage = siziNum;
      this.fetchData();
    },
    handleCurrentPage(currentNum) {
      this.currentPage = currentNum;
      this.fetchData();
    },
    handlePrevClick() {
      this.currentPage -= 1;
      this.fetchData();
    },
    handleNextClick() {
      this.currentPage += 1;
      this.fetchData();
    },
  },
};
</script>

<style>
</style>