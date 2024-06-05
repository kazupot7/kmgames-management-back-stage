import { METADATA } from "../const_rank";

export default {
  path: "/metadata",
  meta: {
    title: '赛程管理',
    icon: 'crown',
    rank: METADATA
  },
  children: [
    {
      path: "/metadata/league",
      name: "League",
      component: () => import("@/views/metadata/league/index.vue"),
      meta: {
        title: '联赛管理',
        showParent: true,
      }
    },
    {
      path: "/metadata/team",
      name: "team",
      component: () => import("@/views/metadata/team/index.vue"),
      meta: {
        title: '球队管理',
        showParent: true,
      }
    },
  ]
} as RouteConfigsTable;
