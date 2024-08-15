<template>
    <div class="h-100 userTables card">
        <table>
            <tr>
                <td>时间</td>
                <td>上周</td>
                <td>本周</td>
                <td>增长率</td>
            </tr>
            <tbody>
                <tr>
                    <td>工作日</td>
                    <td>{{ tableData.last_last_work_day_count }}</td>
                    <td>{{ tableData.last_work_day_count }}</td>
                    <td>{{ tableData.work_day_rate }}</td>
                </tr>
                <tr>
                    <td>双休日</td>
                    <td>{{ tableData.last_last_weekend_break_count }}</td>
                    <td>{{ tableData.last_weekend_break_count }}</td>
                    <td>{{ tableData.weekend_break_rate }}</td>
                </tr>
                <tr>
                    <td>总数</td>
                    <td>{{ tableData.last_last_week_count }}</td>
                    <td>{{ tableData.last_week_count }}</td>
                    <td>{{ tableData.last_week_rate }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getUseDayAlive } from "@/api/index";
let tableData: any = ref([]);
onMounted(async () => {
    tableData.value = (await getUseDayAlive({ start_date: null, end_data: null })).avg_active_info;
});
</script>
<style scoped>
.userTables {
    padding-top: 50px;
}

table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
}

tr {
    vertical-align: middle;
}

td {
    border: 1px solid #000;
    padding: 5px;
    text-align: center;
    font-size: 14px;
    vertical-align: middle;
}

.title {
    font-size: 16px;
    color: #000;
    font-weight: bold;
    margin-bottom: 20px;
}
</style>
