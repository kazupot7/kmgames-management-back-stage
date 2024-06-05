import { http } from "@/utils/http";

export const SysTemConfigData = {

  //- 字典
  getDictList: (data: SysTemConfigAPI.getDictListReq) => http.request<SysTemConfigAPI.getDictListResType>("post", "/sysDict/v1/list", { data }),

  //- 修改角色
  updateDict: (data: {
    id: number;
    dictValue: string;
  }) => http.request<SysTemConfigAPI.updateDictResType>("post", "/sysDict/v1/update", { data }),

  //- 维护列表
  sysMaintainList: () => http.request<SysTemConfigAPI.sysMainListResType>("post", "/sysMaintain/v1/list", {
    data: {},
  }),

  //- 维护状态开启关闭
  sysMaintainUpdateStatus: (data: {
    id: number;
    status: number;
  }) => http.request<SysTemConfigAPI.sysMaintainUpdateStatusResType>("post", "/sysMaintain/v1/updateStatus", { data }),

};
