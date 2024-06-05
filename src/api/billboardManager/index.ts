import { http } from "@/utils/http";

export const billboardManagerData = {
  //- 添加公告
  addSBillboard: (data: BillboardManagerAPI.addSysAccountRes) => http.request<BillboardManagerAPI.addSysAccountReqType>("post", "/sysBillboard/v1/add", { data }),

  //- 修改公告
  updateBillboardList: (data: BillboardManagerAPI.addSysAccountRes) => http.request<BillboardManagerAPI.addSysAccountReqType>("post", "/sysBillboard/v1/update", { data }),

  //- 修改公告发送状态
  updateBillboardStatus: (data: {
    id: number;
    status: number;
  }) => http.request<BillboardManagerAPI.addSysAccountReqType>("post", "/sysBillboard/v1/updateStatus", { data }),

  //- 全部公告分页查询接口
  getBillboardList: (data: BillboardManagerAPI.querySysAccountListReqType) => http.request<BillboardManagerAPI.getBillboardListResType>("post", "/sysBillboard/v1/list", { data }),

  //- 删除公告
  deleteBillboard: (data: {
    id: number
  }) => http.request<BillboardManagerAPI.deleteSysAccountResType>("post", "/sysBillboard/v1/delete", { data }),
};
