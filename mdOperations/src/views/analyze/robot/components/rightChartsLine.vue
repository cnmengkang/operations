<template>
    <div class="table-charts">
        <div class="table-charts-header">
            <h2 class="title">{{ props.title }}</h2>
        </div>
        <div class="table-charts-container flex flex-wrap">
            <div class="right-charts card w-100">
                <div :id="props.class" style="height: 600px"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/index";
let store = useStore();
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { newEcharts, chartResize } from "@/utils/echarts/echartsUtils.ts";
let charts = newEcharts();
let intData: any = ref([]);
let el: any = ref(null);
let resizeHandler: (() => void) | null = null;
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
        required: true,
    },
    cTitle: {
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

// 初始化数据
let renderChartData = () => {
    let obj: any = {
        yAxis: {
            type: "value",
        },
        xAxis: {
            type: "category",
            data: props.chartTitle,
        },
        series: [
            {
                type: "line",
                name: "",
                label: {
                    show: true,
                    position: "right",
                },
                data: props.chartData,
            },
        ],
    };
    charts.renderChart("line", obj, props.cTitle); //初始化数据
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