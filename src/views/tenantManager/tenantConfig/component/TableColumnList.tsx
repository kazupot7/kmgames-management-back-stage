import { t } from '@/plugins/i18n';
import { handleTableWidth } from '@/utils/getTableWidth';
import dayjs from 'dayjs';
import { TENANT_LEVLE, TENANT_TAG, TENANT_TYPE } from '../utils/map';
import { formtPercentage } from '@/utils/formatNumber';

export const columns: TableColumnList = [
  {
    label: t('序号'),
    type: 'index',
    minWidth: 80,
    headerRenderer: d => handleTableWidth(d, t('序号'), 'auto')
  },
  {
    label: t('商户名称'),
    prop: 'name',
    headerRenderer: d => handleTableWidth(d, t('商户名称'), 'auto')
  },
  {
    label: t('商户类型'),
    prop: 'tenantType',
    formatter: ({ tenantType }) => {
      return tenantType ? TENANT_TYPE.find(_ => _.key === tenantType).val : '-';
    },
    headerRenderer: d => handleTableWidth(d, t('商户类型'), 'auto')
  },
  {
    label: t('商户编号'),
    prop: 'tenantCode',
    headerRenderer: d => handleTableWidth(d, t('商户编号'), 'auto')
  },
  {
    label: t('商户标签'),
    formatter: ({ tenantTag }) => {
      return tenantTag ? TENANT_TAG.find(_ => _.key === tenantTag).val : '-';
    },
    headerRenderer: d => handleTableWidth(d, t('商户标签'), 'auto')
  },
  {
    label: t('商户等级'),
    prop: 'tenantLevel',
    formatter: ({ tenantLevel }) => {
      return tenantLevel
        ? TENANT_LEVLE.find(_ => _.key === tenantLevel).val
        : '-';
    },
    headerRenderer: d => handleTableWidth(d, t('商户等级'), 'auto')
  },
  {
    label: t('抽成比例'),
    prop: 'commissionRatio',
    formatter: ({ commissionRatio }) => {
      return commissionRatio ? formtPercentage(commissionRatio) : '-';
    },
    headerRenderer: d => handleTableWidth(d, t('抽成比例'), 'auto')
  },
  {
    label: t('商户对接人'),
    prop: 'contact',
    headerRenderer: d => handleTableWidth(d, t('商务对接人'), 'auto')
  },
  {
    label: t('管理员'),
    prop: 'adminAccount',
    formatter: ({ adminAccount }) => {
      return adminAccount ?? '-';
    },
    headerRenderer: d => handleTableWidth(d, t('管理员'), 'auto')
  },
  {
    label: t('启动状态'),
    slot: 'status',
    headerRenderer: d => handleTableWidth(d, t('启动状态'), 'auto')
  },
  {
    label: t('注册时间'),
    prop: 'createdAt',
    formatter: ({ createdAt }) => {
      return dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss');
    },
    headerRenderer: d => handleTableWidth(d, t('注册时间'), 'auto')
  },
  {
    label: t('备注'),
    prop: 'comment',
    headerRenderer: d => handleTableWidth(d, t('备注'), 'auto')
  },
  {
    label: t('操作'),
    slot: 'operation',
    minWidth: 150,
    headerRenderer: d => handleTableWidth(d, t('操作'), 'auto', true)
  }
];
