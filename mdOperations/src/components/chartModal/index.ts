import { reactive } from 'vue';

type ChartModalType = {
    open: boolean;
    type: number; // 使用小写的 `number` 类型
    category: string; // 添加 category 属性
    changeOpen: (open: boolean, type: number, category: string) => void; // 更新函数签名
};
export default function (): ChartModalType {
    // 方便打开弹窗时执行一些逻辑
    const changeOpen = (open: boolean, type: number, category: string) => {
        chartModal.type = type;
        chartModal.open = open;
        chartModal.category = category; // 设置 category 属性
    };

    const chartModal = reactive<ChartModalType>({
        open: false,
        changeOpen,
        type: 0,
        category: 'Add' // 初始化 category 属性
    });

    return chartModal;
}
