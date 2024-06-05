import { http } from "@/utils/http";

export const user = {
  //- 登录
  login: (data: { name: string; pwd: string, ukeyPassword: string }) => http.request<UserAPI.LoginResType>("post", "/auth/login", { data }),
  //- 修改密码
  updatePwd: (data: { id: number; pwd: string, newPwd: string }) => http.request<UserAPI.LoginResType>("post", "/sysUser/v1/updatePwd", { data }),
  //- 获取路由表
  getRouter: (data: { id: number }) => http.request<UserAPI.RouterResType>("post", "/sysRole/v1/getResourcelist", { data }),
  //- 退出登录
  loginOut: (data: { id: number, name: string }) => http.request<UserAPI.RouterResType>("post", "/auth/loginOut", { data }),
};
