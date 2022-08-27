<template>
  <div class="app-container">
    <!-- 文章列表 -->
    <el-table
      :data="data.rows"
      border
      style="width: 100%"
      v-loading="blogLoading"
    >
      <el-table-column prop="data" label="序号" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.$index + (currentPage - 1) * eachPage + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="文章标题" width="150" align="center">
        <template slot-scope="scope">
          <!-- 预览图 -->
          <el-popover
            placement="top-start"
            title="图片预览"
            width="150"
            trigger="hover"
          >
            <el-image
              style="width: 130px"
              :src="scope.row.thumb"
              fit="cover"
              :preview-src-list="srcList"
            ></el-image>
            <a
              href="#"
              target="_blank"
              @click.prevent="toBlogDetail(scope.row)"
              slot="reference"
              >{{ scope.row.title }}</a
            >
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="description" label="文章描述" align="center">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>

      <el-table-column
        prop="scanNumber"
        label="浏览数"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.scanNumber }}
        </template>
      </el-table-column>

      <el-table-column
        prop="commentNumber"
        label="评论"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.commentNumber }}
        </template>
      </el-table-column>

      <el-table-column
        prop="category"
        label="所属分类"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          {{
            scope.row.category === null ? "未分类" : scope.row.category.order
          }}
        </template>
      </el-table-column>

      <el-table-column prop="createDate" label="创建日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
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
              @click="handleEditClick(scope.row.id)"
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
              @click="handleBlogdel(scope.row.id)"
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
import { getBlogList, delOneBlog } from "@/api/blog";
import formatDate from "@/utils/formatDate";
import { serverURL, clientURL } from "@/utils/server_URL";

export default {
  data() {
    return {
      data: {},
      srcList: [],
      currentPage: 1, //当前页
      count: 0, //总数据
      totalPage: 0, //总页数
      eachPage: 5, //页容量
      blogLoading: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
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
    //根据Id跳转到编辑页面
    handleEditClick(id) {
      this.$router.push({
        name: "EditBlog",
        params: {
          id,
        },
      });
    },
    //删除单个文章
    handleBlogdel(id) {
      this.$confirm(
        "删除此文章，此文章下面的评论也一并删除, 是否继续?",
        "是否删除此文章",
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
          delOneBlog(id).then(() => {
            //删除文章后重新获取文章列表数据
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
    //跳转到文章详情
    toBlogDetail(blogInfo) {
      window.open(`${clientURL}/blog/${blogInfo.id}`);
    },
    formatDate,
    //获取文章列表数据
    fetchData() {
      this.blogLoading = true;
      getBlogList(this.currentPage, this.eachPage).then((res) => {
        this.blogLoading = false;
        if (!res.code && res.data) {
          this.data = res.data;
          for (let i of this.data.rows) {
            i.createDate = formatDate(i.createDate);
            i.thumb = `${serverURL}${i.thumb}`;
            this.srcList.push(i.thumb);
          }
          this.count = this.data.total;
          this.totalPage = Math.ceil(this.count / this.eachPage);
          //如果如果删除数据后，当前页大于总页数，返回最大页码并重新获取数据
          if (this.currentPage > this.totalPage) {
            this.currentPage = this.count;
            this.fetchData();
          }
        }
      });
    },
  },
};
</script>

<style>
</style>