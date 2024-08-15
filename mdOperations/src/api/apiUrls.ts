const API_URLS = {
    // 默认数据接口
    _add: "v1/statistics/device_activation",  //设备新增激活数量
    _ai: "v1/statistics/ai_use_info",   //AI功能使用次数
    _basic: "v1/statistics/client_use_info", //基础功能使用次数
    _AiToken: "v1/statistics/ai_token_info", //AI功能token量
    _useSys: "v1/statistics/system_use_info",//各系统用户日使用情况表
    _dayAlive: "v1/statistics/client_active_info", //日活接口
    _retention_rate: "v1/statistics/user_retention_rate", //用户留存率
    _download_info: "v1/statistics/client_download_info", //客户端下载信息
    // =======================================================================================
    // 默认数据接口
    // 周走势接口
    _add_Weeks: "v1/statistics/device_weeks_use_info", //设备新增激活数量
    _ai_Weeks: "v1/statistics/ai_weeks_use_info",  //AI功能使用次数
    _basic_Weeks: "v1/statistics/client_weeks_use_info", //基础功能使用次数
    _aiToken_Weeks: "v1/statistics/ai_weeks_token_info",   //AI功能token量
    // 周走势接口
    // =======================================================================================
    // 月报趋势图
    _add_Month: "v1/statistics/client_device_use_info",
    _ai_Month: "v1/statistics/ai_month_use_info",
    _basic_Month: "v1/statistics/client_month_use_info",
    // =======================================================================================
    // v2接口
    // 数据分析接口
    _aiAi_analyze: "v2/statistics/ai_use_info",
    // # AI功能Token使用统计接口
    _aiBase_analyze: "v2/statistics/client_use_info",
    // # 设备激活统计v2接口
    _aiDevice_analyze: "v2/statistics/device_activation",
    // # 客户端听写各语种使用量统计v2接口
    _aiDictation_analyze: "v2/statistics/client_dt_languages_info",
    // 各系统分布
    _aiSystem_analyze: "v2/statistics/system_use_info",
    // # 客户端OCR各设备使用量统计v2接口
    _aiOcr_analyze: "v2/statistics/client_ocr_device_info",
    // # 客户端下载量统计v2接口
    _aiDownload_analyze: "v2/statistics/client_download_info",
    // # AI功能Token使用统计接口
    _aiToken_analyze: "v2/statistics/ai_token_info",
    // # 客服机器人使用统计接口
    _aiRobot_analyze: "v2/statistics/robot_use_info",
    // 登录接口
    _login: "v2/user/user_login",
    // =======================================================================================
    // Ai对话历史记录查询接口
    _ai_history: "v1/chat/chat_history"
    // v2接口
};
export default API_URLS;

