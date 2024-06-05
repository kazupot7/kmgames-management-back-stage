import { handleTableWidth } from '@/utils/getTableWidth';
import dayjs from 'dayjs';
import {
  ESPORT_ID_MAP,
  ESPORT_MATCH_STATUS,
  HANDICAP_STATUS
} from '@/utils/maps/sports_map';

export const columns: TableColumnList = [
  {
    label: t('序号'),
    type: 'index',
    headerRenderer: d => handleTableWidth(d, t('序号'), 'auto'),
    minWidth: 100
  },
  {
    label: t('联赛名称'),
    prop: 'leagueNameCn',
    headerRenderer: d => handleTableWidth(d, t('联赛名称'), 'auto'),
    formatter: ({ leagueNameCn }) => leagueNameCn || '-',
    align: 'left',
    minWidth: 200
  },
  {
    label: t('联赛ID'),
    prop: 'leagueId',
    headerRenderer: d => handleTableWidth(d, t('联赛ID'), 'auto')
  },
  {
    label: t('游戏ID'),
    prop: 'sportId',
    minWidth: 150,
    headerRenderer: d => handleTableWidth(d, t('游戏ID'), 'auto')
  },
  {
    label: t('游戏名称'),
    prop: 'matchName',
    minWidth: 200,
    formatter: ({ sportId }) =>
      ESPORT_ID_MAP.find(_ => _.value === sportId)?.label ?? '-'
  },
  {
    label: t('赛事ID'),
    prop: 'matchId',
    headerRenderer: d => handleTableWidth(d, t('赛事ID'), 'auto'),
    minWidth: 140
  },
  {
    label: t('比赛队伍'),
    slot: 'matchTeam',
    minWidth: 260,
    headerRenderer: d => handleTableWidth(d, t('比赛队伍'), 'auto'),
    align: 'left'
  },
  {
    label: t('开赛时间'),
    prop: 'beginTimeLong',
    formatter: ({ beginTimeLong }) =>
      dayjs(beginTimeLong).format('YYYY-MM-DD HH:mm:ss'),
    headerRenderer: d => handleTableWidth(d, t('开赛时间'), 'auto'),
    minWidth: 160,
    align: 'left'
  },
  {
    label: t('赛事状态'),
    headerRenderer: d => handleTableWidth(d, t('赛事状态'), 'auto'),
    minWidth: 180,
    formatter: ({ status }) => ESPORT_MATCH_STATUS[status] ?? '-'
  },
  {
    label: t('锁盘状态'),
    prop: 'handicapStatus',
    headerRenderer: d => handleTableWidth(d, t('锁盘状态'), 'auto'),
    formatter: ({ handicapStatus }): string => HANDICAP_STATUS[handicapStatus],
    minWidth: 150
  },
  {
    label: t('锁盘控制'),
    slot: 'handicapStatus',
    headerRenderer: d => handleTableWidth(d, t('锁盘控制'), 'auto')
  },
  {
    label: t('结算盘口'),
    fixed: 'right',
    slot: 'operation',
    headerRenderer: d => handleTableWidth(d, t('结算盘口'), 'auto'),
    minWidth: 150
  }
];
