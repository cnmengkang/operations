<template>
  <div class="table-charts">
    <div class="table-charts-header">
      <h2 class="title">{{ props.title }}</h2>
    </div>
    <div class="table-charts-container flex flex-wrap">
      <div class="left-table card w-100">
        <table>
          <thead>
            <tr>
              <th :colspan="chartTitle.length + 1">{{ props.chartTitle }}</th>
            </tr>
            <tr>
              <th></th>
              <th v-for="item in tlTitle">{{ item }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in props.chartData" :key="index">
              <td>{{ item.title }}</td>
              <td>{{ item.use_counts[0] }}</td>
              <td>{{ item.use_counts[1] }}</td>
              <td>{{ item.use_counts[2] }}</td>
              <td>{{ item.use_counts[3] }}</td>
              <td>{{ item.use_counts[4] }}</td>
              <td v-if="item.use_counts && item.use_counts.length > 5">
                {{ item.use_counts[5] }}
              </td>
              <td v-if="item.use_counts && item.use_counts.length > 6">
                {{ item.use_counts[6] }}
              </td>
              <td v-if="item.use_counts && item.use_counts.length > 7">
                {{ item.use_counts[7] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="right-charts card w-100">
        <a-select
          v-model:value="selectedValues"
          mode="multiple"
          size="large"
          style="width: 100%; margin-bottom: 20px"
          placement="topRight"
          placeholder="请选择需要展示的数据"
          option-label-prop="children"
          @select="handleSelect"
          :allowClear="true"
          :dropdown-match-select-width="false"
          @deselect="handleDeselect"
          :options="defOptions"
        >
          <template #option="{ value: val, label, icon }">
            <span role="img" :aria-label="val">{{ icon }}</span>
            {{ label }}
          </template>
          <template #tagRender="{ label, closable, onClose }">
            <a-tag :closable="closable" @close="onClose">
              {{ label }}
            </a-tag>
          </template>
        </a-select>
        <div :id="props.class" style="height: 600px"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/index";
let store = useStore();
import { ref, onMounted, onBeforeUnmount, watch, PropType } from "vue";
import { newEcharts, chartResize } from "@/utils/echarts/echartsUtils.ts";
let charts = newEcharts();
let selectedValues: any = ref([]);
let defOptions: any = ref([]);
let intData: any = ref([]);
let el: any = ref(null);
let resizeHandler: (() => void) | null = null;
interface DataItem {
  use_counts: number[];
  title: number;
}
let props = defineProps({
  title: {
    type: String,
    required: true,
  },
  tableTitle: {
    type: String,
    required: true,
  },
  chartTitle: {
    type: String,
    required: true,
  },
  tlTitle: {
    type: String,
    required: true,
  },
  chartData: {
    type: Array as PropType<DataItem[]>,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
});
onMounted(() => {
  el.value = charts.initChart(document.querySelector(`#${props.class}`));
  if (el.value) {
    intData.value = props.chartData;
    renderChartData();
    resizeHandler = chartResize(charts);
    window.addEventListener("resize", resizeHandler);
  }
});
// 更新选择数据
let handleSelect = (_: any, option: any) => {
  charts.updateChart(option.label, intData.value);
};
// 移除数据
let handleDeselect = (_: any, option: any) => {
  charts.removeSeries(option.label);
};
// 初始化数据
let renderChartData = () => {
  const filteredData = intData.value.filter(
    (item: any) => item.title !== "合计"
  );
  const totalData = intData.value.filter((item: any) => item.title === "合计");

  // 构建下拉框选项列表
  defOptions.value = [
    ...filteredData.map((item: any) => ({
      value: item.title,
      label: item.title,
    })),
    { value: "合计", label: "合计" }, // “合计”项
  ];
  selectedValues.value = [defOptions.value[defOptions.value.length - 1].value];
  let selectedItem = filteredData.find(
    (item: any) => item.title === selectedValues.value[0]
  );
  let seriesData: any = [];
  if (selectedItem) {
    seriesData = [
      {
        type: "line",
        name: selectedItem.title,
        data: selectedItem.use_counts,
        label: {
          show: true,
          position: "top",
        },
        barGap: "30%",
        barCategoryGap: "20%",
      },
    ];
  } else if (selectedValues.value[0] === "合计" && totalData.length > 0) {
    seriesData = [
      {
        type: "line",
        name: "合计",
        data: totalData[0].use_counts,
        label: {
          show: true,
          position: "top",
        },
        barGap: "30%",
        barCategoryGap: "20%",
      },
    ];
  }
  let obj = {
    series: seriesData,
    xAxis: {
      type: "category",
      data: props.tlTitle,
    },
  };
  charts.renderChart("line", obj, props.chartTitle); //初始化数据
};

watch(
  () => store.isCollapse,
  () => {
    resizeHandler?.();
  }
);
onBeforeUnmount(() => {
  if (resizeHandler) {
    window.addEventListener("resize", resizeHandler);
  }
  charts.disposeChart();
});
</script>
