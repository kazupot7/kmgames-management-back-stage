import { http } from "@/utils/http";

export const user = {
  login: (data: { email: string; password: string }) => http.request<UserAPI.Login>("post", "/auth/v1/login", { data }),
  me: () => http.request<UserAPI.Login_User>("get", "/user/v1/me"),
  getRouter: () => http.request<UserAPI.GetRouterTyperes>("get", "/getRouter"),
};
