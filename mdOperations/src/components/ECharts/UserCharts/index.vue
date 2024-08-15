<template>
  <div ref="chartContainer" class="el-user-bar-charts charts card"></div>
</template>
<script setup lang="ts">
import { debounce } from "lodash";
import { useStore } from "@/store/index";
import { ref, onMounted, watch, onBeforeUnmount } from "vue";
import EChartsHandler, { EChartOptions } from "@/utils/ECharts";
const chartContainer = ref<HTMLElement | null>(null);
let eChartsHandler: EChartsHandler | null = null;
const store = useStore();


onMounted(() => {
  handleAjaxData();
  window.addEventListener("resize", chartResize);
});
// 处理axios数据
let handleAjaxData = () => {
  let arr = [
    { value: 380, name: "两周活跃人数" },
    { value: 284, name: "两周未活跃人数" },
    { value: 300, name: "四周活跃人数" },
  ];
  renderChartData(arr);
};
// 渲染
let renderChartData = (arr: any) => {
  const options: EChartOptions = {
    type: "bar",
    data: arr.map((item: any) => ({ name: item.name, value: item.value })),
  };
  eChartsHandler = new EChartsHandler(chartContainer);
  eChartsHandler.renderChart(options);
};
const chartResize = debounce(() => {
  eChartsHandler?.resizeChart();
}, 500);

onBeforeUnmount(() => {
  window.removeEventListener("resize", chartResize);
});
watch(
  () => store.isCollapse,
  () => {
    chartResize();
  }
);
</script>
