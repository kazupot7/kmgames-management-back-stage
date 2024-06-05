import { depList } from '../utils/map';

export const columns: TableColumnList = [
  {
    label: t('序号'),
    type: 'index',
    minWidth: 100
  },
  {
    label: t('账号'),
    minWidth: 150,
    prop: 'name'
  },
  {
    label: t('所属部门'),
    prop: 'dept',
    minWidth: 150,
    formatter: ({ dept }): string => {
      return depList.find(item => +item.key === +dept)?.val;
    }
  },
  {
    label: t('所属角色'),
    prop: 'roleName',
    minWidth: 150
  },
  {
    label: t('U盾序列号'),
    prop: 'roleName',
    minWidth: 150,
    formatter: ({ ukeyCode }): string => {
      return ukeyCode ?? '-';
    }
  },
  {
    label: t('创建时间'),
    minWidth: 200,
    prop: 'createdAt'
  },
  {
    label: t('上次登录时间'),
    minWidth: 200,
    prop: 'lastLoginTime'
  },
  {
    label: t('上次登录IP'),
    prop: 'lastLoginIp',
    formatter: ({ lastLoginIp }): string => {
      return lastLoginIp ?? '-';
    }
  },
  {
    label: t('创建人'),
    prop: 'createdBy',
    minWidth: 150
  },
  {
    label: t('备注信息'),
    prop: 'comment',
    minWidth: 150,
    formatter: ({ comment }): string => {
      return comment ?? '-';
    }
  },
  {
    label: t('启用状态'),
    slot: 'openStatus'
  },
  {
    label: t('重置密码'),
    prop: 'resetPassword',
    slot: 'resetPassword',
    minWidth: 150
  },
  {
    label: t('操作'),
    minWidth: 200,
    slot: 'operation'
  }
];
