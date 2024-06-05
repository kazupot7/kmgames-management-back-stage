import { MATCH_PERIOD } from '@/utils/maps/sports_map';
import dayjs from 'dayjs';
export const columns: TableColumnList = [
  {
    label: t('节'),
    prop: 'matchPeriod',
    slot: 'matchPeriod',
    width: '100px',
    headerRenderer: () => {
      return t('节');
    },
    formatter: ({ matchPeriod }) => {
      return MATCH_PERIOD[matchPeriod];
    }
  },
  {
    minWidth: 100,
    prop: 't1',
    slot: 't1',
    headerSlot: 'header_t1',
    headerRenderer: () => {
      return history.state.params.homeTeamNameCn
        ? history.state.params.homeTeamNameCn
        : '-';
    }
  },
  {
    prop: 't2',
    slot: 't2',
    headerRenderer: () => {
      return history.state.params.awayTeamNameCn
        ? history.state.params.awayTeamNameCn
        : '-';
    }
  },

  {
    label: t('结算时间'),
    minWidth: 100,
    prop: 'eventTime',
    slot: 'eventTime',
    formatter: ({ eventTime }) => {
      console.log(dayjs(eventTime).format('HH:mm:ss'));
      return dayjs(eventTime).format('HH:mm:ss');
    }
  },
  {
    label: t('操作人'),
    minWidth: 100,
    prop: 'createdBy',
    formatter: ({ createdBy }) => {
      return createdBy ? createdBy : '-';
    }
  },
  {
    label: t('状态'),
    minWidth: 100,
    prop: 'settleType',
    formatter: ({ settleType }) => {
      return settleType === '0'
        ? t('自动结算')
        : settleType === 1
        ? t('⼈⼯結算')
        : '-';
    }
  },
  {
    label: t('操作'),
    minWidth: 100,
    slot: 'operation',
    formatter() {
      return '-';
    }
  }
];
