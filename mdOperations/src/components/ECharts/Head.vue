<template>
  <div class="head-title flex space-between mb-10">
    <h4 class="left title">{{ props.h }}</h4>
    <div class="head-right" v-if="showBtn">
      <a-radio-group
        size="small"
        @change="handExportData(value)"
        v-model:value="value"
      >
        <a-radio-button value="excel">导出Excel</a-radio-button>
        <a-radio-button value="charts">导出图标</a-radio-button>
      </a-radio-group>
    </div>
  </div>
  <div class="head-time text-center">
    <div v-show="!showBtn" class="export pointer" @click="showBtn = !showBtn">
      点击进行自定义查询，导出
    </div>
    <template v-show="showBtn">日期</template>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
let showBtn: any = ref(false);
let value: any = ref("excel");
const props = defineProps<{
  h?: string; // 标题
  icon?: string; //图标
}>();
// 导出数据 图表|| Excel
let handExportData = (value: any) => {
  console.log("value", value);
};
</script>
<style scoped>
.ant-radio-button-wrapper {
  font-size: 12px;
}
.export {
  font-size: 12px;
  color: rgb(58, 142, 255);
  display: inline;
}
</style>
