import dayjs from 'dayjs';
import { handleTableWidth } from '@/utils/getTableWidth';
import { MATCH_STATUS /* PANDA_MATCH_STATUS */ } from '@/utils/maps/sports_map';
// import { parseMatchScore } from '@/utils/formatMatch';

export const columns: TableColumnList = [
  {
    label: t('序号'),
    fixed: true,
    type: 'index',
    minWidth: 100,
    headerRenderer: d => handleTableWidth(d, t('序号'))
  },
  {
    prop: 'leagueNameCn',
    label: t('联赛名称'),
    fixed: true,
    align: 'left',
    headerRenderer: d => handleTableWidth(d, t('联赛名称'), 'auto'),
    minWidth: 160
  },
  {
    label: t('赛事ID'),
    prop: 'matchId',
    headerRenderer: d => handleTableWidth(d, t('赛事ID'))
  },
  {
    label: t('等级'),
    prop: 'level',
    headerRenderer: d => handleTableWidth(d, t('等级'))
  },
  {
    label: t('开赛时间'),
    prop: 'beginTimeLong',
    minWidth: 200,
    formatter: ({ beginTimeLong }) =>
      dayjs(beginTimeLong).format('YYYY-MM-DD HH:mm:ss'),
    headerRenderer: d => handleTableWidth(d, t('开赛时间'), 'auto')
  },
  {
    label: t('主队'),
    prop: 'homeTeamNameCn',
    minWidth: 150,
    align: 'left',
    formatter: ({ homeTeamNameCn }) => homeTeamNameCn ?? '-',
    headerRenderer: d => handleTableWidth(d, t('主队'), 'auto')
  },
  {
    label: t('客队'),
    prop: 'awayTeamNameCn',
    align: 'left',
    minWidth: 150,
    headerRenderer: d => handleTableWidth(d, t('客队'), 'auto')
  },
  /* {
    label: t('当前比分'),
    prop: 'currentScore',
    minWidth: 150,
    headerRenderer: d => handleTableWidth(d, t('当前比分'), 'auto'),
    formatter: ({ currentScore }) => {
      return currentScore ? parseMatchScore(currentScore) : '-';
    }
  }, */
  {
    label: t('比赛状态'),
    prop: 'status',
    formatter: ({ status }) => MATCH_STATUS[status] ?? '-',
    headerRenderer: d => handleTableWidth(d, t('比赛状态'))
  },
  /* {
    label: t('熊猫匹配结果'),
    prop: 'pandaResult',
    formatter: ({ pandaResult }) => PANDA_MATCH_STATUS[pandaResult],
    headerRenderer: d => handleTableWidth(d, t('熊猫匹配结果'))
  }, */
  {
    label: t('是否中立场地'),
    prop: 'isNeutral',
    formatter: ({ isNeutral }) => (isNeutral ? t('是') : t('否')),
    headerRenderer: d => handleTableWidth(d, t('是否中立场地'))
  },
  {
    label: t('上半场结算'),
    prop: 'halfSettlementStatus',
    formatter: ({ halfSettlementStatus }) =>
      halfSettlementStatus === 0 ? (
        t('未结算')
      ) : (
        <el-text type="danger">{t('已结算')}</el-text>
      ),
    headerRenderer: d => handleTableWidth(d, t('上半场结算'))
  },

  {
    label: t('全场结算'),
    prop: 'fullSettlementStatus',
    fixed: 'right',
    formatter: ({ fullSettlementStatus }) =>
      fullSettlementStatus === 0 ? (
        t('未结算')
      ) : (
        <el-text type="danger">{t('已结算')}</el-text>
      ),
    headerRenderer: d => handleTableWidth(d, t('全场结算'))
  },
  {
    label: t('未结算'),
    prop: 'unSettlementEvents',
    headerRenderer: d => handleTableWidth(d, t('未结算'))
  },
  {
    label: t('操作'),
    slot: 'operation',
    headerRenderer: d => handleTableWidth(d, t('操作'), 'auto'),
    minWidth: 160,
    fixed: 'right'
  }
];
