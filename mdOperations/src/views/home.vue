<template>
    <!-- 第一行 -->
    <div class="chart-content">
        <div class="chart-one">
            <div class="charts-item">
                <ModuleItem icons="images/u781.svg" title="设备新增激活数量" :loading="initLoading">
                    <div :ref="AddActivation.container" class="chart-container charts card"></div>
                </ModuleItem>
            </div>
            <div class="charts-item">
                <ModuleItem icons="images/u782.svg" title="AI功能使用次数" :loading="initLoading">
                    <div :ref="AiUseAgeTimers.container" class="charts card"></div>
                </ModuleItem>
            </div>
            <div class="charts-item">
                <ModuleItem icons="images/u778.svg" title="基础功能使用次数" :loading="initLoading">
                    <div :ref="BasicFunction.container" class="charts card"></div>
                </ModuleItem>
            </div>
            <div class="charts-item">
                <ModuleItem icons="images/u781.svg" title="AI功能token量" :loading="initLoading">
                    <div :ref="AiTokenFunction.container" class="charts card"></div>
                </ModuleItem>
            </div>
            <!-- =============== -->
            <div class="charts-item charts-box">
                <div class="top items">
                    <ModuleItem icons="images/u228.svg" title="客户端日活（次）" :loading="initLoading">
                        <pieCharts />
                    </ModuleItem>
                </div>
                <div class="bottom items">
                    <ModuleItem icons="images/u228.svg" title="留存率（%）" :loading="initLoading">
                        <lineCharts />
                    </ModuleItem>
                </div>
            </div>
            <div class="charts-item charts-box">
                <div class="top items">
                    <ModuleItem icons="images/u228.svg" title="用户活跃（人）" :loading="initLoading">
                        <userCharts></userCharts>
                    </ModuleItem>
                </div>
                <div class="bottom items">
                    <ModuleItem icons="images/u228.svg" title="平均日活率（%）" :loading="initLoading">
                        <userTable></userTable>
                    </ModuleItem>
                </div>
            </div>
            <div class="charts-item charts-last">
                <ModuleItem icons="images/u228.svg" title="各系统用户日使用情况表" :loading="initLoading">
                    <div :ref="UseSystem.container" class="charts card"></div>
                </ModuleItem>
            </div>
        </div>
    </div>
    <!-- ================================= -->
    <!-- 弹窗 -->
    <chart-modal v-model:open="chartsOpen.open" :type="chartsOpen.type" :category="chartsOpen.category" />
</template>

<script setup lang="ts">
import {
    getAddActivation,
    getAiUseAgeTimers,
    getBasicFunction,
    getAiTokenFunction,
    getUseSystem,
    getAddWeekTable,
    getAiWeekTable,
    getBasicWeekTable,
    getAddMonthTable,
    getAiMonthTable,
    getBasicMonthTable,
    getAiTokenWeekTable,
    type DateParams,
} from "@/api/index";
import { debounce } from "lodash";
import { useStore } from "@/store/index";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import userCharts from "@/components/ECharts/UserCharts/index.vue";
import userTable from "@/components/ECharts/UserTable/index.vue";
import pieCharts from "@/components/ECharts/PieCharts/index.vue";
import lineCharts from "@/components/ECharts/LineCharts/index.vue";
import chartModal from "@/components/chartModal/index.vue"; //弹出详情
import useChartModal from "@/components/chartModal/index.ts";
import useOpenRank from "@/utils/options";
const store = useStore();
const chartsOpen: any = useChartModal();
const AddActivation: any = useOpenRank({
    showHandler: chartsOpen.changeOpen,
    type: 1,
    category: "add",
});
const AiUseAgeTimers: any = useOpenRank({
    showHandler: chartsOpen.changeOpen,
    type: 2,
    category: "use_count",
});
const BasicFunction: any = useOpenRank({
    showHandler: chartsOpen.changeOpen,
    type: 3,
    category: "use_count",
});
const AiTokenFunction: any = useOpenRank({
    showHandler: chartsOpen.changeOpen,
    type: 4,
    category: "use_token",
});
const UseSystem: any = useOpenRank({
    showHandler: chartsOpen.changeOpen,
    type: 5,
    category: "add_users",
});
const initLoading = ref<boolean>(false); //加载loading
// 初始化
onMounted(() => {
    getDeviceActivation();
    window.addEventListener("resize", chartResize);
});

// 设备激活数量
let getDeviceActivation = async () => {
    initLoading.value = true;
    let params: DateParams = {
        start_date: null,
        end_data: null,
    };
    await Promise.all([
        getAddActivation(params), //新增激活
        getAiUseAgeTimers(params), //AI使用次数
        getBasicFunction(params), //AI使用次数
        getAiTokenFunction(params), //AI使用次数
        getUseSystem(params), //AI使用次数
        // 周报趋势图
        getAddWeekTable(params),
        getAiWeekTable(params),
        getBasicWeekTable(params),
        getAiTokenWeekTable(params),
        // 月趋势图
        getAddMonthTable(params),
        getAiMonthTable(params),
        getBasicMonthTable(params),
    ]);
    AddActivation.chart.initChart("Add", "add", true);
    AiUseAgeTimers.chart.initChart("Ai", "use_count", true);
    BasicFunction.chart.initChart("Basic", "use_count", true);
    AiTokenFunction.chart.initChart("AiToken", "use_token", true);
    UseSystem.chart.initChart("UseSys", "add_users", true);
    initLoading.value = false;
};

// 检测尺寸变化
const chartResize = debounce(() => {
    AddActivation.chart.resizeChart();
    AiUseAgeTimers.chart.resizeChart();
    BasicFunction.chart.resizeChart();
    AiTokenFunction.chart.resizeChart();
    UseSystem.chart.resizeChart();
}, 300);

// 销毁Echart 实例
const chartDestroy = () => {
    AddActivation.chart.destroyChart();
    AiUseAgeTimers.chart.destroyChart();
    BasicFunction.chart.destroyChart();
    AiTokenFunction.chart.destroyChart();
    UseSystem.chart.destroyChart();
};
// 销毁尺寸变化事件
onBeforeUnmount(() => {
    window.removeEventListener("resize", chartResize);
    chartDestroy();
});

watch(
    () => store.isCollapse,
    () => {
        chartResize();
    }
);
</script>
<style scoped lang="scss">
.chart-content {
    height: calc(100% - 10px);
    display: flex;

    .chart-one {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        gap:10px;

        .charts-item {
            width: calc(33.33% - 10px);
            height: calc(100% - 50%);
            box-sizing: border-box;
            // padding: 5px;
        }
        .charts-item:nth-child(3){
            width: 33.33%;
        }

        .charts-box {
            width: calc(22.22% - 10px);
            display: flex;
            flex-wrap: wrap;

            .top {
                margin-bottom: 10px;
            }

            .items {
                width: 100%;
                height: calc(100% - 50% - 5px);
            }
        }

        .charts-last {
            width: 22.22%;
        }
    }
}

@media (max-width: 576px) {
    .charts-item {
        width: 100% !important;
        min-height: 50%;
        max-height: 50%;
    }
}
</style>
