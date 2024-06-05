import { ESPORTS } from "../const_rank";

export default {
  path: "/esports",
  meta: {
    title: '电子竞技',
    icon: 'esports',
    rank: ESPORTS
  },
  children: [
    {
      path: "/esports/match",
      name: "eMatch",
      component: () => import("@/views/esports/match/index.vue"),
      meta: {
        title: '联赛库',
        showParent: true,
      }
    },
    {
      path: "/esports/team",
      name: "eTeam",
      component: () => import("@/views/esports/team/index.vue"),
      meta: {
        title: '球队库',
        showParent: true,
      }
    }
  ]
} as RouteConfigsTable;
