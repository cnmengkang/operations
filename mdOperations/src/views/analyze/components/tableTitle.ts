import { reactive } from "vue";
export const tableTitle = reactive<any>({
    ai: {
        name: "AI功能",
        dayTitle: '日报',
        weekTitle: '周报',
        monthTitle: '月报',
        day_title: [],
        week_title: [],
        month_title: [],
    },
    base: {
        name: "基础功能",
        dayTitle: '日报',
        weekTitle: '周报',
        monthTitle: '月报',
        day_title: [],
        week_title: [],
        month_title: [],
    },
    device: {
        name: "设备",
        dayTitle: '日报',
        weekTitle: '周报',
        monthTitle: '月报',
        day_title: [],
        week_title: [],
        month_title: [],
    },
    dictation: {
        name: "听写语种",
        dayTitle: '日报',
        weekTitle: '周报',
        monthTitle: '月报',
        day_title: [],
        week_title: [],
        month_title: [],
    },
    system: {
        name: "系统",
        dayTitle: '日报',
        weekTitle: '周报',
        monthTitle: '月报',
        day_title: [],
        week_title: [],
        month_title: [],
    },
    ocr: {
        name: "设备",
        dayTitle: '日报',
        weekTitle: '周报',
        monthTitle: '月报',
        day_title: [],
        week_title: [],
        month_title: [],
    },
    download: {
        name: "下载",
        dayTitle: '日报',
        weekTitle: '周报',
        monthTitle: '月报',
        day_title: [],
        week_title: [],
        month_title: [],
    },
    token: {
        name: "token",
        dayTitle: '日报',
        weekTitle: '周报',
        monthTitle: '月报',
        day_title: [],
        week_title: [],
        month_title: [],
    }
})

export const processTableTitle = (type: any, data: any) => {
    const mapEntry = tableTitle[type];
    Object.keys(data).forEach((item: any) => {
        if (mapEntry.hasOwnProperty(item)) {
            mapEntry[item] = [];
            data[item].forEach((obj: any, index: any) => {
                mapEntry[item].push({ id: index, name: obj });
            })
        }
    })
}