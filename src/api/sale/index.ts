import { http } from "@/utils/http";

export const saleData = {
  getPreSaleList: (data: {
    matchId?: number;
    matchName?: number;
    isSale?: number;
    beginTime?: string;
    pageNum?: number;
    sportId?: number;
    pageSize?: number;
    matchCondition?: number;
    startTime?: string;
    endTime?: string;
  }) => http.request<SaleDataAPI.PreSaleListRes>("post", "/match/v1/getPreSaleList", { data }),

  getBetItemsList: (data: {
    matchId: number;
  }) => http.request<SaleDataAPI.getBetItemsListResType>("post", "/betItems/v1/getBetItemsList", { data }),

  /** 投注玩法锁盘  */
  saleBetItems: (data: {
    matchId: number;
    betItemList: string[],
  }) => http.request<SaleDataAPI.saleBetItemsResType>("post", "/betItems/v1/saleBetItems", { data }),

  /** 投注玩法批量开启  */
  openSaleBetItems: (data: {
    matchId: number;
    betItemList: string[],
  }) => http.request<SaleDataAPI.saleBetItemsResType>("post", "/betItems/v1/openSaleBetItems", { data }),

  /** 赛事批量锁盘  */
  saleBetItemsByMatchIds: (data: {
    matchIdList: number[],
  }) => http.request<SaleDataAPI.saleBetItemsResType>("post", "/betItems/v1/saleBetItemsByMatchIds", { data }),

  /** 赛事批量解锁  */
  openBetItemsByMatchId: (data: {
    matchIdList: number[],
  }) => http.request<SaleDataAPI.saleBetItemsResType>("post", "/betItems/v1/openBetItemsByMatchId", { data }),

  updateSaleStatus: (data: {
    isSale: number;
    matchId: number;
  }) => http.request<MetadataAPI.TeamListRes>("post", "/match/v1/updateSaleStatus", { data }),

  updateMatch: (data: SaleDataAPI.UpdateMatchParamsType) => http.request<SaleDataAPI.UpdateMatchResType>("post", "/match/v1/updateMatch", { data }),

  getMorningSets: (data: {
    matchId?: number;
    matchName?: number;
    isSale?: number;
    beginTime?: string;
    pageNum?: number;
    pageSize?: number;
  }) => http.request<SaleDataAPI.PreSaleListRes>("post", "/match/v1/getMorningSets", { data }),

  getRollingBall: (data: {
    matchId?: number;
    matchName?: number;
    isSale?: number;
    beginTime?: string;
    pageNum?: number;
    pageSize?: number;
  }) => http.request<SaleDataAPI.PreSaleListRes>("post", "/match/v1/getRollingBall", { data }),
};
