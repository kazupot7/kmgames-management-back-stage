declare namespace SaleDataAPI {
  type PreSaleList = {
    matchId: number;
    countryId: number;
    sportId: number | string;
    leagueId: number;
    matchName: string;
    homeTeamId: number;
    awayTeamId: number;
    beginTime: string;
    beginTimeLong: number;
    playingField: string;
    isNeutral: number;
    level: number;
    isSale: number;
    videoUrl: string;
    status: string;
    currentScore: string;
    currentTime: string;
    currentPc: string;
    pandaResult: number;
    pandaMatchId: number;
    matchId188bet: number;
    awayTeamNameCn: string;
    homeTeamNameCn: string;
    halfSettlementStatus: number;
    fullSettlementStatus: number;
    showPopover?: boolean;
    saleHandicaps: number;
    allHandicaps: number;
    leagueNameCn: string;
    handicapStatus: number;
  }

  type ChildrenDataList = {
    type: string;
    key: string;
    tableList: SattleDataAPI.MatchEventsList[]
  };

  type PreSaleListData = {
    total: number;
    list: PreSaleList[];
    pageNum: number;
    pageSize: number;
    size: number;
    startRow: number;
    endRow: number;
    pages: number;
    prePage: number;
    nextPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    navigatePages: number;
    leagueNameCn: string;
    navigatepageNums: number[];
    navigateFirstPage: number;
    navigateLastPage: number;
  }

  type TeamList = {
    teamId: number;
    countryId: number;
    sportId: number;
    leagueId: number;
    teamNameCn: string;
    teamNameEn: string;
    teamLogo: string;
    level: number;
    isCountryTeam?: number;
    [key: string]: any;
  }

  type UpdateMatchParamsType = {
    beginTime: string;
    level: number;
    matchId: number;
    matchName: string;
    sportId: string;
  }

  type getBetItemsListDataType = {
    betItemsId: number;
    sportId: number;
    leagueId: number;
    matchId: number;
    kindsCode: string;
    betItemsName: string;
    sourceCode: string;
    sourceBetItemsId: number;
    sourceBetItemsMid: number;
    homeOrAway: string;
    handicap: string;
    source_handicap: string;
    odds: number;
    isSale: number;
    displayIndex: number;
    handicapIndex: number;
    handicapItemIndex: number;
    oddsType: string;
    handicapFilter: string;
    ctid: number;
  }

  type getBetItemsListResType = COMMON.BASE_RES_TYPE<getBetItemsListDataType[]>;
  type saleBetItemsResType = COMMON.BASE_RES_TYPE<any>;





  type PreSaleListRes = COMMON.BASE_RES_TYPE<PreSaleListData>;
  type deleteMatchEventRes = COMMON.BASE_RES_TYPE<any>;
  type allSettlementRes = COMMON.BASE_RES_TYPE<any>;
  type UpdateMatchResType = COMMON.BASE_RES_TYPE<any>;
  type setManualMatchStatusResType = COMMON.BASE_RES_TYPE<any>;
  type cancelMatchEventResType = COMMON.BASE_RES_TYPE<any>;


}