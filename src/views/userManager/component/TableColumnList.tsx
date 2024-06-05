import { parseCountry } from '@/utils/formatMatch';
import { ESPORT_ID_MAP, SPORT_ID_MAP } from '@/utils/maps/sports_map';

export const columns: TableColumnList = [
  {
    label: t('联赛ID'),
    prop: 'leagueId',
    minWidth: 100
  },
  // {
  //   label: t('联赛Logo'),
  //   prop: 'leagueLogo',
  //   minWidth: 120,
  //   formatter: ({ leagueLogo }) => (leagueLogo ? leagueLogo : '-')
  // },
  {
    label: t('国家地区'),
    prop: 'countryId',
    minWidth: 150,
    formatter: ({ countryId }) => parseCountry(countryId)
  },
  {
    label: t('188数据源联赛杯赛ID'),
    prop: 'leagueId188Bet',
    minWidth: 150
  },
  {
    label: t('联赛中文名'),
    prop: 'leagueNameCn',
    minWidth: 150,
    align: 'left'
  },
  {
    label: t('联赛英文名'),
    prop: 'leagueNameEn',
    minWidth: 150,
    align: 'left'
  },
  {
    label: t('联赛等级'),
    sortable: true,
    prop: 'level',
    minWidth: 150
  },
  {
    label: t('赛种'),
    prop: 'sportId',
    formatter: ({ sportId, category }): string => {
      const arr = category === 1 ? ESPORT_ID_MAP : SPORT_ID_MAP;
      return arr.find(_ => _.value === sportId)?.label ?? '-';
    },
    minWidth: 150
  },
  {
    label: t('操作'),
    fixed: 'right',
    width: 240,
    slot: 'operation'
  }
];
