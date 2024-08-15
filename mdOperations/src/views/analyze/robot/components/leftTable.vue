<template>
    <div class="table-charts" v-if="dayData.length > 0">
        <div class="table-charts-header">
            <h2 class="title">{{ props.title }}</h2>
        </div>
        <div class="table-charts-container flex">
            <div class="left-table w-100 card">
                <table>
                    <thead>
                        <tr>
                            <th colspan="7">{{ props.chartTitle }}</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th colspan="2">{{ dayData[0].name }}</th>
                            <th colspan="2">{{ dayData[2].name }}</th>
                            <th colspan="2">{{ dayData[3].name }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th rowspan="6">类型</th>
                            <th colspan="2">{{ dayData[1].name }}</th>
                            <th colspan="2">{{ dayData[1].value[0].value }}</th>
                            <th colspan="2">{{ dayData[1].value[1].value }}%</th>
                        </tr>
                        <tr>
                            <th colspan="2">{{ dayData[4].name }}</th>
                            <th colspan="2">{{ dayData[4].value[0].value }}</th>
                            <th colspan="2">{{ dayData[4].value[1].value }}%</th>
                        </tr>
                        <tr>
                            <th rowspan="4">未解决</th>
                            <th>未选择</th>
                            <th rowspan="4">{{ dayData[7].value[4].value }}</th>
                            <th>{{ dayData[7].value[0].value[0].value }}</th>
                            <th rowspan="4">{{ dayData[7].value[5].value }}%</th>
                            <th>{{ dayData[7].value[0].value[1].value }}%</th>
                        </tr>
                        <tr>
                            <th>答非所问</th>
                            <th>{{ dayData[7].value[1].value[0].value }}</th>
                            <th>{{ dayData[7].value[1].value[1].value }}%</th>
                        </tr>
                        <tr>
                            <th>方案太复杂</th>
                            <th>{{ dayData[7].value[2].value[0].value }}</th>
                            <th>{{ dayData[7].value[2].value[1].value }}%</th>
                        </tr>
                        <tr>
                            <th>未解决问题</th>
                            <th>{{ dayData[7].value[3].value[0].value }}</th>
                            <th>{{ dayData[7].value[3].value[1].value }}%</th>
                        </tr>
                        <tr>
                            <th rowspan="2">转人工</th>
                            <th colspan="2">点击人工入口</th>
                            <th colspan="5">{{ dayData[23].value }}</th>
                        </tr>
                        <tr>
                            <th colspan="2">问题咨询入口</th>
                            <th colspan="5">{{ dayData[24].value }}</th>
                        </tr>
                        <tr>
                            <th colspan="3">问答次数</th>
                            <th colspan="6">{{ dayData[25].value }}</th>
                        </tr>
                        <tr>
                            <th colspan="3">会话人数</th>
                            <th colspan="6">{{ dayData[26].value }}</th>
                        </tr>
                        <tr>
                            <th colspan="3">分流率[(会话人数-转人工)/会话人数]</th>
                            <th colspan="7">{{ dayData[27].value }}%</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref } from "vue";
let dayData: any = ref([]);
interface DataItem {
    name: string;
    value: number;
}
let props = defineProps({
    chartTitle: {
        type: String,
        required: true,
    },
    chartData: {
        type: Array as PropType<DataItem[]>,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
});
onMounted(() => {
    dayData.value = props.chartData;
});
</script>
<style scoped lang="scss">
.table-charts{
    .table-charts-container{
        .left-table{
            table{
                tbody{
                    th,td{
                        min-width: 100px;
                    }
                }
            }
        }
    }
}
</style>

