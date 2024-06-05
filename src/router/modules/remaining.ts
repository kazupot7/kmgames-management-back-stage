import { t } from "@/plugins/i18n";
import { LOGIN, REDIRECT } from "../const_rank";
const Layout = () => import("@/layout/index.vue");

export default [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      showLink: false,
      rank: LOGIN
    }
  },
  {
    path: "/redirect",
    component: Layout,
    meta: {
      title: "重定向",
      showLink: false,
      rank: REDIRECT
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "Redirect",
        component: () => import("@/layout/redirect.vue")
      }
    ]
  }
] as Array<RouteConfigsTable>;
