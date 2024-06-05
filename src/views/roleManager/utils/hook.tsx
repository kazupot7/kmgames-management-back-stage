import { message } from '@/utils/message';
import editForm from '../form.vue';
import type { PaginationProps } from '@pureadmin/table';
// import { addDialog } from '@/components/ReDialog';
// import { t } from '@/plugins/i18n';
import { usePublicHooks } from '@/hooks';
import { columns } from '../component/TableColumnList';
import { removeEmptyStringKeys } from '@/utils/utilFn';
import { addDialog, closeDialog } from '@/components/ReDialog';
import RoleTree from '../component/RoleTree.vue';

export function useRoleHook() {
  const dataList = reactive<ESportsAPI.ESportsLeagueListArrType[]>([]);
  const loading = ref(true);
  const switchLoadMap = ref({});
  const { switchStyle } = usePublicHooks();
  const formRef = ref();
  const whiteFormRef = ref();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const form = reactive({
    leagueNameCn: '',
    leagueNameEn: '',
    level: '',
    countryId: '',
    leagueId: '',
    leagueId188Bet: '',
    sportId: ''
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
    const res: ESportsAPI.ESportsLeagueListType =
      await API.getESportsLeagueList({
        ...removeEmptyStringKeys(form),
        pageSize: pagination.pageSize,
        pageNum: pagination.currentPage
      });
    if (res.code) return message(res.msg, { type: 'error' });
    dataList.length = 0;
    dataList.push(...res.data.list);
    pagination.total = res.data.total;
    pagination.pageSize = res.data.pageSize;
    pagination.currentPage = res.data.pageNum;
    setTimeout(() => (loading.value = false), 500);
  }

  //- 角色弹窗
  function openRoleDialog(
    title: string,
    row?: ESportsAPI.ESportsLeagueListArrType
  ) {
    addDialog({
      title,
      props: {
        formInline: row
      },
      width: '35%',
      draggable: true,
      closeOnClickModal: false,
      alignCenter: true,

      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline;
        function chores() {
          done();
          onSearch();
        }
        FormRef.validate(async valid => {
          if (valid) {
            if (title === '新增') {
              await API.createEMatch(curData);
              chores();
            } else {
              const res = await API.updateEMatch(curData);
              message(res.msg, { type: res.code ? 'error' : 'success' });
              chores();
            }
          }
        });
      }
    });
  }

  const openRoleSettingDialog = () => {
    addDialog({
      title: t('功能权限设置'),
      width: '40%',
      draggable: true,
      hideFooter: true,
      closeOnClickModal: false,
      contentRenderer: ({ options, index }) => {
        return h(RoleTree, {
          ref: whiteFormRef,
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
    openRoleSettingDialog
  };
}
