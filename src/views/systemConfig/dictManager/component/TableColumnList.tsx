import { getLan } from '@/utils/utilFn';
import { PLAY_MAP } from '@/utils/maps/sports_map';

export const columns: TableColumnList = [
  {
    label: t('序号'),
    type: 'index',
    minWidth: 100
  },
  {
    label: 'Key',
    minWidth: 150,
    prop: 'dictKey'
  },
  {
    label: t('值 value'),
    minWidth: 150,
    prop: 'dictValue'
  },
  {
    label: t('模块 model'),
    formatter: ({ model }) => {
      const lan = getLan();
      return PLAY_MAP.find(item => item.idx === model)?.val[lan];
    }
  },
  {
    label: t('备注'),
    prop: 'comment',
    minWidth: 230,
    formatter: ({ comment }) => comment ?? '-'
  },
  {
    label: t('修改时间'),
    minWidth: 200,
    prop: 'updatedAt'
  },
  {
    label: t('修改人'),
    prop: 'updatedBy'
  },
  {
    label: t('操作'),
    slot: 'operation'
  }
];
