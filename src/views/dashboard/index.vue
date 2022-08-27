<template>
  <div class="app-container">
    <div id="echarts"></div>
  </div>
</template>

<script>
import { getProject } from "@/api/project";
import { getBlogList } from "@/api/blog";
import { getMessage } from "@/api/message";
export default {
  mounted() {
    this.echartsInit();
  },
  methods: {
    //图表
    async echartsInit() {
      let projectCount = await getProject().then((res) => {
        if (!res.code && res.data) {
          return res.data.length;
        }
      });
      let blogCount = await getBlogList().then((res) => {
        if (!res.code && res.data) {
          return res.data.total;
        }
      });
      let messageCount = await getMessage().then((res) => {
        if (!res.code && res.data) {
          return res.data.total;
        }
      });
      this.$echarts.init(document.getElementById("echarts")).setOption({
        xAxis: {
          type: "category",
          data: ["总项目数", "总文章数", "留言数"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [
              {
                value: projectCount,
                itemStyle: {
                  color: "#304156",
                },
              },
              {
                value: blogCount,
                itemStyle: {
                  color: "#304156",
                },
              },
              {
                value: messageCount,
                itemStyle: {
                  color: "#304156",
                },
              },
            ],
            type: "bar",
          },
        ],
      });
    },
  },
};
</script>


<style lang="scss" scoped>
#echarts {
  width: 500px;
  height: 500px;
}
</style>
