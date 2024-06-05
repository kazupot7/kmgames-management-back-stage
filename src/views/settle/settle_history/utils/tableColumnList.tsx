import dayjs from 'dayjs';
import { handleTableWidth } from '@/utils/getTableWidth';
import {
  HOME_AWAY,
  MATCH_EVENT_CODE,
  MATCH_LEVEL,
  MATCH_STATUS /* PANDA_MATCH_STATUS */
} from '@/utils/maps/sports_map';
import { parseMatchScore } from '@/utils/formatMatch';
// import { parseMatchScore } from '@/utils/formatMatch';

export const columns: TableColumnList = [
  {
    type: 'expand',
    slot: 'expand',
    fixed: true
  },
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
    label: t('比赛时间'),
    prop: 'beginTimeLong',
    minWidth: 200,
    formatter: ({ beginTimeLong }) =>
      dayjs(beginTimeLong).format('YYYY-MM-DD HH:mm:ss'),
    headerRenderer: d => handleTableWidth(d, t('比赛时间'), 'auto')
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
  {
    label: t('比分'),
    prop: 'currentScore',
    minWidth: 150,
    headerRenderer: d => handleTableWidth(d, t('比分'), 'auto'),
    formatter: ({ currentScore }) => {
      return currentScore ? parseMatchScore(currentScore) : '-';
    }
  },
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
    label: t('结算状态'),
    prop: 'halfSettlementStatus',
    formatter: ({ halfSettlementStatus }) =>
      halfSettlementStatus === 0 ? (
        t('未结算')
      ) : (
        <el-text type="danger">{t('已结算')}</el-text>
      ),
    headerRenderer: d => handleTableWidth(d, t('结算状态'))
  },
  {
    label: t('未结算'),
    prop: 'unSettlementEvents',
    headerRenderer: d => handleTableWidth(d, t('未结算')),
    formatter: ({ unSettlementEvents }) => unSettlementEvents ?? '0'
  }
];

export const childColumns: TableColumnList = [
  {
    label: t('主队 : 客队'),
    prop: 't1',
    formatter: ({ t1, t2 }) => {
      return `${t1 ?? '-'} : ${t2 ?? '-'}`;
    }
  },
  {
    label: t('事件编码'),
    prop: 'eventCode',
    headerRenderer: d => handleTableWidth(d, t('事件编码')),
    formatter: ({ eventCode }) => MATCH_EVENT_CODE[eventCode]
  },
  {
    label: t('事件是否有效'),
    slot: 'canceled'
  },
  {
    label: t('結算類型'),
    slot: 'settleType',
    formatter: ({ settleType }) =>
      settleType === 0 ? t('自动结算') : t('人工结算')
  },
  {
    label: t('比赛进行时间'),
    headerRenderer: d => handleTableWidth(d, t('比赛进行时间')),
    formatter: ({ eventTime }) => dayjs(eventTime).format('HH:mm:ss')
  },
  {
    label: t('比赛阶段'),
    headerRenderer: d => handleTableWidth(d, t('比赛阶段')),
    formatter: ({ matchPeriodId }) => MATCH_LEVEL[matchPeriodId]
  },
  {
    label: t('事件来源'),
    prop: 'homeAway',
    formatter: ({ homeAway }) => HOME_AWAY[homeAway]
  },
  // {
  //   label: t('1号球员名称'),
  //   slot: 'player1Name'
  // },
  {
    label: t('结算次数'),
    prop: 'settleTimes',
    formatter: ({ settleTimes }) => settleTimes ?? '-'
  },
  {
    label: t('数据商'),
    slot: 'dataSourceCode'
  }
];
