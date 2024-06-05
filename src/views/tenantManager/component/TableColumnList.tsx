import { t } from '@/plugins/i18n';
import { parseCountry } from '@/utils/formatMatch';
import { handleTableWidth } from '@/utils/getTableWidth';
import { ESPORT_ID_MAP } from '@/utils/maps/sports_map';

export const columns: TableColumnList = [
  {
    label: t('序号'),
    type: 'index',
    minWidth: 80,
    headerRenderer: d => handleTableWidth(d, t('序号'), 'auto')
  },
  {
    label: t('商户名称'),
    prop: 'leagueId',
    headerRenderer: d => handleTableWidth(d, t('商户名称'), 'auto')
  },
  {
    label: t('商户类型'),
    prop: 'countryId',
    formatter: ({ countryId }) => parseCountry(countryId),
    headerRenderer: d => handleTableWidth(d, t('商户类型'), 'auto')
  },
  {
    label: t('商户编号'),
    prop: 'leagueId188Bet',
    headerRenderer: d => handleTableWidth(d, t('商户编号'), 'auto')
  },
  {
    label: t('商户标签'),
    formatter: ({ sportId }) =>
      ESPORT_ID_MAP.find(item => item.value === sportId)?.label,
    headerRenderer: d => handleTableWidth(d, t('商户标签'), 'auto')
  },
  {
    label: t('商户等级'),
    prop: 'leagueId188Bet',
    headerRenderer: d => handleTableWidth(d, t('商户等级'), 'auto')
  },
  {
    label: t('抽成比例'),
    prop: 'leagueNameEn',
    headerRenderer: d => handleTableWidth(d, t('抽成比例'), 'auto')
  },
  {
    label: t('商务对接人'),
    prop: 'leagueId188Bet',
    headerRenderer: d => handleTableWidth(d, t('商务对接人'), 'auto')
  },
  {
    label: t('管理员'),
    prop: 'leagueId188Bet',
    headerRenderer: d => handleTableWidth(d, t('商户等级'), 'auto')
  },
  {
    label: t('启动状态'),
    slot: 'status',
    headerRenderer: d => handleTableWidth(d, t('启动状态'), 'auto')
  },
  {
    label: t('注册时间'),
    prop: 'leagueId188Bet',
    headerRenderer: d => handleTableWidth(d, t('注册时间'), 'auto')
  },
  {
    label: t('备注'),
    prop: 'leagueId188Bet',
    headerRenderer: d => handleTableWidth(d, t('备注'), 'auto')
  },
  {
    label: t('操作'),
    slot: 'operation',
    headerRenderer: d => handleTableWidth(d, t('操作'), 'auto')
  }
];
