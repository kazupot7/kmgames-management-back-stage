import { http } from "@/utils/http";

export const operationLogData = {
  getOperateLogList: (
    data: OperationLogDataAPI.OperationLogListFetchProps
  ) => {
    return http.request<OperationLogDataAPI.OperationLogListFetchRes>(
      "post", "/operate/v1/getOperateLogList", { data }
    );
  },
  getOperateType: () => {
    return http.request<OperationLogDataAPI.OperationLogTypeRes>(
      "post", "/operate/v1/getOperateType",
    );
  },
  getOperateMenus: () => {
    return http.request<OperationLogDataAPI.OperationMenuTypeRes>(
      "post", "/operate/v1/getOperateMenus",
    );
  },
};
