import * as echarts from 'echarts';
import ThemeColor from '@/themeColor';
// 定义通用配置项
const commonOptions: echarts.EChartsOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                width: 1,
                color: ThemeColor.hoverLineHover
            }
        },
    },
    toolbox: {
        feature: {
            saveAsImage: {
                title: "导出图片",
            },
        },
    },
    xAxis: {
        type: 'value',
        axisLabel: {
            formatter: function (value: any) {
                return `${value >= 10000 ? value / 10000 + '万' : value}`;
            }
        },
    },
    yAxis: {
        type: 'category',
        axisTick: { show: false },
    },
    barWidth: '12',
    textStyle: {
        color: ThemeColor.chartFontColor
    },
};
const defOptions = (type: string, title: string): echarts.EChartsOption => {
    const getTitle = (text: string) => ({ text });
    switch (type) {
        case 'bar':
            return {
                ...commonOptions,
                title: getTitle(title || '柱状图标题'),
                grid: {
                    top: "10%",
                    left: "1%",
                    right: "3%",
                    bottom: "0%",
                    containLabel: true,
                },
                legend: {
                    top: "5%",
                    left: "center",
                    width: "100%",
                    orient: "horizontal",
                    align: "auto",
                    itemGap: 20,
                },
            };
        case 'line':
            return {
                ...commonOptions,
                title: getTitle(title || '折线图标题'),
                yAxis: {
                    type: 'value',
                },
                grid: {
                    top: "10%",
                    left: "1%",
                    right: "1%",
                    bottom: "15%",
                    containLabel: true,
                },
                legend: {
                    bottom: 0,
                    left: "center",
                    width: "100%",
                    orient: "horizontal",
                    align: "auto",
                    itemGap: 20,
                },
                series: [
                    {
                        name: '默认数据',
                        type: 'line',
                        data: [0, 0, 0, 0, 0, 0, 0]
                    }
                ]
            };
        default:
            console.error('图表类型错误');
            return {};
    }
};

export default defOptions;
