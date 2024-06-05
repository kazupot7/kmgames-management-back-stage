import dayjs from 'dayjs';
import { NAV_TITLE_NAME } from './map';

export const columns: TableColumnList = [
  {
    label: t('盘口ID'),
    prop: 'sourceBetItemsMid'
  },
  {
    label: t('盘口名称'),
    prop: 'betItemsName',
    minWidth: 200
  },
  {
    label: t('所属局数'),
    prop: 'level',
    formatter: ({ handicapFilter }) => {
      return handicapFilter
        ? NAV_TITLE_NAME[JSON.parse(handicapFilter).toString()]
        : '-';
    }
  },
  {
    label: t('盘口投注项'),
    slot: 'betOptions',
    minWidth: 300
  },
  {
    label: t('操作'),
    slot: 'operaction',
    minWidth: 200
  },
  {
    label: t('结算状态'),
    prop: 'win',
    formatter: ({ win }) => (win === null ? t('未结算') : t('已结算'))
  },
  {
    label: t('结算时间'),
    prop: 'eventTime',
    minWidth: 150,
    formatter: ({ eventTime }) =>
      eventTime ? dayjs(eventTime).format('YYYY-MM-DD HH:mm:ss') : '-'
  }
];
