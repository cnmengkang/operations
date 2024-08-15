<template>
  <div class="displayTime">{{ formatted }}</div>
</template>

<script setup lang="ts">
import { useDateFormat, useNow } from "@vueuse/core";
const formatted = useDateFormat(useNow(), "YYYY-MM-DD HH:mm:ss dddd");
</script>
<style scoped>
.displayTime {
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  color: #030f57;
  font-weight: bold;
}
</style>
