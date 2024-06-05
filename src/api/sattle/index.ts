import { http } from "@/utils/http";

export const sattleData = {
  getSettlementList: (data: SattleDataAPI.getSettlementListPrams) => http.request<SattleDataAPI.getSettlementListRes>("post", "/match/v1/getSettlementList", { data }),

  //- 体育结算历史
  getSettlementHistory: (data: SattleDataAPI.getSettlementHistoryParams) => http.request<SattleDataAPI.getSettlementListRes>("post", "/match/v1/getSettlementHistory", { data }),

  getMatchEvents: (data: {
    matchId: number;
  }) => http.request<SattleDataAPI.getMatchEventsRes>("post", "/event/v1/getMatchEvents", { data }),

  getBasketballEvents: (data: {
    matchId: number;
  }) => http.request<SattleDataAPI.getBasketballEventRes>("post", "/basketball/v1/getBasketballEvents", { data }),

  addMatchEvent: (data: SattleDataAPI.MatchEventParams) => http.request<MetadataAPI.TeamListRes>("post", "/event/v1/addMatchEvent", { data }),

  addBasketballEvent: (data: SattleDataAPI.MatchEventParams) => http.request<MetadataAPI.AddBasketballEeventRes>("post", "/basketball/v1/addBasketballEvent", { data }),

  allBasketballSettlement: (data: { matchId: number }) => http.request<MetadataAPI.AddBasketballEeventRes>("post", '/basketball/v1/manualSettlementFullTime', { data }),

  updateMatchEvent: (data: SattleDataAPI.MatchEventParams) => http.request<SaleDataAPI.PreSaleListRes>("post", "/event/v1/updateMatchEvent", { data }),

  deleteMatchEvent: (data: { id: number }) => http.request<SaleDataAPI.deleteMatchEventRes>("post", "/event/v1/deleteMatchEvent", { data }),

  firstHalfSettlement: (data: {
    matchId: number;
  }) => http.request<SaleDataAPI.allSettlementRes>("post", "/event/v1/firstHalfSettlement", { data }),

  allSettlement: (data: {
    matchId: number;
  }) => http.request<SaleDataAPI.allSettlementRes>("post", "/event/v1/allSettlement", { data }),

  //- 足球结算自动结算转手动结算
  setManualMatchStatus: (data: {
    matchId: number;
  }) => http.request<SaleDataAPI.setManualMatchStatusResType>("post", "/event/v1/setManualMatchStatus", { data }),

  //- 足球结算取消事件
  cancelMatchEvent: (data: SattleDataAPI.cancelMatchEventParams) => http.request<SaleDataAPI.cancelMatchEventResType>("post", "/event/v1/cancelMatchEvent", { data }),

  //-网球结算赛事列表
  getTennisEvents: (data: {
    matchId: number;
  }) => http.request<SattleDataAPI.getTennisEventsResType>("post", "/tennis/v1/getTennisEvents", { data }),

  //-网球新增事件（按盘）
  addTennisEvent: (data:
    SattleDataAPI.addTennisEventReq
  ) => http.request<SattleDataAPI.addTennisEventResType>("post", "/tennis/v1/addTennisEvent", { data }),

  //-斯诺克新增事件（按局）
  addSnookerEvent: (data:
    SattleDataAPI.SnookerEventReq
  ) => http.request<SattleDataAPI.addTennisEventResType>("post", "/snooker/v1/addSnookerEvent", { data }),


  //-排球新增事件（按局）
  addVolleyballEvent: (data:
    SattleDataAPI.SnookerEventReq
  ) => http.request<SattleDataAPI.addTennisEventResType>("post", "/volleyball/v1/addVolleyballEvent", { data }),

  //-斯诺克结算事件列表
  getSnookerEvents: (data: {
    matchId: number;
  }) => http.request<SattleDataAPI.getSnookerEventsResType>("post", "/snooker/v1/getSnookerEvents", { data }),

  //-排球结算事件列表
  getVolleyballEvents: (data: {
    matchId: number;
  }) => http.request<SattleDataAPI.getVolleyballEventsResType>("post", "/volleyball/v1/getVolleyballEvents", { data }),

  //-排球全场结算（按盘）
  manualSettlementFullTime: (data:
    { matchId: number }
  ) => http.request<SattleDataAPI.manualSettlementFullTimeRestType>("post", "/tennis/v1/manualSettlementFullTime", { data }),

  //-排球全场结算（按盘）
  volleyballManualSettlementFullTime: (data:
    { matchId: number }
  ) => http.request<SattleDataAPI.manualSettlementFullTimeRestType>("post", "/volleyball/v1/manualSettlementFullTime", { data }),

  //-斯诺克全场结算（按盘）
  snookerManualSettlementFullTime: (data:
    { matchId: number }
  ) => http.request<SattleDataAPI.manualSettlementFullTimeRestType>("post", "/snooker/v1/manualSettlementFullTime", { data }),

  //- 获取单个赛事信息
  getPreSaleInfo: (data:
    { matchId: number }
  ) => http.request<SattleDataAPI.preSaleInfoResType>("post", "/match/v1/getPreSaleInfo", { data }),
};
