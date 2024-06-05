import { t } from '@/plugins/i18n';

export const columns: TableColumnList = [
  {
    label: t('国家/地区'),
    prop: 'region'
  },
  {
    label: t('可访问状态'),
    slot: 'status'
  }
];
