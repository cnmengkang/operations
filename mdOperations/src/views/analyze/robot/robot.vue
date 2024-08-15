<template>
    <div class="analysis">
        <div class="day_week flex" v-if="dayData.length > 0">
            <div class="table_day">
                <leftTable title="日报表" chartTitle="机器人日使用情况表" :chartData="dayData" />
            </div>
            <div class="table_week">
                <leftTable title="周报表" chartTitle="机器人周使用情况表" :chartData="weekData" />
            </div>
        </div>
        <div class="rang_30" v-if="rang30Data.length > 0">
            <rightCharts :chartTitle="rang30Title" :chartData="rang30Data" class="rang" title="月报" />
        </div>
        <div class="week" v-if="weekFuncTrend.length > 0">
            <rightChartsLine class="robotWeek" :chartTitle="weekInterVal" :chartData="weekFuncTrend" cTitle="分流率周趋势图"
                title="周趋势" />
        </div>
        <div class="month" v-if="monthData.length > 0">
            <rightChartsLine class="robotMonth" :chartTitle="monthTitle" :chartData="monthData" cTitle="分流率月趋势图"
                title="月趋势" />
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getRobotAnalyze, type DateParams } from "@/api/aiAnalyze";
import leftTable from "./components/leftTable.vue";
import rightCharts from "./components/rightCharts.vue";
import rightChartsLine from "./components/rightChartsLine.vue";
let dayData: any = ref([]);
let weekData: any = ref([]);
let monthTitle: any = ref([]);
let monthData: any = ref([]);
let rang30Title: any = ref([])
let rang30Data: any = ref([])
let weekInterVal: any = ref([])
let weekFuncTrend: any = ref([])
let params: DateParams = {
    start_date: null,
    end_data: null,
};

onMounted(() => {
    getLoading();

})
let getLoading = async () => {
    let result = await getRobotAnalyze(params);
    console.log('🎣', result)
    dayData.value = flattenNodes(result.day[0].value);
    weekData.value = flattenNodes(result.week[0].value);
    rang30Title.value = result.range_30_days;
    rang30Data.value = result.range_30_info;
    monthTitle.value = result.month_interval;
    monthData.value = result.month_func_trend;
    weekInterVal.value = result.week_interval;
    weekFuncTrend.value = result.week_func_trend;
}

interface Node {
    name: string;
    value: Node[] | number;
}

function flattenNodes(nodes: Node[]): Node[] {
    const flattenedNodes: Node[] = [];
    function flatten(node: Node) {
        flattenedNodes.push({ name: node.name, value: node.value });
        if (Array.isArray(node.value)) {
            node.value.forEach((child) => flatten(child));
        }
    }
    nodes.forEach((node) => flatten(node));
    return flattenedNodes;
}
</script>
<style scoped>
.table_day,
.table_week {
    width: 50%;
}
</style>
