// axios.ts
import axios from 'axios';
import { BASE_URL } from '../../env.ts';
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000, // 请求超时时间（毫秒）
    headers: {
        'Content-Type': 'application/json',
    },
});
// 封装GET请求
const get = async (url: any, params: any) => {
    try {
        const response = await axiosInstance.get(url, { params });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message || 'Network error');
    }
};
// 封装POST请求
const post = async (url: any, data: any) => {
    try {
        const response = await axiosInstance.post(url, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message || 'Network error');
    }
};
// 封装带有 URL 参数拼接的POST请求（不包含请求体数据）
const postUrl = async (url: any, params: any) => {
    // 处理参数，排除值为 null 的键值对
    const filteredParams: any = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== null)
    );
    const queryString = new URLSearchParams(filteredParams).toString();
    const fullUrl = `${url}?${queryString}`;

    try {
        const response = await axiosInstance.post(fullUrl);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message || 'Network error');
    }
};
export const fetchData = {
    get,
    post,
    postUrl
};
export default axiosInstance;
