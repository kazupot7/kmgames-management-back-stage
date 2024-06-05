import { t } from '@/plugins/i18n';
import { parseCountry } from '@/utils/formatMatch';
import { handleTableWidth } from '@/utils/getTableWidth';
import { ESPORT_ID_MAP } from '@/utils/maps/sports_map';

export const columns: TableColumnList = [
  {
    label: t('角色名称'),
    prop: 'name',
    headerRenderer: d => handleTableWidth(d, t('角色名称'), 'auto')
  },
  {
    label: t('创建时间'),
    prop: 'createdAt',
    headerRenderer: d => handleTableWidth(d, t('创建时间'), 'auto')
  },
  {
    label: t('创建人'),
    prop: 'createdBy',
    headerRenderer: d => handleTableWidth(d, t('创建人'), 'auto')
  },
  {
    label: t('使用人数'),
    formatter: ({ userList }) => userList.length,
    headerRenderer: d => handleTableWidth(d, t('使用人数'), 'auto')
  },
  {
    label: t('状态'),
    slot: 'status',
    headerRenderer: d => handleTableWidth(d, t('状态'), 'auto')
  },
  {
    label: t('备注'),
    prop: 'comment',
    formatter: ({ comment }) => comment ?? '-',
    headerRenderer: d => handleTableWidth(d, t('备注'), 'auto')
  },
  {
    label: t('操作'),
    slot: 'operation',
    headerRenderer: d => handleTableWidth(d, t('操作'), 'auto')
  }
];
