<template>
  <a-space direction="vertical">
    <a-space>
      <strong>日期查询：</strong><a-range-picker v-model:value="date" @change="handleClickTimers" />
    </a-space>
    <a-space>
      <a-table
        :dataSource="dataSource"
        :columns="columns"
        :pagination="pagination"
        @change="handlePageChange"
      >
        <template
          #customFilterDropdown="{
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            column,
          }"
        >
          <div style="padding: 8px">
            <a-input
              ref="searchInput"
              :placeholder="`搜索 ${column.title}`"
              :value="selectedKeys[0]"
              style="width: 188px; margin-bottom: 8px; display: block"
              @change="
                (e:any) => setSelectedKeys(e.target.value ? [e.target.value] : [])
              "
              @pressEnter="
                handleSearch(selectedKeys, confirm, column.dataIndex)
              "
            />
            <a-button
              type="primary"
              size="small"
              style="width: 90px; margin-right: 8px"
              @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
            >
              <template #icon><SearchOutlined /></template>
              搜索
            </a-button>
            <a-button
              size="small"
              style="width: 90px"
              @click="handleReset(clearFilters)"
            >
              重置
            </a-button>
          </div>
        </template>
        <template #bodyCell="{ text, column }">
          <span
            v-if="state.searchText && state.searchedColumn === column.dataIndex"
          >
            <template
              v-for="(fragment, i) in text
                .toString()
                .split(
                  new RegExp(
                    `(?<=${state.searchText})|(?=${state.searchText})`,
                    'i'
                  )
                )"
            >
              <mark
                v-if="fragment.toLowerCase() === state.searchText.toLowerCase()"
                :key="i"
                class="highlight"
              >
                {{ fragment }}
              </mark>
              <template v-else>{{ fragment }}</template>
            </template>
          </span>
        </template>
      </a-table>
    </a-space>
  </a-space>
</template>

<script setup lang="ts">
import { SearchOutlined } from "@ant-design/icons-vue";
import { ref, onMounted, reactive, computed } from "vue";
import API_URLS from "@/api/apiUrls";
import { fetchData } from "@/utils/axios";
const dataSource = ref([]);
const state = reactive({
  searchText: "",
  searchedColumn: "",
});
const searchInput = ref();
import dayjs from "dayjs";
const date = ref();
const columns = computed(() => {
  return [
    {
      title: "型号",
      dataIndex: "device_model",
      key: "device_model",
      align: "center",
      filters: getUniqueFilters("device_model"),
      onFilter: (value: any, record: any) =>
        filterByValue(record.device_model, value),
    },
    {
      title: "识别码",
      dataIndex: "local_code",
      key: "local_code",
      align: "center",
    },
    {
      title: "编号",
      dataIndex: "serial_no",
      key: "serial_no",
      align: "center",
      ellipsis: true,
    },
    {
      title: "场景",
      dataIndex: "scene",
      key: "scene",
      align: "center",
      filters: getUniqueFilters("scene"),
      onFilter: (value: any, record: any) => filterByValue(record.scene, value),
    },
    {
      title: "子场景",
      dataIndex: "scene_code",
      key: "scene_code",
      align: "center",
    },
    {
      title: "用户",
      dataIndex: "user",
      key: "user",
      ellipsis: true,
      width: "15%",
      customFilterDropdown: true,
      onFilter: (value: string, record: { user: { toString: () => string } }) =>
        record.user.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible: any) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    },
    {
      title: "机器人",
      dataIndex: "robot",
      key: "robot",
      ellipsis: true,
      width: "15%",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      align: "center",
      ellipsis: true,
      filters: getUniqueFilters("status"),
      onFilter: (value: any, record: any) =>
        filterByValue(record.status, value),
    },
    {
      title: "令牌",
      dataIndex: "tokens",
      key: "tokens",
      align: "center",
    },
    {
      title: "会话ID",
      dataIndex: "sid",
      key: "sid",
      align: "center",
      ellipsis: true,
    },
    {
      title: "账号",
      dataIndex: "user_account",
      key: "user_account",
      align: "center",
    },
    {
      title: "时间",
      dataIndex: "create_time",
      key: "create_time",
      align: "center",
      customRender: ({ text }: any) => {
        return dayjs(text).format("YYYY-MM-DD-HH:mm:ss");
      },
      width: "10%",
    },
  ];
});

const handleSearch = (
  selectedKeys: string[],
  confirm: () => void,
  dataIndex: string
) => {
  confirm();
  state.searchText = selectedKeys[0];
  state.searchedColumn = dataIndex;
};
const handleReset = (clearFilters: (arg0: { confirm: boolean }) => void) => {
  clearFilters({
    confirm: true,
  });
  state.searchText = "";
};
let pagination = reactive({
  current: 1,
  pageSize: 10, //每页条数
  total: 500,
  pageSizeOptions: ["10", "20", "50", "100"], //每页中显示的数据
  showSizeChanger: true,
  position: ["bottomLeft"],
  showQuickJumper: true,
  showTotal: (total: any) => `共 ${total} 条`,
});
onMounted(() => {
  getAiHistory(null, null, 1, 10);
});
// 分页
let handlePageChange = async ({ current, pageSize }: any) => {
  pagination.current = current;
  pagination.pageSize = pageSize;
  const offset = current;
  const limit = pagination.pageSize;
  getAiHistory(null, null, offset, limit);
};
// 日期选择器
let handleClickTimers = async (_data: string, dateString: string) => {
  getAiHistory(dateString[0], dateString[1], 1, 10);
};
// 请求数据
let getAiHistory = async (
  start_date: any,
  end_data: any,
  offset: any,
  limit: any
) => {
  let params = {
    start_date: start_date,
    end_data: end_data,
    offset: offset,
    limit: limit,
  };
  let history = await fetchData.postUrl(API_URLS._ai_history, params);
  pagination.total = history.total;
  dataSource.value = history.items.map((item: any) => ({
    sid: item.sid,
    device_model: item.device_model,
    local_code: item.local_code,
    robot: item.robot,
    scene: item.scene,
    scene_code: item.scene_code,
    serial_no: item.serial_no,
    status: item.status,
    tokens: item.tokens,
    user: item.user,
    user_account: item.user_account,
    create_time: item.create_time,
  }));
};
// 处理重复数据
let getUniqueFilters = (key: any) => {
  const uniqueValues = [...new Set(dataSource.value.map((item) => item[key]))];
  return uniqueValues.map((value) => ({ text: value, value }));
};
// 过滤筛选数据
let filterByValue = (deviceModel: any[], value: string | number) => {
  if (typeof deviceModel === "string" || typeof deviceModel === "number") {
    return deviceModel === value;
  }
  if (Array.isArray(deviceModel)) {
    return deviceModel.some((item) => item === value);
  }
  return false;
};
</script>
<style scoped>
.customFilter {
  background-color: #fff;
  padding: 8px;
}
</style>
