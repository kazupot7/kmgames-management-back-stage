import { EFFECT_TYPE } from '../utils/map';
export const columns: TableColumnList = [
  {
    label: t('序号'),
    type: 'index',
    minWidth: 100
  },
  {
    label: t('商户名称'),
    minWidth: 150,
    slot: 'tenantId'
  },
  {
    label: t('商户编号'),
    slot: 'tenantCode',
    minWidth: 200
  },
  {
    label: t('白名单IP'),
    prop: 'whiteIp',
    minWidth: 230,
    formatter: ({ whiteIp }): string => {
      return whiteIp
        ? whiteIp.split(',').map(item => <div class="text-center">{item}</div>)
        : '-';
    }
  },
  {
    label: t('作用域'),
    minWidth: 200,
    formatter: ({ effectType }): string => {
      return effectType
        ? EFFECT_TYPE.find(item => item.key === effectType).val
        : '-';
    }
  },
  {
    label: t('启用状态'),
    slot: 'status'
  },
  {
    label: t('申请人'),
    prop: 'applyBy'
  },
  {
    label: t('创建人'),
    prop: 'createdBy',
    minWidth: 150
  },
  {
    label: t('最后操作人'),
    minWidth: 150,
    formatter: ({ updatedBy }): string => {
      return updatedBy ?? '-';
    }
  },
  {
    label: t('注册时间'),
    prop: 'createdAt',
    minWidth: 200
  },
  {
    label: t('操作时间'),
    prop: 'updatedAt',
    minWidth: 200
  },
  {
    label: t('操作'),
    minWidth: 200,
    slot: 'operation',
    fixed: 'right'
  }
];
