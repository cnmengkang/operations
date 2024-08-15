import { Ref } from 'vue';
import * as echarts from 'echarts';
import ThemeColor from '@/themeColor';
// import { useStore } from "@/store/index";
import { getHtmlFontPX, handleChartResize } from "@/utils/base";

export interface EChartOptions {
    type: 'line' | 'bar' | 'pie' | 'lineDown' | 'aiBar'; // 支持的图表类型
    data: any; // 图表数据
    options?: echarts.EChartsOption; // 可选的ECharts配置项
    title?: string; // 标题
    icons?: string,
}

const colors = ['#facd91', '#81d3f8', '#c280ff'];
export default class EChartsHandler {
    private chartInstance: any = null;
    private container: Ref<HTMLElement | null>;

    constructor(container: Ref<HTMLElement | null>) {
        this.container = container;
    }

    // 渲染数据
    public renderChart(options: EChartOptions): void {
        if (!this.container.value) return;
        this.chartInstance = echarts.init(this.container.value);
        const { type, data, title, options: customOptions } = options;
        let chartOptions: any = {
            title: {
                textStyle: {
                    color: "#000000",
                    fontSize: getHtmlFontPX(.85),
                }
            },
            textStyle: {
                color: ThemeColor.chartFontColor
            },
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                top: '30%',
                left: '3%',
                right: '0%',
                bottom: '0%',
                containLabel: true
            },
            // barWidth: '12',
        };
        switch (type) {
            case 'line':
                data.forEach((item: any) => {
                    if (item.value.endsWith('%')) {
                        item.value = parseFloat(item.value) / 100; // 转换为小数
                    }
                });
                chartOptions = {
                    ...chartOptions,
                    ...customOptions,
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{c}%'  // 鼠标悬浮时显示数据
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: `{value}%`  // Y 轴显示百分比
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: data.map((item: any) => item.name)
                    },
                    series: [{
                        type: 'line',
                        itemStyle: {
                            color: ThemeColor.lineColor,
                        },
                        data: data.map((item: any) => Math.round(item.value * 100))
                    }]
                };
                break;
            case 'lineDown':
                chartOptions = {
                    ...chartOptions,
                    ...customOptions,
                    yAxis: { type: 'value' },
                    legend: {
                        data: ['Win', 'Mac']
                    },
                    xAxis: {
                        type: 'category',
                        data: data.map((item: any) => item.title)
                    },
                    series: [
                        {
                            name: 'Win',
                            type: 'line',
                            data: data.map((item: any) => item.value.find((v: any) => v.name === "win")?.add_count || 0)
                        },
                        {
                            name: 'Mac',
                            type: 'line',
                            data: data.map((item: any) => item.value.find((v: any) => v.name === "mac")?.add_count || 0)
                        },
                    ]
                };
                break;
            case 'bar':
                chartOptions = {
                    ...chartOptions,
                    ...customOptions,
                    legend: {},
                    grid: {
                        top: '30%',
                        left: '3%',
                        right: '0%',
                        bottom: '20%',
                        containLabel: true
                    },
                    yAxis: { type: 'value' },
                    series: [{
                        data: data.map((item: any) => item.value),
                        type: 'bar',
                        name: data.map((item: any) => item.name),
                        itemStyle: {
                            color: (params: any) => {
                                return colors[params.dataIndex % colors.length];
                            },
                        },
                        label: {
                            show: true,
                            position: 'top', // 将 label 显示在 bar 的底部
                        }
                    }]
                };
                chartOptions.xAxis = {
                    type: 'category',
                    axisTick: { show: false },
                    axisLabel: {
                        show: true,
                        fontSize: getHtmlFontPX(0.75),
                    },
                    nameTextStyle: {
                        fontSize: getHtmlFontPX(0.75)
                    },
                    data: data.map((item: any) => item.name) // 设置 x 轴的标签数据
                }
                break;
            case 'pie':
                chartOptions = {
                    ...chartOptions,
                    ...customOptions,
                    title: [
                        {
                            subtext: "使用客户数",
                            left: '22%',
                            top: '85%',
                            textAlign: 'center'
                        },
                        {
                            subtext: "连接客户端次数",
                            left: '72%',
                            top: '85%',
                            textAlign: 'center'
                        },
                    ],
                    series: [
                        {
                            type: 'pie',
                            radius: ['50%', '70%'],
                            center: ['50%', '50%'],
                            data: [data[0]],
                            label: {
                                show: true, // 隐藏标签文字
                                position: 'center',
                                formatter: '{c}',
                                fontSize: 14,
                            },
                            labelLine: {
                                show: false
                            },
                            itemStyle: {
                                color: ThemeColor.lineColor,
                            },
                            left: 0,
                            right: '50%',
                            top: 0,
                            bottom: 0,
                        },
                        {
                            type: 'pie',
                            radius: ['50%', '70%'],
                            center: ['50%', '50%'],
                            data: [data[1]],
                            label: {
                                show: true, // 隐藏标签文字
                                position: 'center',
                                formatter: '{c}',
                                fontSize: 14,
                            },
                            itemStyle: {
                                color: ThemeColor.lineColor,
                            },
                            left: '50%',
                            right: 0,
                            top: 0,
                            bottom: 0
                        },
                    ],
                    // toolbox: {
                    //     feature: {
                    //         myModal: false ? {} : {
                    //             title: '详情',
                    //             icon: 'M391.2 348.6L166.6 124.1h107.6c16.6 0 30-13.4 30-30s-13.4-30-30-30H93.6c-16.3 0.3-29.4 13.6-29.4 30v180c0 16.6 13.4 30 30 30s30-13.4 30-30V166.5l224.6 224.6c11.7 11.7 30.7 11.7 42.4 0 11.7-11.8 11.7-30.8 0-42.5zM348.8 632.8L124.2 857.3V749.7c0-16.6-13.4-30-30-30s-30 13.4-30 30v180.6c0.3 16.3 13.6 29.4 30 29.4h180c16.6 0 30-13.4 30-30s-13.4-30-30-30H166.6l224.6-224.6c11.7-11.7 11.7-30.7 0-42.4-11.7-11.6-30.7-11.6-42.4 0.1zM675.6 391.1l224.6-224.6v107.6c0 16.6 13.4 30 30 30s30-13.4 30-30V93.5c-0.3-16.3-13.6-29.4-30-29.4h-180c-16.6 0-30 13.4-30 30s13.4 30 30 30h107.6L633.2 348.6c-11.7 11.7-11.7 30.7 0 42.4 11.7 11.8 30.7 11.8 42.4 0.1zM633.2 675.2l224.6 224.6H750.2c-16.6 0-30 13.4-30 30s13.4 30 30 30h180.6c16.3-0.3 29.4-13.6 29.4-30v-180c0-16.6-13.4-30-30-30s-30 13.4-30 30v107.6L675.6 632.8c-11.7-11.7-30.7-11.7-42.4 0s-11.7 30.7 0 42.4z',
                    //             onclick: (_params: any, _class: any, _name: any, e: any) => {
                    //                 e.event.preventDefault();
                    //                 const store = useStore();
                    //                 store.toggleModel()
                    //             }
                    //         },
                    //     }
                    // },
                };
                break;
            case 'aiBar':
                chartOptions = {
                    ...chartOptions,
                    title: {
                        text: title,
                        x: 'center'
                    },
                    legend: {},
                    grid: {
                        left: '0',
                        top: '5%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: data.map((item: any) => (item.title))
                    },
                    barWidth: '10',
                    series: [
                        {
                            name: data.map((item: any) => (item.title)),
                            type: 'bar',
                            data: data.map((item: any) => (item.value1))
                        },
                        {
                            name: data.map((item: any) => (item.title)),
                            type: 'bar',
                            data: data.map((item: any) => (item.value2))
                        }
                    ]
                }
                break;
            default:
                throw new Error(`Unsupported chart type: ${type}`);
        }
        this.chartInstance.setOption(chartOptions);
    }

    // 重新set一下resize后的字体 不然会有偏移
    // public resetFontSize(): void {
    //     this.chartInstance && this.chartInstance.setOption(chartOptions);
    // }
    // 处理图表resize
    public resizeChart(): void {
        if (this.chartInstance) {
            handleChartResize(this.chartInstance);
            // this.resetFontSize();
        }
    }

    // 销毁
    public disposeChart(): void {
        if (this.chartInstance) {
            this.chartInstance.dispose();
            this.chartInstance = null;
        }
    }

}
