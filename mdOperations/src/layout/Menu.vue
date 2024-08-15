<template>
  <div class="logo">
    <img src="../../public/images/logo.png" />
  </div>
  <a-menu
    v-model:selectedKeys="current"
    :items="items"
    mode="inline"
    theme="dark"
    :onSelect="handleClickMenu"
  ></a-menu>
</template>
<script setup lang="ts">
import { reactive, h, ref } from "vue";
import { useRouter } from "vue-router";
import {
  HistoryOutlined,
  BarChartOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";

const router = useRouter();
const current: any = ref(["aiHistory"]);
let route = router.currentRoute.value;
const items = reactive([
  {
    key: "business",
    icon: () => h(BarChartOutlined),
    label: "业务数据",
    title: "data",
  },
  {
    key: "ai",
    icon: () => h(AppstoreOutlined),
    title: "数据分析",
    label: "数据分析",
    children: [
      {
        title: "AI分析",
        label: "AI分析",
        key: "aiFunction",
      },
      {
        title: "基础功能",
        label: "基础功能",
        key: "base",
      },
      {
        title: "设备激活",
        label: "设备激活",
        key: "deviceActivation",
      },
      {
        title: "系统",
        label: "系统",
        key: "system",
      },
      {
        title: "听写",
        label: "听写语种",
        key: "dictation",
      },
      {
        title: "智能截图",
        label: "智能截图",
        key: "ocr",
      },
      {
        title: "客户端下载量",
        label: "客户端下载量",
        key: "download",
      },
      {
        title: "令牌数",
        label: "令牌数",
        key: "token",
      },
      {
        title: "机器人客服",
        label: "机器人客服",
        key: "robot",
      },
    ],
  },
  {
    key: "aiHistory",
    icon: () => h(HistoryOutlined),
    label: "AI对话记录",
    title: "AI对话记录",
  },
  // {
  //   key: "test",
  //   icon: () => h(HistoryOutlined),
  //   label: "test",
  //   title: "test",
  // },
]);
current.value = [route.name];
// 点击切换页面
let handleClickMenu = (items: any) => {
  router.push(items.key);
};
</script>
<style scoped lang="less">
.logo {
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 150px;
  }
}
:deep .ant-menu-title-content {
  text-align: left;
}
</style>
