<template>
    <div class="loading" v-if="initLoading">
        <LoadingOutlined :style="{ fontSize: '50px' }" />
    </div>
    <div class="analysis" v-else>
        <div class="day" v-if="dayData.length > 0">
            <tableCharts title="日报" tableTitle="各设备日激活情况表" chartTitle="各设备日新增激活趋势图" type="device" class="device_day"
                :chartData="dayData" keys="day_title" />
        </div>
        <div class="week" v-if="weekData.length > 0">
            <tableCharts tableTitle="各设备周激活情况表" chartTitle="各设备周新增激活趋势图" type="device" title="周报" class="device_week"
                :chartData="weekData" keys="week_title" />
        </div>
        <div class="month" v-if="monthData.length > 0">
            <tableCharts tableTitle="各设备月激活情况表" chartTitle="各设备月新增激活趋势图" type="device" title="月报" class="device_month"
                :chartData="monthData" keys="month_title" />
        </div>
        <div class="weekFunc" v-if="weekFunc.length > 0">
            <tableChartsLine title="周走势图表" tableTitle="各设备周激活情况表" chartTitle="各设备周新增激活趋势图" :tlTitle="weekTitle"
                type="device" class="device_weekFunc" :chartData="weekFunc" />
        </div>
        <div class="monthFunc" v-if="monthFunc.length > 0">
            <tableChartsLine title="月走势图表" tableTitle="各设备月激活情况表" chartTitle="各设备月新增激活趋势图" :tlTitle="monthTitle"
                type="device" class="device_monthFunc" :chartData="monthFunc" />
        </div>
        <div class="left-table" v-if="totalDevice.length > 0">
            <table>
                <thead>
                    <tr>
                        <th colspan="2">AI设备总激活数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in totalDevice">
                        <td>{{ item.title }}</td>
                        <td>{{ item.activation }}</td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LoadingOutlined } from "@ant-design/icons-vue";
import { getDeviceAnalyze, type DateParams } from "@/api/aiAnalyze";
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
let totalDevice: any = ref([]);
let params: DateParams = {
    start_date: null,
    end_data: null,
};
// 初始化
onMounted(() => {
    getLoading();
});
let getLoading = async () => {
    let result = await getDeviceAnalyze(params);
    dayData.value = result.day;
    monthData.value = result.month;
    weekData.value = result.week;
    weekTitle.value = result.week_interval;
    weekFunc.value = result.week_func_trend;
    monthTitle.value = result.month_interval;
    monthFunc.value = result.month_func_trend;
    totalDevice.value = result.ai_device_activation;
    processTableTitle("device", result)
    initLoading.value = false;
};
</script>
<style scoped lang="scss">
table {
    margin-top: 50px;

    tr:last-child {
        font-weight: bold;
        font-size: 18px;
    }

    tr {
        vertical-align: middle;
        transition: all 0.2s linear;
        cursor: pointer;

        &:hover {
            background-color: #eee;
        }
    }

    th,
    td {
        width: 150px;
        border: 1px solid #ccc;
        padding: var(--Table-padding);
        text-align: center;
        font-size: 14px;
        vertical-align: middle;
    }
}
</style>
