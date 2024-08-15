<template>
  <a-layout class="wrapper">
    <a-layout-sider
        :class="store.isCollapse ? '' : 'no-width'"
        :style="sliderStyle"
    >
      <Menu
      />
    </a-layout-sider>
    <a-layout class="app-wrapper">
      <header class="a-header">
        <Header/>
      </header>
      <main class="main-content">
        <MainContent/>
      </main>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import Header from "./Header.vue";
import Menu from "./Menu.vue";
import MainContent from "./MainContent.vue";
import {useStore} from "../store";
import type {CSSProperties} from "vue";

const store = useStore();
const sliderStyle: CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#555d8d",
};
</script>
<style scoped>
.a-header {
  height: 60px;
  line-height: 60px;
  padding: 0px 20px;
  border-bottom: 2px solid #000;
}

.no-width {
  width: 0px !important;
  flex: 0px !important;
  max-width: 0px !important;
  min-width: 0px !important;
  overflow: hidden;
}

.main-content {
  flex: 1; 
  padding: 15px;
  max-height: calc(100vh - 60px);
  background-color: #fff;
  overflow-y: auto;
}

.wrapper {
  height: 100%;
}

.app-wrapper {
  min-height: 100vh;
}
</style>
