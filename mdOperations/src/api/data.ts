import { reactive } from "vue";
import API_URLS from "./apiUrls";

// 合并默认展示数据与弹窗详情数据
export const processData = (type: any, _params: any) => {
    const mapEntry = intervalMap[type];
    Object.keys(mapEntry).forEach((key) => {
        if (key !== "list" && Array.isArray(mapEntry[key])) {
            mapEntry[key] = [];
        }
    });
    _params.forEach((item: any) => {
        Object.keys(item).forEach((key) => {
            if (mapEntry.hasOwnProperty(key)) {
                mapEntry[key].push(item[key]);
            }
        });
    });
};
// 处理折线图数据
export const processLine = (type: any, _params: any) => {
    const mapEntry = intervalMap[type];
    Object.keys(_params).forEach((item: any) => {
        if (mapEntry.hasOwnProperty(item)) {
            mapEntry[item].push(_params[item]);
        }
    });
};
// 默认接口数组存储
export const intervalMap = reactive<any>({
    // 设备激活新增趋势图
    Add: {
        key: "Add",
        type: "bar",
        total: [], //token 总量
        add: [], //新增默认展示数据
        name: [], //名称
        this_week_add: [],
        last_week_add: [],
        this_month_add: [],
        last_month_add: [],
        url: API_URLS._add,
        weekTitle: [],
        weekInfo: [],
        monthTitle: [],
        monthInfo: [],
        list: [
            { label: "新增激活", type: "add", key: "add", times: true },
            { label: "总激活", type: "total", key: "total", times: true },
            {
                label: "周报",
                type: "week",
                times: false,
                key: [
                    { key: "this_week_add", name: "本周激活量" },
                    { key: "last_week_add", name: "上周激活量" },
                ],
            },
            {
                label: "月报",
                type: "month",
                times: false,
                key: [
                    { key: "this_month_add", name: "本月激活量" },
                    { key: "last_month_add", name: "上月激活量" },
                ],
            },
            {
                label: "周统计表",
                type: "weekTable",
                times: false,
                url: API_URLS._add_Weeks,
                key: [
                    { key: "weekTitle", name: "周统计表" },
                    { key: "weekInfo", name: "周统计表" },
                ],
            },
            {
                label: "周走势图",
                type: "weekChart",
                times: false,
                key: [
                    { key: "weekTitle", name: "周趋势图" },
                    { key: "weekInfo", name: "周走势图" },
                ],
            },
            {
                label: "月统计表",
                type: "monthTable",
                times: false,
                url: API_URLS._add_Month,
                key: [
                    { key: "monthTitle", name: "周统计表" },
                    { key: "monthInfo", name: "周统计表" },
                ],
            },
            {
                label: "月走势图",
                type: "monthChart",
                times: false,
                key: [
                    { key: "monthTitle", name: "月趋势图" },
                    { key: "monthInfo", name: "月走势图" },
                ],
            },
        ],
    },
    // AI功能使用次数趋势图
    Ai: {
        key: "Ai",
        type: "bar",
        use_count: [], //使用次数
        use_num: [], //使用人数
        name: [], //名称
        this_week_count: [],
        last_week_count: [],
        this_month_count: [],
        last_month_count: [],
        url: API_URLS._ai,
        weekTitle: [],
        weekInfo: [],
        monthTitle: [],
        monthInfo: [],
        list: [
            { label: "使用次数", type: "use_count", times: true, key: "use_count" },
            { label: "使用人数", type: "use_num", times: true, key: "use_num" },
            {
                label: "周报",
                type: "week",
                times: false,
                key: [
                    { key: "this_week_count", name: "本周使用次数" },
                    { key: "last_week_count", name: "上周使用次数" },
                ],
            },
            {
                label: "月报",
                type: "month",
                times: false,
                key: [
                    { key: "this_month_count", name: "本月使用次数" },
                    { key: "last_month_count", name: "上月使用次数" },
                ],
            },
            {
                label: "周统计表",
                type: "weekTable",
                times: false,
                url: API_URLS._ai_Weeks,
                key: [
                    { key: "weekTitle", name: "周统计表" },
                    { key: "weekInfo", name: "周统计表" },
                ],
            },
            {
                label: "周走势图",
                type: "weekChart",
                times: false,
                key: [
                    { key: "weekTitle", name: "周趋势图" },
                    { key: "weekInfo", name: "周走势图" },
                ],
            },
            {
                label: "月统计表",
                type: "monthTable",
                times: false,
                url: API_URLS._ai_Month,
                key: [
                    { key: "monthTitle", name: "月统计表" },
                    { key: "monthInfo", name: "月统计表" },
                ],
            },
            {
                label: "月走势图",
                type: "monthChart",
                times: false,
                key: [
                    { key: "monthTitle", name: "月趋势图" },
                    { key: "monthInfo", name: "月走势图" },
                ],
            },
        ],
    },
    // 基础功能使用次数趋势图
    Basic: {
        key: "Basic",
        type: "bar",
        use_count: [], //使用次数
        use_num: [], //使用人数
        name: [], //名称
        this_week_count: [],
        last_week_count: [],
        this_month_count: [],
        last_month_count: [],
        url: API_URLS._basic,
        weekTitle: [],
        weekInfo: [],
        monthTitle: [],
        monthInfo: [],
        list: [
            { label: "使用次数", type: "use_count", times: true, key: "use_count" },
            { label: "使用人数", type: "use_num", times: true, key: "use_num" },
            {
                label: "周报",
                type: "week",
                times: false,
                key: [
                    { key: "this_week_count", name: "本周使用次数" },
                    { key: "last_week_count", name: "上周使用次数" },
                ],
            },
            {
                label: "月报",
                type: "month",
                times: false,
                key: [
                    { key: "this_month_count", name: "本月使用次数" },
                    { key: "last_month_count", name: "上月使用次数" },
                ],
            },
            {
                label: "周统计表",
                type: "weekTable",
                times: false,
                url: API_URLS._basic_Weeks,
                key: [
                    { key: "weekTitle", name: "周统计表" },
                    { key: "weekInfo", name: "周统计表" },
                ],
            },
            {
                label: "周走势图",
                type: "weekChart",
                times: false,
                key: [
                    { key: "weekTitle", name: "周趋势图" },
                    { key: "weekInfo", name: "周走势图" },
                ],
            },
            {
                label: "月统计表",
                type: "monthTable",
                times: false,
                url: API_URLS._basic_Month,
                key: [
                    { key: "monthTitle", name: "周统计表" },
                    { key: "monthInfo", name: "周统计表" },
                ],
            },
            {
                label: "月走势图",
                type: "monthChart",
                times: false,
                key: [
                    { key: "monthTitle", name: "月趋势图" },
                    { key: "monthInfo", name: "月走势图" },
                ],
            },
        ],
    },
    // AI功能Token量趋势图
    AiToken: {
        key: "AiToken",
        type: "bar",
        use_token: [], //使用次数
        name: [], //名称
        this_week_count: [],
        last_week_count: [],
        this_month_count: [],
        last_month_count: [],
        url: API_URLS._AiToken,
        weekTitle: [],
        weekInfo: [],
        list: [
            { label: "Token", type: "use_token", times: true, key: "use_token" },
            {
                label: "周报",
                type: "week",
                times: false,
                key: [
                    { key: "this_week_count", name: "本周使用次数" },
                    { key: "last_week_count", name: "上周使用次数" },
                ],
            },
            {
                label: "月报",
                type: "month",
                times: false,
                key: [
                    { key: "this_month_count", name: "本月使用次数" },
                    { key: "last_month_count", name: "上月使用次数" },
                ],
            },
            // {
            //     label: "周统计表",
            //     type: "weekTable",
            //     times: false,
            //     url: API_URLS._aiToken_Weeks,
            //     key: [
            //         { key: "weekTitle", name: "周统计表" },
            //         { key: "weekInfo", name: "周统计表" },
            //     ],
            // },
            // {
            //     label: "周走势图",
            //     type: "weekChart",
            //     times: false,
            //     key: [
            //         { key: "weekTitle", name: "周趋势图" },
            //         { key: "weekInfo", name: "周走势图" },
            //     ],
            // },


        ],
    },
    // 系统分布新增趋势图
    UseSys: {
        key: "UseSys",
        type: "bar",
        add_users: [], //使用次数
        total_users: [], //使用次数
        name: [], //名称
        this_week_add: [],
        last_week_add: [],
        this_month_add: [],
        last_month_add: [],
        url: API_URLS._useSys,
        list: [
            { label: "新增用户", type: "add_users", times: true, key: "add_users" },
            { label: "总用户", type: "total_users", key: "total_users" },
            {
                label: "周报",
                type: "week",
                times: false,
                key: [
                    { key: "this_week_add", name: "本周用户量" },
                    { key: "last_week_add", name: "上周用户量" },
                ],
            },
            {
                label: "月报",
                type: "month",
                times: false,
                key: [
                    { key: "this_month_add", name: "本月用户量" },
                    { key: "last_month_add", name: "上月用户量" },
                ],
            },
        ],
    },
});
