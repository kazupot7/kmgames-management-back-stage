import { depList } from '../utils/map';

export const columns: TableColumnList = [
  {
    label: t('序号'),
    type: 'index',
    minWidth: 100
  },
  {
    label: t('公告标题'),
    minWidth: 150,
    prop: 'name'
  },
  {
    label: t('公告类别'),
    prop: 'dept',
    minWidth: 150,
    formatter: ({ dept }): string => {
      return depList.find(item => +item.key === +dept)?.val;
    }
  },
  {
    label: t('公告内容'),
    prop: 'roleName',
    minWidth: 230
  },
  {
    label: t('创建人'),
    minWidth: 200,
    prop: 'createdAt'
  },
  {
    label: t('发送时间'),
    minWidth: 200,
    prop: 'lastLoginTime'
  },
  {
    label: t('建立时间'),
    prop: 'lastLoginIp'
  },
  {
    label: t('操作'),
    minWidth: 200,
    slot: 'operation'
  }
];
