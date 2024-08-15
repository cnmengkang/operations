import { fetchData } from "../utils/axios";
import API_URLS from './apiUrls';

export type DateParams = {
    start_date: string | null;
    end_data: string | null;
};
export const getAiAnalyze = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._aiAi_analyze, params);
    return response.data;
};
export const getBaseAnalyze = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._aiBase_analyze, params);
    return response.data;
};
export const getDeviceAnalyze = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._aiDevice_analyze, params);
    return response.data;
};
export const getDictationAnalyze = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._aiDictation_analyze, params);
    return response.data;
};
export const getSystemAnalyze = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._aiSystem_analyze, params);
    return response.data;
};
export const getOcrAnalyze = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._aiOcr_analyze, params);
    return response.data;
};
export const getDownloadAnalyze = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._aiDownload_analyze, params);
    return response.data;
};
export const getTokenAnalyze = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._aiToken_analyze, params);
    return response.data;
};
export const getRobotAnalyze = async (params: DateParams): Promise<any> => {
    let response = await fetchData.post(API_URLS._aiRobot_analyze, params);
    return response.data;
};
