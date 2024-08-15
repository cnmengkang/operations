<template>
    <div class="table-charts">
        <div class="table-charts-header">
            <h2 class="title">{{ props.title }}</h2>
        </div>
        <div class="table-charts-container flex">
            <div class="left-table card">
                <table>
                    <thead>
                        <tr>
                            <th :colspan="tTitle.length + 1">{{ props.tableTitle }}</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th v-for="item in tTitle" :key="item.id">{{ item.name }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in props.chartData" :key="index">
                            <td v-if="index === 0" :rowspan="props.chartData.length - 1">
                                {{ tableTitle[props.type]?.name }}
                            </td>
                            <td :colspan="item.title == '合计' ? 2 : 0">{{ item.title }}</td>
                            <td>{{ item.last_use_count }}</td>
                            <td>{{ item.this_use_count }}</td>
                            <td v-if="item.this_use_num || item.total_activation">
                                {{ item.this_use_num || item.total_activation }}
                            </td>
                            <td :class="{
                                increase: item.count_rate > 0,
                                decrease: item.count_rate < 0,
                            }">
                                {{ item.count_rate }}%
                            </td>
                            <td v-if="item.retention !== null && item.retention !== undefined" :class="{
                                increase: item.retention > 0,
                                decrease: item.retention < 0,
                            }">
                                {{ item.retention }}%
                            </td>
                            <td v-if="item.proportion">{{ item.proportion }}%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="right-charts card">
                <div :id="props.class" class="charts"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/index";
let store = useStore();
import { tableTitle } from "./tableTitle.ts";
import { onMounted, PropType, ref, onBeforeUnmount, watch } from "vue";
import { newEcharts, chartResize } from "@/utils/echarts/echartsUtils.ts";
let resizeHandler: (() => void) | null = null;
let tTitle: any = ref([]);
let charts = newEcharts();
let intData: any = ref([]);
let el: any = ref(null);
interface DataItem {
    name: string;
    title: string;
    this_use_count: number;
    this_use_num: number;
    last_use_count: number;
    total_activation: number;
    count_rate: number;
    retention: number;
    proportion: number;
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
    chartData: {
        type: Array as PropType<DataItem[]>,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    class: {
        type: String,
    },
    keys: {
        type: String,
        required: true,
    }
});
// 初始化
onMounted(() => {
    tTitle.value = tableTitle?.[props.type]?.[props.keys]
    el.value = charts.initChart(document.querySelector(`#${props.class}`));
    if (el.value) {
        intData.value = props.chartData;
        renderChartData();
        resizeHandler = chartResize(charts);
        window.addEventListener("resize", resizeHandler);
    }
});
// 初始化数据
let renderChartData = () => {
    let data: any = processing(props.chartData);
    let obj: echarts.EChartsOption = {
        yAxis: {
            type: "category",
            data: data.map((item: any) => item.title),
            axisTick: {
                show: false, // 隐藏 Y 轴刻度线
            },
        },
        series: [
            {
                type: "bar",
                label: {
                    show: true,
                    position: "right",
                },
                barGap: "40%",
                barCategoryGap: "90%", // 调整同一系列中不同类别之间的间距
                data: data.map((item: any) => item.value1),
            },
            {
                type: "bar",
                label: {
                    show: true,
                    position: "right",
                },
                barGap: "40%",
                barCategoryGap: "90%", // 调整同一系列中不同类别之间的间距
                data: data.map((item: any) => item.value2),
            },
        ],
    };
    charts.renderChart("bar", obj, props.chartTitle); //初始化数据
};

// 处理数据
let processing = (data: any) => {
    let obj: any = [];
    data.forEach((item: any) => {
        let title = item.title || item.sub_system;
        if (title && typeof title == "string" && !title.match(/合计/)) {
            obj.push({
                title: title,
                value1: item.this_use_count || item.last_add_users,
                value2: item.last_use_count || item.this_add_users,
            });
        }
    });
    return obj;
};

// 监听左侧菜单展开关闭状态，更新图表
watch(
    () => store.isCollapse,
    () => {
        resizeHandler?.();
    }
);
// 销毁
onBeforeUnmount(() => {
    if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
    }
    charts.disposeChart();
});
</script>
