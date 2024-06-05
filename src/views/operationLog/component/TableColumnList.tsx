import dayjs from 'dayjs';
import { t } from '@/plugins/i18n';
import { handleTableWidth } from '@/utils/getTableWidth';

export const columns: TableColumnList = [
  {
    label: 'ID',
    prop: 'id'
  },
  {
    label: t('创建时间'),
    prop: 'createdAt',
    formatter: ({ createdAt }) =>
      `${dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}`,
    headerRenderer: d => handleTableWidth(d, t('创建时间'), 'auto'),
    minWidth: 160
  },
  {
    label: t('操作人Ip'),
    prop: 'operateIp',
    headerRenderer: d => handleTableWidth(d, t('操作人Ip'))
  },
  {
    label: t('操作记录'),
    prop: 'operateLog',
    headerRenderer: d => handleTableWidth(d, t('操作记录'))
  },
  {
    label: t('操作日志菜单'),
    prop: 'operateMenu',
    headerRenderer: d => handleTableWidth(d, t('操作日志菜单'), 'auto'),
    minWidth: 160
  },
  {
    label: t('接口响应时长'),
    headerRenderer: d => handleTableWidth(d, t('接口响应时长')),
    prop: 'operateTime'
  },
  {
    label: t('操作类型'),
    headerRenderer: d => handleTableWidth(d, t('操作类型')),
    prop: 'operateType'
  },
  {
    label: t('请求参数'),
    slot: 'requestLog',
    headerRenderer: d => handleTableWidth(d, t('请求参数'))
  },
  {
    label: t('更新时间'),
    prop: 'updatedAt',
    headerRenderer: d => handleTableWidth(d, t('更新时间'), 'auto'),
    formatter: ({ updatedAt }) =>
      `${dayjs(updatedAt).format('YYYY-MM-DD HH:mm:ss')}`,
    minWidth: 160
  },
  {
    label: t('操作人id'),
    headerRenderer: d => handleTableWidth(d, t('操作人id')),
    prop: 'userId'
  },
  {
    label: t('操作用户名'),
    headerRenderer: d => handleTableWidth(d, t('操作用户名')),
    prop: 'userName'
  }
];
