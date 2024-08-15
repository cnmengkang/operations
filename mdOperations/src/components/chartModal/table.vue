<template>
  <a-button type="primary" @click="exportToExcel" class="export"
    >导出Excel</a-button
  >
  <div class="table-container">
    <table id="table">
      <tbody>
        <tr class="header">
          <th>日期</th>
          <th v-for="(week, index) in computedWeeks" :key="index">
            {{ week }}
          </th>
        </tr>
        <tr v-for="(item, index) in computedWeeksInfo" :key="index">
          <td>{{ item.name }}</td>
          <td v-for="(value, index) in item.value" :key="index">
            {{ value }}
          </td>
        </tr>
        <tr class="footer">
          <td>合计</td>
          <td v-for="(item, index) in computedTotals" :key="index">
            {{ item }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import * as XLSX from "xlsx";
import { onMounted, ref, computed } from "vue";
import { intervalMap } from "@/api/data";
let weeks: any = ref();
let weeksInfo: any = ref();
const props: any = defineProps({
  category: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
});
onMounted(() => {
  const { type, category } = props;
  const [firstTypeKey, secondTypeKey] = [type[0].key, type[1].key];
  weeks.value = intervalMap[category][firstTypeKey][0];
  weeksInfo.value = intervalMap[category][secondTypeKey][0];
});
const firstTypeKey = computed(() => props.type[0].key);
const secondTypeKey = computed(() => props.type[1].key);

const computedWeeks = computed(() => {
  return intervalMap[props.category][firstTypeKey.value][0];
});

const computedWeeksInfo = computed(() => {
  return intervalMap[props.category][secondTypeKey.value][0];
});
// 计算总和
let columnTotals = (weeks: any, weeksInfo: any) => {
  const numColumns = weeks.length;
  const totals: number[] = Array(numColumns).fill(0);
  weeksInfo.forEach((row: any) => {
    row.value.forEach((value: any, index: any) => {
      totals[index] += Number(value);
    });
  });
  return totals;
};
const computedTotals = computed(() => {
  return columnTotals(computedWeeks.value, computedWeeksInfo.value);
});
// 导出excel
const exportToExcel = () => {
  let table = document.querySelector("#table");
  let sheet = XLSX.utils.table_to_sheet(table);
  let workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, `${props.title}`);
  let binaryData = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
  let blob = new Blob([s2ab(binaryData)], { type: "application/octet-stream" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${props.title}.xlsx`;
  link.click();
};
let s2ab = (s: any) => {
  let buf = new ArrayBuffer(s.length);
  let view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
};
</script>
<style scoped>
.table-container {
  width: 100%;
  height: 70vh;
  overflow-y: auto;
  will-change: transform;
  box-sizing: content-box;
}
.header {
  width: 100%;
  position: sticky;
  top: -1px;
}
.footer {
  background-color: antiquewhite;
  position: sticky;
  bottom: -1px;
}
table {
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
tbody {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-collapse: collapse;
}
th,
td {
  box-sizing: border-box;
  border: 1px solid #ddd;
  padding: 6px;
  text-align: center;
  vertical-align: middle;
}
td:nth-child(1) {
  font-weight: 500;
}
tr:last-child td {
  font-weight: bold;
}
th {
  background-color: #f2f2f2;
  font-weight: bold;
}
tr {
  vertical-align: middle;
}
tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
.title {
  font-size: 20px;
}
.export {
  position: absolute;
  right: 24px;
  top: 50px;
}
</style>
