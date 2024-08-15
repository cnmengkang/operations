import { Ref, shallowRef, reactive, ref } from 'vue';
import echarts from '@/echarts';
import { EChartsOption } from 'echarts';
import { EChartsType, EChartsCoreOption } from 'echarts/core';
import { getHtmlFontPX, handleChartResize } from "@/utils/base";
import { intervalMap } from "@/api/data";
import ThemeColor from '@/themeColor';

type LineChartType = {
    chart: {
        initChart(nodes: any, type?: string): void;
        resizeChart(): void;
        destroyChart(): void;
        extraOption: EChartsCoreOption; // 额外的配置（例如打开详情弹窗的新配置）
    };
    container: Ref<HTMLDivElement | undefined>;
    chartRef: Ref<EChartsType | undefined>;
    getOption(): EChartsCoreOption;
};
export default function (_props?: { showHandler?: (open: boolean, type: number, category: String) => void; type: number; category: string }): LineChartType {
    const chartRef = shallowRef<EChartsType>();
    const container = ref<HTMLDivElement | undefined>();
    const chart: any = reactive({
        initChart,
        resizeChart,
        destroyChart,
        extraOption: {}
    });
    /**
     * @returns 返回option配置
     */
    function getOption() {
        const option: EChartsOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        width: 1,
                        color: ThemeColor.hoverLineHover
                    }
                },
                formatter: (params: any) => {
                    let resStr: string = `<div>${params[0].axisValueLabel}</div>`;
                    params.forEach((item: any) => {
                        resStr += `
						<div class="tooltip-item">
							<div class="tooltip-label-icon">
								<span class="tooltip-icon">${item.marker}</span>
								<span class="tooltip-label">${item.seriesName}：</span>
							</div>
							<span class="tooltip-value">${item.value >= 10000 ? item.value / 10000 + '万' : item.value}</span>
						</div>
						`;
                    });
                    return resStr;
                }
            },
            textStyle: {
                color: ThemeColor.chartFontColor
            },

            barWidth: '12',
            // toolbox: {
            //     feature: {
            //         myModal: !props?.showHandler ? {}
            //             : {
            //                 title: '详情',
            //                 icon: 'M391.2 348.6L166.6 124.1h107.6c16.6 0 30-13.4 30-30s-13.4-30-30-30H93.6c-16.3 0.3-29.4 13.6-29.4 30v180c0 16.6 13.4 30 30 30s30-13.4 30-30V166.5l224.6 224.6c11.7 11.7 30.7 11.7 42.4 0 11.7-11.8 11.7-30.8 0-42.5zM348.8 632.8L124.2 857.3V749.7c0-16.6-13.4-30-30-30s-30 13.4-30 30v180.6c0.3 16.3 13.6 29.4 30 29.4h180c16.6 0 30-13.4 30-30s-13.4-30-30-30H166.6l224.6-224.6c11.7-11.7 11.7-30.7 0-42.4-11.7-11.6-30.7-11.6-42.4 0.1zM675.6 391.1l224.6-224.6v107.6c0 16.6 13.4 30 30 30s30-13.4 30-30V93.5c-0.3-16.3-13.6-29.4-30-29.4h-180c-16.6 0-30 13.4-30 30s13.4 30 30 30h107.6L633.2 348.6c-11.7 11.7-11.7 30.7 0 42.4 11.7 11.8 30.7 11.8 42.4 0.1zM633.2 675.2l224.6 224.6H750.2c-16.6 0-30 13.4-30 30s13.4 30 30 30h180.6c16.3-0.3 29.4-13.6 29.4-30v-180c0-16.6-13.4-30-30-30s-30 13.4-30 30v107.6L675.6 632.8c-11.7-11.7-30.7-11.7-42.4 0s-11.7 30.7 0 42.4z',
            //                 onclick: (_params: any, _class: any, _name: any, e: any) => {
            //                     e.event.preventDefault();
            //                     props.showHandler && props.showHandler(true, props.type, props.category);
            //                 }
            //             },
            //     }
            // },
        };
        // 浅合并
        return Object.assign(option, chart.extraOption);
    }
    /**
     * 初始化图表
     * @param container 图表容器id
     */
    const labelOption = {
        show: true,
        position: 'right',
    }
    const interval: any = {
        Add: {
            interval: 200,
            type: 'bar'
        },
        Ai: {
            interval: 200,
            type: 'bar'
        },
        Basic: {
            interval: 200,
            type: 'bar'
        },
        AiToken: {
            interval: 200,
            type: 'bar'
        },
        UseSys: {
            interval: 200,
            type: 'bar'
        },
    };
    function initChart(type: any, category: any, slice: boolean): any {
        if (!container.value) return;
        const option: any = getOption();
        option.series = [
            {
                type: interval[type].type,
                data: slice ? filterSortTen(intervalMap[type][category], 10) : intervalMap[type][category],
                label: labelOption,
                itemStyle: {
                    color: ThemeColor.lineColor,
                },
            }
        ];
        option.yAxis = {
            type: 'category',
            axisTick: { show: false },
            data: slice ? filterSortTen(intervalMap[type].name, 10) : intervalMap[type].name, //默认直接取name
        };
        option.grid = {
            top: "5%",
            left: 0,
            right: "5%",
            bottom: 0,
            containLabel: true,
        }
        option.xAxis = {
            type: 'value',
            axisLabel: {
                fontSize: getHtmlFontPX(0.75),
                formatter: function (value: any) {
                    return `${value >= 10000 ? value / 10000 + '万' : value}`;
                }
            },
            nameTextStyle: {
                fontSize: getHtmlFontPX(0.75)
            },
            splitLine: {
                lineStyle: {
                    color: "#ccc"
                }
            }
        }
        chartRef.value = echarts.init(container.value);
        chartRef.value && chartRef.value.setOption(option);
    }
    /*
     * @description 重新set一下resize后的字体 不然会有偏移
     */
    function resetFontSize() {
        const option = getOption();
        // 需要重新计算字体不然依旧会有点偏差
        chartRef.value && chartRef.value.setOption(option);
    }
    /*
     * @description 处理图表resize
     */
    function resizeChart() {
        if (chartRef.value) {
            handleChartResize(chartRef.value);
            resetFontSize();
        }
    }
    // 取前10数据
    function filterSortTen(data: [], slice: number) {
        data.sort((a: any, b: any) => b.add - a.add);
        return data.slice(-slice);
    }

    // 销毁实例
    function destroyChart() {
        if (chartRef.value) {
            chartRef.value.dispose();
        }
    }
    return {
        chart,
        container,
        chartRef,
        getOption
    };
}