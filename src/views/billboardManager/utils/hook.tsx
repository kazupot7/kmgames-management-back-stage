import editForm from '../form.vue';
import { message } from '@/utils/message';
import { ElMessageBox } from 'element-plus';
import { addDialog, closeDialog } from '@/components/ReDialog';
import type { PaginationProps } from '@pureadmin/table';
import { reactive, ref, onMounted, h } from 'vue';
import { removeEmptyStringKeys } from '@/utils/utilFn';
import { searchFormType } from './types';
import ConfirmDialog from '../component/ConfirmDialog.vue';

export function useBillboardManager() {
  const dataList = reactive<BillboardManagerAPI.BillboardList[]>([]);
  const loading = ref(true);

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });

  const form = reactive<searchFormType>({
    billboardTitleCn: '',
    billboardTitleEn: '',
    billboardTypeCn: '',
    billboardTypeEn: '',
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
      const res = await API.getBillboardList({
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

  //- 新增/修改账号弹窗
  function openDialog(title: string, row?: BillboardManagerAPI.BillboardList) {
    addDialog({
      title,
      width: '30%',
      closeOnClickModal: false,
      hideFooter: true,
      contentRenderer: ({ options, index }) =>
        h(editForm, {
          renderData: {
            billboardTitleEn: row?.billboardTitleEn ?? '',
            billboardTitleCn: row?.billboardTitleCn ?? '',
            billboardTypeCn: row?.billboardTypeCn ?? '',
            billboardTypeEn: row?.billboardTypeEn ?? '',
            billboardContentCn: row?.billboardContentCn ?? '',
            billboardContentEn: row?.billboardContentEn ?? '',
            billClassify: row?.billClassify ?? -1,
            id: row?.id ?? ''
          },
          onCloseDialog: (closeType?: string) => {
            if (closeType) onSearch('reload');
            closeDialog(options, index);
          }
        })
    });
  }

  //- 删除公告
  const handleDelete = async (
    row: BillboardManagerAPI.querySysAccountListData
  ) => {
    ElMessageBox.confirm(
      `<div class="text-center">
       <p>${t('确定要删除公告')}</p>
      <p>${t('公告删除后不可恢复')}</p>
      <p>${t('一旦删除此公告，所有语言版本的公告都会删除')}</p>
      </div>`,
      t('警告'),
      {
        confirmButtonText: t('提交'),
        cancelButtonText: t('取消'),
        type: 'warning',
        center: true,
        dangerouslyUseHTMLString: true
      }
    ).then(async () => {
      const res = await API.deleteBillboard({ id: row.id });
      message(res.msg, { type: res.code ? 'error' : 'success' });
      if (!res.code) onSearch();
    });
  };

  //- 点击查看详情弹窗
  const showDetailDialog = row => {
    addDialog({
      title: t('发送确认'),
      width: '40%',
      closeOnClickModal: false,
      hideFooter: true,
      contentRenderer: ({ options, index }) =>
        h(ConfirmDialog, {
          inputData: row,
          isOnlyShow: true,
          onCloseDialog: () => {
            closeDialog(options, index);
          }
        })
    });
  };

  //- 修改发送状态
  const updateUserStatus = async (row: BillboardManagerAPI.BillboardList) => {
    return new Promise<boolean>((resolve, reject) => {
      ElMessageBox.confirm(
        +row.status === 1 ? t('确定要关闭发送么？') : t('确定开启发送么?'),
        t('警告'),
        {
          center: true,
          type: 'warning'
        }
      )
        .then(async () => {
          const res = await API.updateBillboardStatus({
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

  onMounted(() => {
    onSearch();
  });

  return {
    loading,
    dataList,
    pagination,
    // buttonClass,
    onSearch,
    resetForm,
    openDialog,
    form,
    handleDelete,
    handleTableWidthChange,
    handleCurrentChange,
    handleSelectionChange,
    updateUserStatus,
    showDetailDialog
  };
}
