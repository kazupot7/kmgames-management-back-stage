import editForm from '../form.vue';
import { message } from '@/utils/message';
import { ElMessageBox } from 'element-plus';
import { addDialog, closeDialog } from '@/components/ReDialog';
import type { PaginationProps } from '@pureadmin/table';
import { reactive, ref, onMounted, h } from 'vue';
import { removeEmptyStringKeys } from '@/utils/utilFn';
import { searchFormType } from './types';

export function useWhiteHook() {
  const dataList = reactive<TenantAPI.whiteList[]>([]);
  const loading = ref(true);
  const tenantList = reactive<TenantAPI.getAllSimplifiedTenant[]>([]);

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });

  const form = reactive<searchFormType>({
    tenantId: '',
    createdBy: '',
    status: '',
    startCreatedAt: '',
    endCreatedAt: ''
  });

  function handleTableWidthChange(val: number) {
    pagination.pageSize = val;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    onSearch();
  }

  function handleSelectionChange(val) {
    console.log('handleSelectionChange', val);
  }

  //- 初始化
  async function onSearch(type?: string) {
    if (type === 'reload') pagination.currentPage = 1;
    try {
      loading.value = true;
      const res = await API.getWhiteList({
        ...removeEmptyStringKeys(form),
        pageSize: pagination.pageSize,
        pageNum: pagination.currentPage
      });
      loading.value = false;
      if (res.code) return message(res.msg, { type: 'error' });
      res.data.list.forEach(item => (item.status = !!item.status));
      dataList.length = 0;
      dataList.push(...res.data.list);
      pagination.total = res.data.total;
    } catch (error) {
      loading.value = false;
    }
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  //- 新增/修改白名单弹窗
  function openDialog(title: string, row?: TenantAPI.whiteList) {
    addDialog({
      title,
      width: '30%',
      closeOnClickModal: false,
      hideFooter: true,
      contentRenderer: ({ options, index }) =>
        h(editForm, {
          row: {
            id: row?.id ?? '',
            tenantId: row?.tenantId ?? '',
            tenantCode: row?.tenantCode ?? '',
            whiteIp: row?.whiteIp ?? '',
            effectType: row?.effectType ?? '',
            applyBy: row?.applyBy ?? '',
            status: row?.status ?? true
          },
          tenantList,
          onCloseDialog: (closeType?: string) => {
            if (closeType) onSearch('reload');
            closeDialog(options, index);
          }
        })
    });
  }

  //- 删除账号
  const handleDelete = async (row: TenantAPI.whiteList) => {
    ElMessageBox.confirm(`${'确定要删除么？'}`, t('警告'), {
      confirmButtonText: t('确认'),
      cancelButtonText: t('取消'),
      type: 'warning',
      center: true,
      dangerouslyUseHTMLString: true
    }).then(async () => {
      const res = await API.delWhiteList({ id: row.id });
      message(res.msg, { type: res.code ? 'error' : 'success' });
      if (!res.code) onSearch();
    });
  };

  //- 修改启用状态
  const updateWhiteStatus = async (
    row: UserMangerAPI.querySysAccountListData
  ) => {
    return new Promise<boolean>((resolve, reject) => {
      ElMessageBox.confirm(
        +row.status === 1 ? t('确定要关闭么？') : t('确定要开启么?'),
        t('警告'),
        {
          center: true,
          type: 'warning'
        }
      )
        .then(async () => {
          const res = await API.updateStatusWhiteStatus({
            status: +row.status === 0 ? 1 : 0,
            id: row.id
          });
          if (res.code) {
            reject();
          } else {
            resolve(true);
            onSearch();
          }
          message(res.msg, { type: res.code ? 'error' : 'success' });
        })
        .catch(reject);
    });
  };

  const getTenantList = async () => {
    const res = await API.getAllSimplifiedTenants();
    tenantList.length = 0;
    tenantList.push(...res.data);
  };

  onMounted(() => {
    onSearch();
    getTenantList();
  });

  return {
    loading,
    dataList,
    pagination,
    onSearch,
    resetForm,
    openDialog,
    form,
    handleDelete,
    handleTableWidthChange,
    handleCurrentChange,
    handleSelectionChange,
    updateWhiteStatus,
    tenantList
  };
}
