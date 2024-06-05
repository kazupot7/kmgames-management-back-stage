import { http } from "@/utils/http";

export const tenantData = {
  //- 重新生成谷歌验证器
  genGoogleAuth: (data: { id: number }) => http.request<TenantAPI.genGoogleAuthResType>("post", "/tenants/genGoogleAuth", { data }),

  //- 重置商户谷歌验证码
  resetGoogleAuth: (data: { id: number | string, googleAuth: string | number }) => http.request<TenantAPI.genGoogleAuthResType>("post", "/tenants/resetGoogleAuth", { data }),

  //- 设置商户新密码
  resetAdminPwd: (data: { id: number }) => http.request<TenantAPI.resetAdminPwdResType>("post", "/tenants/resetAdminPwd", { data }),

  //- 修改启动状态
  updateTenantStatus: (data: {
    id: number;
    status: number;
  }) => http.request<TenantAPI.updateTenantStatusResType>("post", "/tenants/updateStatus", { data }),

  //- 商户列表
  getTenantList: (data: TenantAPI.TenantListReqType) => http.request<TenantAPI.getTenantListResType>("post", "/tenants/search", { data }),

  //- 搜索框商户账号获取
  getAllSimplifiedTenants: () => http.request<TenantAPI.getAllSimplifiedTenantsResType>("post", "/tenants/getAllSimplifiedTenants"),

  //- 初始化密钥获取
  genNewAuths: () => http.request<TenantAPI.genNewAuthsResType>("get", "/tenants/genNewAuths"),

  //- 新增表单上级列表
  getSimpleAgents: () => http.request<TenantAPI.getSimpleAgentsResType>("get", "/agents/getSimpleAgents"),

  //- 新增商户
  createTenants: (data: TenantAPI.createTenantsParamsType) => http.request<TenantAPI.updateTenantResType>("post", "/tenants/create", { data }),

  //- 修改商户
  updateTenants: (data: TenantAPI.createTenantsParamsType) => http.request<TenantAPI.updateTenantResType>("post", "/tenants/update", { data }),

  //- 删除商户
  deleteTenants: (data: { id: number }) => http.request<TenantAPI.deleteTenantsResType>("post", "/tenants/del", { data }),

  /* 
  * 白名单接口开始
   */
  //- 白名单列表
  getWhiteList: (data: TenantAPI.getWhiteListReqType) => http.request<TenantAPI.getWhiteListResType>("post", "/sysWhiteConfig/v1/list", { data }),

  //- 添加白名单
  addWhiteList: (data: TenantAPI.SaveWhiteType) => http.request<TenantAPI.SaveWhiteTypeResType>("post", "/sysWhiteConfig/v1/add", { data }),

  //- 修改白名单
  updateWhiteList: (data: TenantAPI.SaveWhiteType) => http.request<TenantAPI.SaveWhiteTypeResType>("post", "/sysWhiteConfig/v1/update", { data }),

  //- 删除白名单
  delWhiteList: (data: { id: number }) => http.request<TenantAPI.SaveWhiteTypeResType>("post", "/sysWhiteConfig/v1/delete", { data }),

  //- 修改白名单状态
  updateStatusWhiteStatus: (data: {
    id: number;
    status: number;
  }) => http.request<TenantAPI.updateWhiteStatusTypeResType>("post", "/sysWhiteConfig/v1/updateStatus", { data }),

};
