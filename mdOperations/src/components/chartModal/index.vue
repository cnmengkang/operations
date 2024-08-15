<template>
  <a-modal
    wrapClassName="chart-modal-wrap"
    width="80%"
    centered
    v-model:open="isShow"
    :footer="null"
  >
    <div class="chart-modal-header">
      <a-row
        class="mb-15"
        :gutter="[16, 16]"
        align="middle"
        justify="space-between"
      >
        <a-col :span="12">
          <div class="tabs">
            <ul class="tab-list">
              <li
                v-for="(tab, index) in buttons"
                :key="tab.name"
                :class="{ active: activeTab === index }"
                @click="handleUpdateActiveTab(index, tab)"
              >
                {{ tab.label }}
              </li>
            </ul>
          </div>
        </a-col>
        <a-col :span="6" class="text-right">
          <a-range-picker
            :locale="locale"
            v-if="timers"
            @change="handleClickTimers"
            v-model="times"
          />
        </a-col>
      </a-row>
    </div>
    <div class="chart-modal-content modalHeight">
      <a-select
        v-if="defShow"
        v-model:value="selectedValues"
        mode="multiple"
        size="large"
        showArrow
        style="width: 100%; margin-bottom: 20px"
        placement="topRight"
        placeholder="请选择需要展示的数据"
        option-label-prop="children"
        :allowClear="true"
        @select="handleSelect"
        @deselect="handleDeselect"
        :options="defOptions"
      >
        <template #option="{ value: val, label }">
          <span role="img" :aria-label="val"></span>
          {{ label }}
        </template>
        <template #tagRender="{ value: val, label, closable, onClose }">
          <a-tag
            :closable="closable"
            style="
              margin-right: 5px;
              margin-bottom: 5px;
              padding: 5px;
              font-size: #000;
              font-weight: bold;
              background-color: rgba(0, 0, 0, 0.06);
            "
            @close="onClose"
          >
            {{ label }}&nbsp;&nbsp;
            <span role="img" :aria-label="val"></span>
          </a-tag>
        </template>
      </a-select>
      <div
        v-show="weekTrend"
        :ref="charts[props.type].container"
        class="charts modalHeight"
      ></div>
      <tables
        v-if="!weekTrend"
        :category="type"
        :title="charts[props.type].title"
        :type="tabsKey"
      />
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import { ref, computed, watch, nextTick } from "vue";
import { generateCommonOptions } from "./options";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { getHtmlFontPX } from "@/utils/base";
import ThemeColor from "@/themeColor";
import Tables from "./table.vue";
import { debounce } from "lodash";
import { fetchData } from "../../utils/axios";
import useOpenRank from "@/utils/options";
import { intervalMap, processData } from "@/api/data";
const openRankChart: any = useOpenRank();
const times: any = ref(dayjs);
const buttons: any = ref([]);
const activeTab = ref(-1);
const type = ref<string>("");
const timers = ref<boolean>(true);
const weekTrend = ref<boolean>(true);
const defShow = ref<boolean>(false);
const selectedValues = ref([]);
const defOptions: any = ref([]);
const intData: any = ref([]); //数据源
const tabs = ref<any>("");
const url = ref<string>("");
const tabsKey = ref<string>("");
dayjs.locale("zh-cn");
// 接收父组件数据
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});
interface TabData {
  key: any;
  type: any;
  name: string;
  label: string;
  url: string;
  times: boolean;
}
// 顶部菜单
const handleUpdateActiveTab = (index: number, tab: TabData) => {
  tabsKey.value = tab.key;
  const chartRef = charts[props.type].data.chartRef.value;
  const curOptions = chartRef.getOption() || { series: [] };
  timers.value = tab.times;
  activeTab.value = index;
  if (curOptions) {
    renderingTable(tab);
    if (tab.type === "weekChart" || tab.type === "monthChart") {
      renderingWeekLine(curOptions, tab);
    } else {
      renderingTheChart(curOptions, tab);
    }
  }
};
// 多选
const handleSelect = (_: any, option: any) => {
  let label = option.label;
  const curOptions = charts[props.type].data.chartRef.value?.getOption();
  if (curOptions && Array.isArray(curOptions.series)) {
    let series: any = [];
    intData.value.forEach((item: any) => {
      if (item.name == label) {
        series.push({
          name: item.name,
          type: "line",
          data: item.value,
        });
      }
    });
    curOptions.series.push(...series);
    charts[props.type].data.chartRef.value?.setOption(curOptions, true);
  }
};
// 删除选择
const handleDeselect = (_: any, option: any) => {
  const label = option.label;
  const curOptions = charts[props.type].data.chartRef.value?.getOption();
  if (curOptions && Array.isArray(curOptions.series)) {
    curOptions.series = curOptions.series.filter(
      (item: any) => item.name !== label
    );
    charts[props.type].data.chartRef.value?.setOption(curOptions, true);
  }
};
// 折线图渲染
let renderingWeekLine = (curOptions: any, tab: any) => {
  intData.value = [];
  defOptions.value = [];
  intData.value = intervalMap[type.value][tab.key[1].key][0];
  intData.value.forEach((item: any) => {
    return defOptions.value.push({
      value: item.name,
      label: item.name,
    });
  });
  selectedValues.value = defOptions.value.map((option: any) => option.value);
  let option = {
    ...generateCommonOptions(),
    title: {
      text: charts[props.type].title,
    },
    yAxis: {
      type: "value",
    },
    xAxis: {
      type: "category",
      data: intervalMap[type.value][tab.key[0].key][0],
      axisLabel: {
        rotate: 45,
        fontSize: 12,
      },
    },
    series: intData.value.map((item: any) => ({
      name: item.name,
      type: "line",
      data: item.value,
    })),
  };
  curOptions = option;
  charts[props.type].data.chartRef.value?.setOption(curOptions, true);
  defShow.value = true;
};
// 展示表格
let renderingTable = (tab: any) => {
  defShow.value = false;
  if (tab.type === "weekTable" || tab.type === "monthTable") {
    weekTrend.value = false;
  } else {
    weekTrend.value = true;
  }
};
// 柱状图渲染
let renderingTheChart = (curOptions: any, tab: any) => {
  let option: any = null;
  // 多行渲染
  if (tab.type === "week" || tab.type === "month") {
    option = {
      ...generateCommonOptions(),
      title: {
        text: charts[props.type].title,
      },
      barWidth: "20%",
      yAxis: {
        type: "category",
        axisTick: { show: false },
        data: intervalMap[type.value].name,
      },
      xAxis: {
        type: "value",
        axisLabel: {
          fontSize: getHtmlFontPX(0.75),
          formatter: function (value: any) {
            return `${value >= 10000 ? value / 10000 + "万" : value}`;
          },
        },
        nameTextStyle: {
          fontSize: getHtmlFontPX(0.75),
        },
        splitLine: {
          lineStyle: {
            color: "#ccc",
          },
        },
      },
      series: tab.key.map((item: any) => ({
        name: item.name,
        type: "bar",
        label: { show: true, position: "right" },
        data: intervalMap[type.value][item.key],
      })),
    };
  } else {
    // 单行渲染
    url.value = intervalMap[type.value].url;
    tabs.value = tab;
    option = {
      ...generateCommonOptions(),
      title: {
        text: charts[props.type].title,
      },
      yAxis: {
        type: "category",
        axisTick: { show: false },
        data: intervalMap[type.value].name,
      },
      xAxis: {
        type: "value",
        axisLabel: {
          fontSize: getHtmlFontPX(0.75),
          formatter: function (value: any) {
            return `${value >= 10000 ? value / 10000 + "万" : value}`;
          },
        },
        nameTextStyle: {
          fontSize: getHtmlFontPX(0.75),
        },
        splitLine: {
          lineStyle: {
            color: "#ccc",
          },
        },
      },
      series: {
        type: "bar",
        label: { show: true, position: "right" },
        itemStyle: {
          color: ThemeColor.lineColor,
        },
        data: intervalMap[type.value][tab.key],
      },
    };
  }
  curOptions = option;
  charts[props.type].data.chartRef.value?.setOption(curOptions, true);
  defShow.value = false;
};
// 日期选择器
let handleClickTimers = async (_data: string, dateString: string) => {
  const response = await fetchData.post(url.value, {
    start_date: dateString[0],
    end_data: dateString[1],
  });
  processData(type.value, response.data);
  handleUpdateActiveTab(activeTab.value, tabs.value);
  window.addEventListener("resize", chartResize);
};
const charts: any = {
  1: {
    title: "设备新增激活数量",
    key: "add",
    data: openRankChart,
    container: openRankChart.container,
    type: "bar",
    category: "Add",
    times: true,
  },
  2: {
    title: "AI功能使用次数",
    key: "use_count",
    data: openRankChart,
    container: openRankChart.container,
    type: "bar",
    category: "Ai",
    times: true,
  },
  3: {
    title: "基础功能使用次数",
    key: "use_count",
    data: openRankChart,
    container: openRankChart.container,
    type: "bar",
    category: "Basic",
    times: true,
  },
  4: {
    title: "AI功能token量",
    key: "use_token",
    data: openRankChart,
    container: openRankChart.container,
    type: "bar",
    category: "AiToken",
    times: true,
  },
  5: {
    title: "各系统用户日使用情况表",
    key: "add_users",
    data: openRankChart,
    container: openRankChart.container,
    type: "bar",
    category: "UseSys",
    times: true,
  },
};
// 检测尺寸变化
const chartResize = debounce(() => {
  charts[props.type].data.chart.resizeChart();
}, 300);
// 监听弹框
watch(
  () => props.open,
  (value) => {
    initCharts(value);
  }
);
// 弹框初始化
let initCharts = (value: any) => {
  if (value) {
    nextTick(() => {
      times.value = [];
      type.value = charts[props.type].category;
      buttons.value = intervalMap[type.value].list;
      let tab = charts[props.type];
      charts[props.type].data.chart.initChart(type.value, props.category);
      handleUpdateActiveTab(0, tab);
      chartResize();
      window.addEventListener("resize", chartResize);
    });
  } else {
    charts[props.type].data.chartRef.value?.clear();
    charts[props.type].data.chart.destroyChart();
    window.removeEventListener("resize", chartResize);
  }
};
// 详情弹窗状态
const emit = defineEmits(["update:open", "ok"]);

const isShow = computed({
  get() {
    return props.open;
  },
  set(value) {
    emit("update:open", value);
  },
});
</script>
<style scoped>
.modal-title {
  font-size: 18px;
}

.chart-modal-header {
  margin-top: 30px;
}

.tabs {
  display: flex;
  flex-direction: column;
}

.tab-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 15px;
}

.tab-list li {
  padding: 5px 12px;
  cursor: pointer;
  border-radius: 10px;
  font-size: 14px;
  border: 2px solid transparent;
  background-color: #ccc;
}

.tab-list li.active {
  border: 2px solid #030f57;
  background-color: #030f57;
  color: #fff;
}

.modalHeight {
  min-height: 750px;
}
</style>
