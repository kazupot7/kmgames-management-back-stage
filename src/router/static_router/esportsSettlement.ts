import { ESPORTSSETTLEMENT } from '../const_rank';

export default {
  path: '/esportsSettlement',
  meta: {
    title: '电竞结算',
    icon: 'esportsSettlement',
    rank: ESPORTSSETTLEMENT
  },
  children: [
    {
      path: '/esportsSettlement/match',
      name: 'ESPORTSSETTLEMENT_MATCH',
      component: () => import('@/views/esportsSettlement/match/index.vue'),
      meta: {
        title: '赛事列表',
        showParent: true
      }
    },
    {
      path: '/esportsSettlement/esportsSettlementDetail/:matchId',
      component: () => import('@/views/esportsSettlement/esportsSettlementDetail/index.vue'),
      name: 'ESPORTSSETTLEMENT_ESPORTSSETTLEMENTDETAIL',
      meta: {
        showLink: false,
        title: '结算详情'
      }
    }
  ]
} as RouteConfigsTable;
