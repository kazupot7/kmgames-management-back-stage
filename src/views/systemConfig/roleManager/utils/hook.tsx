import { message } from '@/utils/message';
import editForm from '../form.vue';
import type { PaginationProps } from '@pureadmin/table';
import { usePublicHooks } from '@/hooks';
import { columns } from '../component/TableColumnList';
import { removeEmptyStringKeys } from '@/utils/utilFn';
import { addDialog, closeDialog } from '@/components/ReDialog';
import RoleTree from '../component/RoleTree.vue';
import { SearchFormType } from './types';
import { ElMessageBox } from 'element-plus';

export function useRoleHook() {
  const dataList = reactive<RoleAPI.querySysAccountListData[]>([]);
  const loading = ref(true);
  const whiteFormRef = ref(true);
  const switchLoadMap = ref({});
  const { switchStyle } = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const form = reactive<SearchFormType>({
    name: '',
    createdBy: '',
    status: ' ',
    startCreatedAt: '',
    endCreatedAt: ''
  });

  const handleTableWidthChange = (val: number) => {
    pagination.pageSize = val;
    onSearch();
  };

  const handleCurrentChange = (val: number) => {
    pagination.currentPage = val;
    onSearch();
  };

  //- 初始化
  const onSearch = async (type?: string) => {
    try {
      if (type === 'reload') pagination.currentPage = 1;
      loading.value = true;
      const res = await API.querySysAccountList({
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
  };

  const changeOpenStatus = async (row: RoleAPI.querySysAccountListData) => {
    const res = await API.updateRoleStatus({
      status: +row.status === 0 ? 1 : 0,
      roleId: row.id
    });
    message(res.msg, { type: res.code ? 'error' : 'success' });
    if (!res.code) onSearch();
  };

  //- 修改启用状态
  const updateUserStatus = async (row: RoleAPI.querySysAccountListData) => {
    if (row.userCount > 0 && +row.status === 1) {
      return ElMessageBox.confirm(
        <div class="text-center">
          {t(
            '该角色下仍有{n}个用户,禁用此角色将导致这些用户无法访问系统。是否继续?',
            { n: row.userCount }
          )}
        </div>,
        t('操作提示'),
        {
          center: true,
          type: 'warning'
        }
      )
        .then(async () => {
          await changeOpenStatus(row);
          return Promise.resolve(true);
        })
        .catch(() => Promise.reject());
    } else {
      return ElMessageBox.confirm(
        +row.status === 1
          ? t('确定要关闭当前角色么？')
          : t('确定开启当前角色么?'),
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
    }
  };

  //- 角色弹窗
  function openRoleDialog(
    title: string,
    row?: RoleAPI.querySysAccountListData
  ) {
    addDialog({
      title,
      width: '30%',
      hideFooter: true,
      closeOnClickModal: false,
      alignCenter: true,
      contentRenderer: ({ options, index }) =>
        h(editForm, {
          row: {
            roleName: row?.name ?? '',
            status: row?.status ?? true,
            comment: row?.comment ?? '',
            roleId: row?.id ?? ''
          },
          onCloseDialog: (closeType?: string) => {
            if (closeType) onSearch('reload');
            closeDialog(options, index);
          }
        })
    });
  }

  //- 删除角色
  const handleDelete = (row: RoleAPI.querySysAccountListData) => {
    if (row.userCount > 0) {
      ElMessageBox.confirm(t('角色底下还有用户，不可删除'), t('操作无效'), {
        confirmButtonText: t('朕知道了'),
        showCancelButton: false,
        center: true
      });
    } else {
      ElMessageBox.confirm(
        `<div class="text-center">
       <p>${'确定要删除角色'}${row.name}</br></p>
      <p>${t('角色删除后不可恢复')}</p>
      </div>`,
        t('警告'),
        {
          confirmButtonText: t('提交'),
          cancelButtonText: t('取消'),
          center: true,
          dangerouslyUseHTMLString: true
        }
      ).then(async () => {
        const res = await API.deleteRole({ roleId: row.id });
        message(res.msg, { type: res.code ? 'error' : 'success' });
        if (!res.code) onSearch();
      });
    }
  };

  //- 权限设置弹窗
  const openRoleSettingDialog = (roleId: number) => {
    addDialog({
      title: t('功能权限设置'),
      width: '40%',
      alignCenter: true,
      hideFooter: true,
      closeOnClickModal: false,
      contentRenderer: ({ options, index }) => {
        return h(RoleTree, {
          ref: whiteFormRef,
          roleId,
          onCloseDialog: () => closeDialog(options, index)
        });
      }
    });
  };

  onMounted(() => {
    onSearch();
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
    openRoleDialog,
    switchStyle,
    form,
    openRoleSettingDialog,
    updateUserStatus,
    handleDelete
  };
}
