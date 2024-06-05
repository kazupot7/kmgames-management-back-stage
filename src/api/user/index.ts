import { http } from "@/utils/http";

export const user = {
  login: (data: { name: string; pwd: string }) => http.request<UserAPI.LoginResType>("post", "/auth/login", { data }),

  updatePwd: (data: { id: number; pwd: string, newPwd: string }) => http.request<UserAPI.LoginResType>("post", "/sysUser/v1/updatePwd", { data }),

  getRouter: (data: { id: number }) => http.request<UserAPI.RouterResType>("post", "/sysRole/v1/getResourcelist", { data }),

  me: () => http.request<UserAPI.Login_User>("get", "/user/v1/me"),

};
