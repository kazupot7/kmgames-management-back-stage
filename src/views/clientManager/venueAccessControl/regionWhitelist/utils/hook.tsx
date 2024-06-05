import { message } from '@/utils/message';
import { usePublicHooks } from '@/hooks';
import { columns } from '../component/TableColumnList';
import { ElMessageBox } from 'element-plus';

export function useRoleHook() {
  const dataList = reactive<ClientManagerAPI.getCountryRegionWhiteListType[]>(
    []
  );
  const loading = ref(true);
  const { switchStyle } = usePublicHooks();

  //- 初始化
  const onSearch = async () => {
    try {
      loading.value = true;
      const res = await API.getCountryRegionWhiteList();
      loading.value = false;
      if (res.code) return message(res.msg, { type: 'error' });
      res.data.forEach(_ => (_.status = !!_.status));
      dataList.length = 0;
      dataList.push(...res.data);
    } catch (error) {
      loading.value = false;
    }
  };

  const changeOpenStatus = async (
    row: ClientManagerAPI.getCountryRegionWhiteListType
  ) => {
    const res = await API.updateAndAddRaegion({
      status: +row.status === 0 ? 1 : 0,
      id: row.id
    });
    message(res.msg, { type: res.code ? 'error' : 'success' });
    if (!res.code) onSearch();
  };

  //- 修改启用状态
  const updateUserStatus = async (
    row: ClientManagerAPI.getCountryRegionWhiteListType
  ) => {
    return ElMessageBox.confirm(
      +row.status === 1
        ? t('确定要关闭可访问状态么?')
        : t('确定要开启可访问状态么?'),
      t('警告'),
      {
        center: true,
        type: 'warning'
      }
    )
      .then(async () => {
        changeOpenStatus(row);
        return Promise.resolve(true);
      })
      .catch(() => Promise.reject());
  };

  onMounted(() => {
    onSearch();
  });

  return {
    loading,
    columns,
    dataList,
    onSearch,
    switchStyle,
    updateUserStatus
  };
}
