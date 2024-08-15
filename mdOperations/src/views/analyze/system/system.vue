<template>
    <div class="loading" v-if="initLoading">
        <LoadingOutlined :style="{ fontSize: '50px' }" />
    </div>
    <div class="analysis" v-else>
        <div class="day" v-if="dayData.length > 0">
            <tableCharts title="日报" tableTitle="各系统用户日使用情况表" chartTitle="各系统日新增用户趋势图" type="system" class="system_day"
                :chartData="dayData" keys="day_title" />
        </div>
        <div class="week" v-if="weekData.length > 0">
            <tableCharts tableTitle="各系统用户周使用情况表" chartTitle="各系统周新增用户趋势图" type="system" title="周报" class="system_week"
                :chartData="weekData" keys="week_title" />
        </div>
        <div class="month" v-if="monthData.length > 0">
            <tableCharts tableTitle="各系统用户月使用情况表" chartTitle="各系统月新增用户趋势图" type="system" title="月报" class="system_month"
                :chartData="monthData" keys="month_title" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { LoadingOutlined } from "@ant-design/icons-vue";
import { getSystemAnalyze, type DateParams } from "@/api/aiAnalyze";
import { ref, onMounted } from "vue";
import tableCharts from "./tableCharts.vue";
import { processTableTitle } from '../components//tableTitle';
let initLoading = ref<boolean>(true); //加载loading
let dayData: any = ref([]);
let monthData: any = ref([]);
let weekData: any = ref([]);
let params: DateParams = {
    start_date: null,
    end_data: null,
};
// 初始化
onMounted(() => {
    getLoading();
});

let getLoading = async () => {
    let result = await getSystemAnalyze(params);
    dayData.value = result.day;
    monthData.value = result.month;
    weekData.value = result.week;
    processTableTitle('system', result)
    initLoading.value = false;
};
</script>
