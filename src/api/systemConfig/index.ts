import { http } from "@/utils/http";

export const SysTemConfigData = {

  //- 字典
  getDictList: (data: SysTemConfigAPI.getDictListReq) => http.request<SysTemConfigAPI.getDictListResType>("post", "/sysDict/v1/list", { data }),

  //- 修改角色
  updateDict: (data: {
    id: number;
    dictValue: string;
  }) => http.request<SysTemConfigAPI.updateDictResType>("post", "/sysDict/v1/update", { data }),
};
