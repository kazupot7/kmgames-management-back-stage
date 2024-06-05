import { SETTLE } from '../const_rank';

export default {
  path: '/settle',
  meta: {
    title: '结算平台',
    icon: 'folderFill',
    rank: SETTLE,
    redirect: '/settle/settle_admin'
  },
  children: [
    {
      path: '/settle/settle_admin',
      name: 'settle_admin',
      component: () => import('@/views/settle/settle_admin/index.vue'),
      meta: {
        title: '结算管理',
        showParent: true
      }
    },
    {
      path: '/settle/settle_history',
      name: 'SETTLE_HISTORY',
      meta: {
        title: '结算历史',
        showParent: true
      }
    }
  ]
} as RouteConfigsTable;
