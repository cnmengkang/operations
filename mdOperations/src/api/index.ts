import { fetchData } from "../utils/axios";
import API_URLS from './apiUrls';
import { processData, processLine } from "./data";

// src/types.ts

export type DateParams = {
    start_date: string | null;
    end_data: string | null;
};

/*
processData("Add", response.data)  processData:必填项，处理默认数据

fetchData.post(url, params)  url:必填项,唯一
processData(name response.data)  name：必填项,唯一
*/
// 设备激活新增趋势图================================================================================================
export const getAddActivation = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._add, params);
    processData("Add", response.data)
};

// AI功能使用次数趋势图
export const getAiUseAgeTimers = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._ai, params);
    processData("Ai", response.data)
};

// 基础功能使用次数趋势图
export const getBasicFunction = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._basic, params);
    processData("Basic", response.data)
};

// AI功能Token量趋势图
export const getAiTokenFunction = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._AiToken, params);
    processData("AiToken", response.data)
};

// 系统分布新增趋势图
export const getUseSystem = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._useSys, params);
    processData("UseSys", response.data)
};
// 客户端日活接口
export const getUseDayAlive = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._dayAlive, params);
    return response.data
};
// 客户端下载信息
export const getUseRetentionRate = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._retention_rate, params);
    return response.data
};
// 客户端下载信息
export const getUseDownInfo = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._download_info, params);
    return response
};




// 周报走势图&&表格================================================================================================
// 设备激活新增趋势图
export const getAddWeekTable = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._add_Weeks, params);
    processLine("Add", response.data)
};
// AI功能使用次数趋势图
export const getAiWeekTable = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._ai_Weeks, params);
    processLine("Ai", response.data)
};
// 基础功能使用次数趋势图
export const getBasicWeekTable = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._basic_Weeks, params);
    processLine("Basic", response.data)
};
// AI功能token量
export const getAiTokenWeekTable = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._aiToken_Weeks, params);
    processLine("AiToken", response.data)
};






// 月报走势图&&表格================================================================================================
export const getAddMonthTable = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._add_Month, params);
    processLine("Add", response.data)
};
// AI功能使用次数趋势图
export const getAiMonthTable = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._ai_Month, params);
    processLine("Ai", response.data)
};
// 基础功能使用次数趋势图
export const getBasicMonthTable = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._basic_Month, params);
    processLine("Basic", response.data)
};


