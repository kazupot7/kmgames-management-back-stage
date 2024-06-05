export const columns: TableColumnList = [
  {
    label: t('序号'),
    type: 'index',
    minWidth: 100
  },
  {
    label: t('平台'),
    minWidth: 150,
    formatter: ({ platformType }) => (platformType === 1 ? 'PC' : 'H5')
  },
  {
    label: t('维护时间'),
    minWidth: 200,
    prop: 'updatedAt'
  },
  {
    label: t('操作人'),
    minWidth: 150,
    prop: 'updatedBy'
  },
  {
    label: t('状态'),
    slot: 'status'
  },
  {
    label: t('备注'),
    prop: 'comment'
  }
];
