<template>
    <div class="login">
        <div class="login-container">
            <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish"
                @finishFailed="onFinishFailed">
                <a-form-item label="账号" name="account" :rules="[{ required: true, message: '输入账号名称！' }]">
                    <a-input v-model:value="formState.account">
                        <template #prefix>
                            <UserOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>

                <a-form-item label="密码" name="password" :rules="[{ required: true, message: '输入密码！' }]">
                    <a-input-password v-model:value="formState.password">
                        <template #prefix>
                            <LockOutlined class="site-form-item-icon" />
                        </template>
                    </a-input-password>
                </a-form-item>
                <a-form-item style="text-align: center;">
                    <a-button style="width: 150px;" :disabled="disabled" type="primary" html-type="submit"
                        class="login-form-button">
                        登录
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script setup>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { ref, reactive, computed } from 'vue';
import API_URLS from '@/api/apiUrls.ts';
import { fetchData } from "@/utils/axios";
import { useRouter } from "vue-router";
const router = useRouter();
const formState = reactive({
    account: '',
    password: '',
});
const onFinish = async values => {
    let result = await fetchData.post(API_URLS._login, values)
    if (result.status_code === 200) {
        message.success(result.detail);
        router.push("/");
        localStorage.setItem('account', values.account);
        localStorage.setItem('password', values.password);
    } else {
        message.error(result.detail);
    }

};



const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
    return !(formState.account && formState.password);
});
</script>
<style lang="scss">
.login {
    background-color: rgb(85, 93, 141);
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;

    .login-container {
        display: flex;
        width: 450px;
        height: 350px;
        background-color: #fff;
        align-items: center;
        justify-content: center;
        border-radius: 10px;

    }
}
</style>