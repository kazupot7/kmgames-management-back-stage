import { t } from "@/plugins/i18n";
import { ACCOUNT } from "../const_rank";

export default {
  path: "/account",
  meta: {
    title: t('账户中心'),
    icon: 'home_8Fill',
    rank: ACCOUNT
  },
  children: [
    {
      path: "/account/info_admin",
      name: "accountInfo",
      component: () => import("@/views/account/info_admin/index.vue"),
      meta: {
        title: t('商户信息管理'),
        showParent: true,
      }
    },
  ]
} as RouteConfigsTable;
