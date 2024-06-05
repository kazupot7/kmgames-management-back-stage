import { SALE } from "../const_rank";

export default {
  path: "/sale",
  meta: {
    title: '开售管理',
    icon: 'storeFill',
    rank: SALE
  },
  children: [
    {
      path: "/sale/pre_sale",
      name: "pre_sale",
      component: () => import("@/views/sale/pre_sale/index.vue"),
      meta: {
        title: '预开售管理',
        showParent: true,
      }
    },
    // {
    //   path: "/sale/early",
    //   name: "early",
    //   component: () => import("@/views/sale/early/index.vue"),
    //   meta: {
    //     title: t('早盘赛事'),
    //     showParent: true,
    //   }
    // },
    // {
    //   path: "/sale/live",
    //   name: "live",
    //   component: () => import("@/views/sale/live/index.vue"),
    //   meta: {
    //     title: t('滚球赛事'),
    //     showParent: true,
    //   }
    // }
  ]
} as RouteConfigsTable;
