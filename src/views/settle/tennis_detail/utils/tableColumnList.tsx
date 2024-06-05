// import { parseMatchScore } from '@/utils/formatMatch';

import dayjs from 'dayjs';

export const columns: TableColumnList = [
  {
    type: 'expand',
    slot: 'expand'
  },
  {
    label: t('盘'),
    prop: 'inningNum',
    type: 'index'
    // formatter: ({ inningNum }) => {
    //   return inningNum;
    // }
  },
  {
    headerRenderer: () => history.state.params.homeTeamNameCn ?? '_',
    formatter: ({ t1 }) => {
      return t1;
    }
  },
  {
    headerRenderer: () => history.state.params.awayTeamNameCn ?? '_',
    formatter: ({ t2 }) => {
      return t2;
    }
  },
  {
    label: t('结算时间'),
    formatter: ({ eventTime }) => {
      return eventTime ? dayjs(eventTime).format('HH:mm:ss') : '_';
    }
  },
  {
    label: t('操作人'),
    formatter: ({ createdBy }) => {
      return createdBy ? createdBy : '_';
    }
  },
  {
    label: t('状态'),
    formatter: () => {
      return t('人工结算');
    }
  },
  {
    label: t('操作'),
    slot: 'operation'
  }
];

export const childColumns: TableColumnList = [
  {
    label: t('局'),
    prop: 'inningNum',
    type: 'index'
    // formatter: ({ inningNum }) => {
    //   return inningNum;
    // }
  },
  {
    headerRenderer: () => history.state.params.homeTeamNameCn ?? '_',
    slot: 't1',
    width: 260
  },
  {
    headerRenderer: () => history.state.params.awayTeamNameCn ?? '_',
    slot: 't2',
    width: 260
  },
  {
    label: t('结算时间'),
    slot: 'eventTime',
    width: 300
  },
  {
    label: t('操作人'),
    formatter: ({ updatedBy }) => {
      return updatedBy ?? '_';
    }
  },
  {
    label: t('状态'),
    formatter: () => {
      return t('人工结算');
    }
  },
  {
    label: t('操作'),
    slot: 'childOperation'
  }
];
