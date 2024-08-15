<template>
    <a-row align="middle">
        <a-col class="flex" :xs="2" :sm="4" :md="1" :lg="1" :xl="1">
            <span class="btn-screen flex" @click="toggleCollapsed">
                <MenuUnfoldOutlined v-if="!store.isCollapse" />
                <MenuFoldOutlined v-else />
            </span>
        </a-col>
        <a-col :xs="2" :sm="4" :md="6" :lg="7" :xl="7">
            <displayTime />
        </a-col>
        <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8">
            <div class="title">
                <h2>业务数据</h2>
            </div>
        </a-col>
        <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8">
            <a-button style="float: right;" type="primary" @click="logOut">退出</a-button>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import displayTime from "../components/Header/displayTime.vue";
import { useStore } from "../store";
const store = useStore();
let toggleCollapsed = () => {
    store.isCollapse = !store.isCollapse;
};

let logOut = () => {
    localStorage.removeItem('account');
    localStorage.removeItem('password');
    router.push("/login")
}
</script>
<style scoped>
.title h2 {
    font-size: 36px;
    color: #030f57;
    text-align: center;
    font-weight: bold;
}

.btn-screen {
    cursor: pointer;
    font-size: 25px;
    color: #555d8d;
}
</style>
