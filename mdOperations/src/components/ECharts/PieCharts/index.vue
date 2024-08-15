<template>
  <div ref="chartContainer" class="el-user-bar-charts charts card"></div>
  <a-modal
    v-model:open="store.showModal"
    width="80%"
    title="客户端下载信息"
    :footer="null"
  >
    <div
      ref="chartDownInfo"
      class="el-user-bar-charts charts"
      style="min-height: 500px"
    ></div>
  </a-modal>
</template>
<script setup lang="ts">
import { useStore } from "@/store/index";
import { debounce } from "lodash";
import { getUseDayAlive, getUseDownInfo } from "@/api/index";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import EChartsHandler, { EChartOptions } from "@/utils/ECharts";
const chartContainer = ref<HTMLElement | null>(null);
const chartDownInfo = ref<HTMLElement | null>(null);
let eChartsHandler: EChartsHandler | null = null;
let eChartsDownInfo: EChartsHandler | null = null;
const store = useStore();

onMounted(() => {
  getInitDayAlive();
  window.addEventListener("resize", chartResize);
});

watch(
  () => store.showModal,
  (newValue: any) => {
    if (newValue) {
      getInitDownInfo();
    }
  }
);
// 客户端下载量数据
const getInitDownInfo = async () => {
  const { data } = await getUseDownInfo({ start_date: d()[0], end_data: d()[1] });
  const options: EChartOptions = { type: "lineDown", data: data };
  eChartsDownInfo = new EChartsHandler(chartDownInfo);
  eChartsDownInfo.renderChart(options);
};

// 饼图数据
const getInitDayAlive = async () => {
  let [r] = (await getUseDayAlive({ start_date: null, end_data: null }))
    .client_active_info;
  let arr = [
    { value: r.use_num, name: "使用客户数" },
    { value: r.connect_num, name: "连接客户端次数" },
  ];
  const options: EChartOptions = { type: "pie", data: arr };
  eChartsHandler = new EChartsHandler(chartContainer);
  eChartsHandler.renderChart(options);
};

const chartResize = debounce(() => {
  eChartsHandler?.resizeChart();
  eChartsDownInfo?.resizeChart();
}, 300);
watch(
  () => store.isCollapse,
  () => {
    chartResize();
  }
);
onBeforeUnmount(() => {
  window.removeEventListener("resize", chartResize);
});

const d = () => {
  // 获取当前日期
  const currentDate = new Date();
  // 初始化日期数组
  const dates = [];
  // 循环6次，每次减去一天（不包括当前日期）
  for (let i = 1; i <= 7; i++) {
    // 创建一个新日期对象，避免修改 currentDate
    const tempDate = new Date(currentDate);
    // 设置日期为当前日期减去 i 天
    tempDate.setDate(currentDate.getDate() - i);
    // 格式化日期为 YYYY-MM-DD
    const formattedDate = tempDate.toISOString().split("T")[0];
    // 将格式化后的日期添加到数组中
    dates.push(formattedDate);
  }
  let s = dates[0];
  let d = dates[dates.length - 1];
  return [d, s];
};
</script>
