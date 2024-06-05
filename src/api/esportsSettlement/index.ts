import { http } from "@/utils/http";

export const esportsSettlement = {

  getESportMatchList: (data: EsportsSettlementAPI.getESportMatchListReqParams) => http.request<EsportsSettlementAPI.getESportMatchListResType>("post", "/eSport/v1/getESportMatchList", { data }),

  lockESportHandicap: (data: { matchId: number }) => http.request<EsportsSettlementAPI.lockESportHandicapResType>("post", "/eSport/v1/lockESportHandicap", { data }),

  unLockESportHandicap: (data: { matchId: number }) => http.request<EsportsSettlementAPI.unLockESportHandicapResType>("post", "/eSport/v1/unLockESportHandicap", { data }),

  getESportMatchById: (data: { matchId: number }) => http.request<EsportsSettlementAPI.getESportMatchByIdResType>("post", "/eSport/v1/getESportMatchById", { data }),

  manualSettleESportHandicap: (data: {
    matchId: number;
    betResultItems: {
      betItemId: number;
      betResult: number;
      handicap: string;
      kindsCode: string;
    }[]
  }) => http.request<EsportsSettlementAPI.manualSettleESportHandicapResType>("post", "/eSport/v1/manualSettleESportHandicap", { data }),
};
