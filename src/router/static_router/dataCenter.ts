import { t } from "@/plugins/i18n";
import { DATA_CENTER } from "../const_rank";

export default {
  path: "/dataCenter",
  meta: {
    title: t('数据中心'),
    icon: 'pieChart_2Fill',
    rank: DATA_CENTER
  },
  children: [
    {
      path: "/dataCenter/trader_bill",
      name: "traderBell",
      component: () => import("@/views/dataCenter/trader_bill/index.vue"),
      meta: {
        title: t('商户注单统计'),
        showParent: true,
      }
    },
    {
      path: "/dataCenter/user_bet",
      name: "userBet",
      component: () => import("@/views/dataCenter/user_bet/index.vue"),
      meta: {
        title: t('用户投注统计'),
        showParent: true,
      }
    },
  ]
} as RouteConfigsTable;
