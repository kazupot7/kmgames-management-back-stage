import { OPERATION_LOG } from "../const_rank";

export default {
  path: "/operationLog",
  name: "operationLog",
  component: () => import("@/views/operationLog/index.vue"),
  meta: {
    title: "操作日志",
    icon: "operationLog",
    rank: OPERATION_LOG
  }
} as RouteConfigsTable;
