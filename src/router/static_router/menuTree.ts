
export default {
  path: "/menuTree",
  name: "MENUTREE",
  component: () => import("@/views/menuTree/index.vue"),
  meta: {
    "title": "菜单地图",
    "icon": "menuTree",
    "rank": 9
  }
} as RouteConfigsTable;
