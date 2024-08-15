import * as echarts from "echarts";
import defOptions from "./echartsOptions";
import { debounce } from "lodash";
const newEcharts = () => {
    let chartInstance: echarts.ECharts | null = null;
    return {
        // 初始化
        initChart(el: HTMLElement | null) {
            if (chartInstance) chartInstance.dispose();
            chartInstance = echarts.init(el);
            return chartInstance

        },
        // 初始化数据 type: 图表类型, options: 传入的配置项, title: 标题
        renderChart(type: string, options = {}, title: string) {
            if (chartInstance) {
                const defaultOptions: any = defOptions(type, title);
                const finalOptions = { ...defaultOptions, ...options };
                chartInstance.setOption(finalOptions);

            }
        },
        // 更新series数据
        updateChart(label: string, data: any[]) {
            if (!chartInstance) return;
            const curOptions = chartInstance.getOption() as echarts.EChartsOption;
            if (curOptions && Array.isArray(curOptions.series)) {
                let series: any = [];
                data.forEach((item: any) => {
                    if (item.title == label) {
                        series.push({
                            name: item.title,
                            type: "line",
                            data: item.use_counts,
                        });
                    }
                });
                curOptions.series.push(...series);
                chartInstance.setOption(curOptions, true);
            }
        },
        // 移除指定 series 数据
        removeSeries(label: any) {
            if (!chartInstance) return;
            const curOptions = chartInstance.getOption() as echarts.EChartsOption;
            if (curOptions && Array.isArray(curOptions.series)) {
                curOptions.series = curOptions.series.filter((item: any) => item.name !== label);
                chartInstance.setOption(curOptions, true);
            }
        },
        // 重新设置字体
        resetFontSize() {
            if (chartInstance) {
                const option = chartInstance.getOption() as echarts.EChartsOption;
                chartInstance.setOption(option, true);
            }
        },
        // 调整图表大小
        resizeChart() {
            if (chartInstance) {
                chartInstance.resize({
                    animation: {
                        duration: 300,
                        easing: 'cubicOut'
                    }
                });
                this.resetFontSize();
            }
        },
        // 销毁图表
        disposeChart() {
            if (chartInstance) {
                chartInstance.dispose();
                chartInstance = null;
            }
        }
    }
}


const chartResize = (chartManager: ReturnType<typeof newEcharts>) => {
    return debounce(() => {
        chartManager.resizeChart();
    }, 300);
};

export { newEcharts, chartResize }