import editForm from '../form.vue';
import { message } from '@/utils/message';
import { FormItemProps } from 'element-plus';
import { addDialog } from '@/components/ReDialog';
import type { PaginationProps } from '@pureadmin/table';
import { reactive, ref, onMounted, h } from 'vue';
import { removeEmptyStringKeys } from '@/utils/utilFn';
import { searchFormType } from './types';

export function useLeague() {
  const formRef = ref();
  const dataList = reactive<MetadataAPI.LeagueList[]>([]);
  const loading = ref(true);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const form = reactive<searchFormType>({
    leagueNameCn: '',
    leagueNameEn: '',
    level: '',
    countryId: '',
    leagueId: '',
    leagueId188Bet: '',
    sportId: '',
    category: 0
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

  async function onSearch(type?: string) {
    if (type === 'reload') pagination.currentPage = 1;
    try {
      loading.value = true;
      const res: MetadataAPI.LeagueListRes = await API.getLeagueList({
        ...removeEmptyStringKeys(form),
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

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title: string, row?: MetadataAPI.LeagueList) {
    addDialog({
      title,
      props: {
        formInline: {
          leagueLogo: row?.leagueLogo ?? '',
          leagueId: row?.leagueId ?? '',
          countryId: row?.countryId ?? '',
          leagueId188Bet: row?.leagueId188Bet ?? '',
          leagueNameCn: row?.leagueNameCn ?? '',
          leagueNameEn: row?.leagueNameEn ?? '',
          level: row?.level ?? '',
          sportId: row?.sportId ?? ''
        }
      },
      width: '40%',
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () =>
        h(editForm, { ref: formRef, onReloadTable: () => onSearch() }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(async valid => {
          if (valid) {
            if (row) {
              updateLeague(curData, () => chores());
            } else {
              // 实际开发先调用编辑接口，再进行下面操作
              // chores();
            }
          }
        });
      }
    });
  }

  const updateLeague = async (curData, cb) => {
    const res = await API.updateLeague(curData);
    message(res.msg, { type: res.code ? 'error' : 'success' });
    if (!res.code) cb();
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
    // handleDatabase,
    handleTableWidthChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
