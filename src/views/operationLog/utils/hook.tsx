import { message } from '@/utils/message';
// import editForm from "../form.vue";
import type { PaginationProps } from '@pureadmin/table';
// import { addDialog } from "@/components/ReDialog";
import { usePublicHooks } from '@/hooks';
import { columns } from '../component/TableColumnList';
import { removeEmptyStringKeys } from '@/utils/utilFn';

export function useOperationLog() {
  const dataList = reactive<OperationLogDataAPI.OperationLogListFetchList[]>(
    []
  );
  const loading = ref(true);
  const switchLoadMap = ref({});
  const { switchStyle } = usePublicHooks();
  const operationTypeList = reactive<string[]>([]);
  const searchMenuList = reactive<
    OperationLogDataAPI.OperationMenuTypeChildren[]
  >([]);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const form = reactive({
    operateType: '',
    operateMenu: [],
    operateLog: '',
    userName: ''
  });

  function handleTableWidthChange(val: number) {
    pagination.pageSize = val;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    onSearch();
  }

  async function onSearch(type?: string) {
    if (type === 'reload') pagination.currentPage = 1;
    loading.value = true;
    const o = JSON.parse(JSON.stringify(removeEmptyStringKeys(form)));
    if (o.operateMenu) o.operateMenu = o.operateMenu.join('-');
    try {
      const res: OperationLogDataAPI.OperationLogListFetchRes =
        await API.getOperateLogList({
          ...o,
          pageSize: pagination.pageSize,
          pageNum: pagination.currentPage
        });
      loading.value = false;
      if (res.code) return message(res.msg, { type: 'error' });
      dataList.length = 0;
      dataList.push(...res.data.list);
      pagination.total = res.data.total;
      pagination.pageSize = res.data.pageSize;
      pagination.currentPage = res.data.pageNum;
    } catch (error) {
      loading.value = false;
    }
  }

  const initTypeList = async () => {
    const res: OperationLogDataAPI.OperationLogTypeRes =
      await API.getOperateType();
    if (res.code) return message(res.msg, { type: 'error' });
    operationTypeList.length = 0;
    operationTypeList.push(...res.data);
  };

  const initMenuList = async () => {
    const res: OperationLogDataAPI.OperationMenuTypeRes =
      await API.getOperateMenus();
    if (res.code) return message(res.msg, { type: 'error' });
    res.data = recursiveTransform(res.data);
    searchMenuList.length = 0;
    searchMenuList.push(...res.data);
  };

  const recursiveTransform = data => {
    return data.map(item => {
      const transformedItem = {
        ...item,
        // value: item.id,
        value: item.menuName,
        label: item.menuName
      };
      if (item.children && item.children.length > 0) {
        transformedItem.children = recursiveTransform(item.children);
      }
      return transformedItem;
    });
  };

  onMounted(() => {
    onSearch();
    initTypeList();
    initMenuList();
  });
  return {
    loading,
    columns,
    dataList,
    pagination,
    onSearch,
    handleTableWidthChange,
    switchLoadMap,
    handleCurrentChange,
    switchStyle,
    operationTypeList,
    searchMenuList,
    form
  };
}
