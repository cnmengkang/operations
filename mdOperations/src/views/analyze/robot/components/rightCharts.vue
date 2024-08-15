<template>
    <div class="table-charts" v-if="props.chartData.length > 0">
        <div class="table-charts-header">
            <h2 class="title">{{ props.title }}</h2>
        </div>
        <div class="rightCharts card h-100">
            <div :id="props.class" class="charts" style="height: 500px;"></div>
        </div>
    </div>

</template>
<script setup lang="ts">
import { useStore } from "@/store/index";
let store = useStore();
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { newEcharts, chartResize } from "@/utils/echarts/echartsUtils.ts";
let resizeHandler: (() => void) | null = null;
let charts = newEcharts();
let intData: any = ref([]);
let el: any = ref(null);
let props = defineProps({
    title: {
        type: String,
        required: true,
    },
    chartTitle: {
        type: String,
        required: true,
    },
    chartData: {
        type: Array as any,
        required: true,
    },
    class: {
        type: String,
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

let renderChartData = () => {
    let obj: any = {
        xAxis: {
            type: "category",
            data: props.chartTitle,
        },
        grid: {
            top: "15%",
            left: "3%",
            right: "3%",
            bottom: "10%",
            containLabel: true,
        },
        yAxis: [
            {
                type: 'value',
                name: '未解决数',
                position: 'left',
                alignTicks: true,
                axisLine: {
                    show: true,
                },
                axisLabel: {
                    formatter: '{value} '
                }
            },
            {
                type: 'value',
                name: '未解决率',
                position: 'right',
                alignTicks: true,
                axisLine: {
                    show: true,
                },
                axisLabel: {
                    formatter: '{value} '
                }
            },

        ],
        series: [
            {
                name: '未解决数',
                type: 'line',
                data: intData.value.map((item: any) => item.un_resolve_count)
            },
            {
                name: '未解决率',
                type: 'line',
                yAxisIndex: 1,
                data: intData.value.map((item: any) => item.un_resolve_rate)
            }
        ],
    };
    charts.renderChart("line", obj, "未解决数&未解决率月度趋势图"); //初始化数据
};

watch(
    () => store.isCollapse,
    () => {
        resizeHandler?.();
    }
);

onBeforeUnmount(() => {
    if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
    }
    charts.disposeChart();
});
</script>
