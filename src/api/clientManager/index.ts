import { http } from "@/utils/http";

export const clientManagerData = {
  //- 获取白名单
  getCountryRegionWhiteList: () => http.request<ClientManagerAPI.getCountryRegionWhiteListResType>("post", "/regionWhiteList/searchRegion", {}),
  //-修改国家白名单状态
  updateAndAddRaegion: (data: {
    id: number;
    status: number;
  }) => http.request<ClientManagerAPI.updateAndAddRaegionResType>("post", "/regionWhiteList/updateAndAddRegion", { data }),
  //-获取白名单IP
  searchIp: () => http.request<ClientManagerAPI.searchIpRes>("post", "/regionWhiteList/searchIp", {}),
  //- 修改IP
  updateIp: (data: { addr: string }) => http.request<ClientManagerAPI.searchIpRes>("post", "/regionWhiteList/updateIp", { data }),
};
