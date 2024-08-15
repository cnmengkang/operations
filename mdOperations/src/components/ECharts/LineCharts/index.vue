<template>
  <div class="card h-100">
    <div class="head-right mb-15">
      <a-radio-group
        size="small"
        @change="handleClickSwitch(defaultValue)"
        option-type="button"
        button-style="solid"
        v-model:value="defaultValue"
      >
        <a-radio-button value="retention_1_rate">次日</a-radio-button>
        <a-radio-button value="retention_7_rate">7日</a-radio-button>
        <a-radio-button value="retention_30_rate">30日</a-radio-button>
      </a-radio-group>
    </div>
    <div class="head-time text-center">
      <div class="export pointer">
        <a-select
          ref="select"
          v-model:value="downSelectValue"
          style="width: 100px"
          :options="selectOptions"
          @change="handleChange"
        >
        </a-select>
      </div>
      <template v-show="showBtn">日期</template>
    </div>
    <div ref="lineChart" class="el-line-charts"></div>
  </div>
</template>
<script setup lang="ts">
import { getUseRetentionRate } from "@/api/index.ts";
import { debounce } from "lodash";
import { useStore } from "@/store/index";
import { ref, onMounted, onBeforeUnmount,watch } from "vue";
import type { SelectProps } from "ant-design-vue";
import EChartsHandler, { EChartOptions } from "@/utils/ECharts";
let defaultValue: any = ref("retention_1_rate");
let downSelectValue = ref<any>("全部");
let showBtn: any = ref(false);
const store = useStore();
const lineChart: any = ref<HTMLElement | null>(null);
let eChartsHandler: EChartsHandler | null = null;
let options: any = ref([]);
const selectOptions = ref<SelectProps["options"]>([]);


onMounted(() => {
  getInitLoading();
  window.addEventListener("resize", chartResize);
});


// 初始化
let getInitLoading = async () => {
  let r = await getUseRetentionRate({ start_date: null, end_data: null });
  options.value = r;
  selectOptions.value = selectValue(r[r.length - 1].device);
  let m: any = merge(t(r), n(r, downSelectValue.value, defaultValue.value));
  getLineLoading(m);
};

// 初始化加载折线图
const getLineLoading = (d: any) => {
  let opt: EChartOptions = {
    type: "line",
    data: d,
  };
  eChartsHandler = new EChartsHandler(lineChart);
  eChartsHandler.renderChart(opt);
};

// 切换 7日 30日
let handleClickSwitch = (d: any) => {
  defaultValue.value = d;
  let m: any = merge(t(options.value),n(options.value, downSelectValue.value, defaultValue.value)
  );
  getLineLoading(m);
};

// 合并数据
const merge = (n: any, v: any) => {
  return n.map((name: any, index: any) => {
    return {
      ...name,
      ...v[index],
    };
  });
};
// 点击选中下拉数据
const handleChange = (a: string) => {
  downSelectValue.value = a;
  let m: any = merge(
    t(options.value),
    n(options.value, downSelectValue.value, defaultValue.value)
  );
  getLineLoading(m);
};
// 根据name名称获取对应数据
const n = (d: any, n: any, r: string) => {
  return d.reduce((acc: any, i: any) => {
    // 遍历每个对象的 value 数组
    const match = i.value.find((v: any) => v.name === n);
    if (match) {
      acc.push({ value: match[r] } || {}); // 如果找到匹配对象，推入相应字段的值
    } else {
      acc.push({ value: "0%" }); // 如果没有找到匹配对象，推入空对象
    }
    return acc;
  }, []);
};
// 处理下拉框数据
const selectValue = (s: any) => s.map((i: any) => ({ value: i, label: i }));
// 处理日期
const t = (d: any) => d.map((l: any) => ({ name: l.title.split("-")[2] }));


const chartResize = debounce(() => {
  eChartsHandler?.resizeChart();
}, 300);

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
<style scoped>
.el-line-charts {
  height: calc(100% - 71px);
}
.head-right {
  text-align: right;
}
</style>
