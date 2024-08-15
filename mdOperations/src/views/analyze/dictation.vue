<template>
    <div class="loading" v-if="initLoading">
        <LoadingOutlined :style="{ fontSize: '50px' }" />
    </div>
    <div class="analysis" v-else>
        <div class="day" v-if="dayData.length > 0">
            <tableCharts title="日报" tableTitle="各语种日听写使用情况表" chartTitle="各语种日听写使用趋势图" type="dictation"
                class="dictation_day" :chartData="dayData" keys="day_title" />
        </div>
        <div class="week" v-if="weekData.length > 0">
            <tableCharts tableTitle="各语种周听写使用情况表" chartTitle="各语种周听写使用趋势图" type="dictation" title="周报"
                class="dictation_week" :chartData="weekData" keys="week_title" />
        </div>
        <div class="month" v-if="monthData.length > 0">
            <tableCharts tableTitle="各语种月听写使用情况表" chartTitle="各语种月听写使用趋势图" type="dictation" title="月报"
                class="dictation_month" :chartData="monthData" keys="month_title" />
        </div>
        <div class="weekFunc" v-if="weekFunc.length > 0">
            <tableChartsLine title="周走势图表" tableTitle="各语种周听写使用情况表" chartTitle="各语种周听写使用趋势图" :tlTitle="weekTitle"
                type="dictation" class="dictation_weekFunc" :chartData="weekFunc" />
        </div>
        <div class="monthFunc" v-if="monthFunc.length > 0">
            <tableChartsLine title="月走势图表" tableTitle="各语种月听写使用情况表" chartTitle="各语种月听写使用趋势图" :tlTitle="monthTitle"
                type="dictation" class="dictation_monthFunc" :chartData="monthFunc" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { LoadingOutlined } from "@ant-design/icons-vue";
import { getDictationAnalyze, type DateParams } from "@/api/aiAnalyze";
import { ref, onMounted } from "vue";
import tableCharts from "./components/tableCharts.vue";
import tableChartsLine from "./components/tableChartsLine.vue";
import { processTableTitle } from './components/tableTitle';
let initLoading = ref<boolean>(true);
let dayData: any = ref([]);
let monthData: any = ref([]);
let weekData: any = ref([]);
let weekTitle: any = ref([]);
let weekFunc: any = ref([]);
let monthTitle: any = ref([]);
let monthFunc: any = ref([]);
let params: DateParams = {
    start_date: null,
    end_data: null,
};
// 初始化
onMounted(() => {
    getLoading();
});
let getLoading = async () => {
    let result = await getDictationAnalyze(params);
    dayData.value = result.day;
    monthData.value = result.month;
    weekData.value = result.week;
    weekTitle.value = result.week_interval;
    weekFunc.value = result.week_func_trend;
    monthTitle.value = result.month_interval;
    monthFunc.value = result.month_func_trend;
    processTableTitle("dictation", result)
    initLoading.value = false;
};
</script>
