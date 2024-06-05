// import { http } from "@/utils/http";
import historyMock from "./mock";

export const historyData = {
  getHistoryList: (data: HistoryDataAPI.HistoryListFetchProps) => {
    // return http.request<HistoryDataAPI.HistoryListRes>(
    //   "post",
    //   "/match/v1/getHistoryList",
    //   {
    //     data
    //   }
    // );
    return historyMock.fetchHistoryList(data);
  }
};
