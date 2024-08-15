<template>
    <div class="loading" v-if="initLoading">
        <LoadingOutlined :style="{ fontSize: '50px' }" />
    </div>
    <div class="analysis" v-else>
        <div class="day" v-if="dayData.length > 0">
            <tableCharts title="日报" tableTitle="各设备日截图使用情况表" chartTitle="各设备日截图使用趋势图" type="ocr" class="ocr_day"
                :chartData="dayData" keys="day_title" />
        </div>
        <div class="week" v-if="weekData.length > 0">
            <tableCharts tableTitle="各设备周截图使用情况表" chartTitle="各设备周截图使用趋势图" type="ocr" title="周报" class="ocr_week"
                :chartData="weekData" keys="week_title" />
        </div>
        <div class="month" v-if="monthData.length > 0">
            <tableCharts tableTitle="各设备月截图使用情况表" chartTitle="各设备月截图使用趋势图" type="ocr" title="月报" class="ocr_month"
                :chartData="monthData" keys="month_title" />
        </div>
        <div class="weekFunc" v-if="weekFunc.length > 0">
            <tableChartsLine title="周走势图表" tableTitle="各设备周截图使用情况表" chartTitle="各设备周截图使用情况表" :tlTitle="weekTitle"
                type="ocr" class="ocr_weekFunc" :chartData="weekFunc" />
        </div>
        <div class="monthFunc" v-if="monthFunc.length > 0">
            <tableChartsLine title="月走势图表" tableTitle="各设备月截图使用情况表" chartTitle="各设备月截图使用情况表" :tlTitle="monthTitle"
                type="ocr" class="ocr_monthFunc" :chartData="monthFunc" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { LoadingOutlined } from "@ant-design/icons-vue";
import { getOcrAnalyze, type DateParams } from "@/api/aiAnalyze";
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
    let result = await getOcrAnalyze(params);
    dayData.value = result.day;
    weekData.value = result.week;
    monthData.value = result.month;
    weekTitle.value = result.week_interval;
    weekFunc.value = result.week_func_trend;
    monthTitle.value = result.month_interval;
    monthFunc.value = result.month_func_trend;
    processTableTitle("ocr", result)
    initLoading.value = false;
};
</script>
