import { t } from "@/plugins/i18n";
import { BET_BILL } from "../const_rank";

export default {
  path: "/betBill",
  meta: {
    title: t('注单管理'),
    icon: 'crown',
    rank: BET_BILL
  },
  children: [
    {
      path: "/betBill/unSettlement/",
      name: "unSettlement",
      component: () => import("@/views/betBill/unSettlement/index.vue"),
      meta: {
        title: t('未结算注单'),
        showParent: true,
      }
    },
    {
      path: "/betBill/settlement",
      name: "settlement",
      component: () => import("@/views/betBill/settlement/index.vue"),
      meta: {
        title: t('已结算注单'),
        showParent: true,
      }
    },
  ]
} as RouteConfigsTable;
