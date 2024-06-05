import { message } from '@/utils/message';
import editForm from '../form.vue';
import type { PaginationProps } from '@pureadmin/table';
import { usePublicHooks } from '@/hooks';
import { columns } from '../component/TableColumnList';
import { removeEmptyStringKeys } from '@/utils/utilFn';
import { addDialog, closeDialog } from '@/components/ReDialog';
import { ElMessageBox } from 'element-plus';

export function useTenantHook() {
  const dataList = reactive<TenantAPI.TenantList[]>([]);
  const loading = ref(true);
  const switchLoadMap = ref({});
  const { switchStyle } = usePublicHooks();
  const tenantList = reactive<TenantAPI.getAllSimplifiedTenant[]>([]);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const form = reactive({
    name: '',
    tenantCode: '',
    tenantType: ' ',
    contact: '',
    createdAtStart: '',
    createdAtEnd: ''
  });

  function handleTableWidthChange(val: number) {
    pagination.pageSize = val;
    onSearch();
  }
  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    onSearch();
  }

  //- 获取账号列表
  const initAccountList = async () => {
    const res = await API.getAllSimplifiedTenants();
    if (res.code) return;
    tenantList.length = 0;
    tenantList.push(...res.data);
  };

  //- 初始化
  async function onSearch(type?: string) {
    if (type === 'reload') pagination.currentPage = 1;
    loading.value = true;
    const res = await API.getTenantList({
      ...removeEmptyStringKeys(form),
      pageSize: pagination.pageSize,
      pageNum: pagination.currentPage
    });
    loading.value = false;
    if (res.code) return message(res.msg, { type: 'error' });
    dataList.length = 0;
    res.data.list.forEach(item => (item.status = !!item.status));
    dataList.push(...res.data.list);
    pagination.total = res.data.total;
  }

  //- 新增修改弹窗
  function openDialog(title: string, row?: TenantAPI.TenantList) {
    addDialog({
      title,
      width: '45%',
      draggable: true,
      closeOnClickModal: false,
      alignCenter: true,
      hideFooter: true,
      contentRenderer: ({ options, index }) =>
        h(editForm, {
          formInline: {
            id: row?.id ?? '',
            status: row?.status ?? false, //- 状态开关
            name: row?.name ?? '', //- 商户名称
            tenantKey: row?.tenantKey ?? '', //- 商户密钥 新增接口获取
            tenantType: row?.tenantType ?? '', //- 商户类型
            adminAccount: 'admin', //- 管理员
            tenantCode: row?.tenantCode ?? '', //- 商户编码
            adminPassword: row?.adminPassword ?? '123456', //- 管理员密码
            googleAuth: row?.googleAuth ?? '', // - 谷歌密钥 接口获取
            tenantTag: row?.tenantTag ?? '', //- 商户标签
            contact: row?.contact ?? '', //- 对接人
            agentId: row?.agentId ?? '', //- 上级 接口获取
            baseUrlType_40: row?.baseUrlType_40 ?? '', //-钱包 加扣款
            baseUrlType_50: row?.baseUrlType_50 ?? '', //-钱包 回调
            commissionRatio: +row?.commissionRatio ?? '', // - 抽成比例
            tenantLevel: row?.tenantLevel ?? '', //- 商户等级
            commissionRatioType: row?.commissionRatioType ?? '', //- 计算模式
            paymentCycle: row?.paymentCycle ?? '', //-  缴费周期
            iv: row?.iv ?? '', //- iv
            baseUrlType_10: row?.baseUrlType_10 ?? '', //- API
            baseUrlType_20: row?.baseUrlType_20 ?? '', //- web
            baseUrlType_21: row?.baseUrlType_21 ?? '', //- h5
            currency: row?.currency ?? '', //- 结算币种
            comment: row?.comment ?? '' //- 备注
          },
          onCloseDialog(type: 'reload') {
            closeDialog(options, index);
            if (type) {
              initAccountList();
              onSearch(type);
            }
          }
        })
    });
  }

  //- 修改商户启用状态
  const updateTenantStatus = async (row: TenantAPI.TenantList) => {
    return new Promise<boolean>((resolve, reject) => {
      ElMessageBox.confirm(
        +row.status === 1 ? t('确定要关闭商户么？') : t('确定开启商户么?'),
        t('警告'),
        {
          center: true,
          type: 'warning'
        }
      )
        .then(async () => {
          const res = await API.updateTenantStatus({
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

  //- 删除商户
  const delTenantClick = async row => {
    ElMessageBox.confirm(`${'确定要删除当前商户么？'}`, t('警告'), {
      confirmButtonText: t('确认'),
      cancelButtonText: t('取消'),
      type: 'warning',
      center: true,
      dangerouslyUseHTMLString: true
    }).then(async () => {
      const res = await API.deleteTenants({ id: row.id });
      message(res.msg, { type: res.code ? 'error' : 'success' });
      if (!res.code) {
        onSearch();
        initAccountList();
      }
    });
  };

  onMounted(() => {
    onSearch();
    initAccountList();
  });
  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    tenantList,
    switchLoadMap,
    switchStyle,
    onSearch,
    handleTableWidthChange,
    handleCurrentChange,
    openDialog,
    updateTenantStatus,
    delTenantClick
  };
}
