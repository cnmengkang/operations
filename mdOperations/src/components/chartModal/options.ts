// chartOptions.ts

import ThemeColor from "@/themeColor";

export const generateCommonOptions = () => {
    return {
        legend: {
            bottom: 0,
            left: "center",
            width: "100%",
            orient: "horizontal",
            align: "auto",
            itemGap: 20,
        },
        toolbox: {
            feature: {
                saveAsImage: {
                    title: "导出图片",
                },
            },
        },
        barWidth: '12',
        tooltip: {
            trigger: "axis",
            axisPointer: {
                lineStyle: {
                    width: 1,
                    color: ThemeColor.hoverLineHover,
                },
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
            <span class="tooltip-value">${item.value >= 10000 ? item.value / 10000 + "万" : item.value
                        }</span>
          </div>
          `;
                });
                return resStr;
            },
        },
        textStyle: {
            color: ThemeColor.chartFontColor,
        },
        grid: {
            top: "5%",
            left: "1%",
            right: "1%",
            bottom: "10%",
            containLabel: true,
        },
    };
};
