declare namespace EsportsSettlementAPI {
  type ESportMatchList = {
    matchId: number;
    countryId: number;
    sportId: number;
    leagueId: number;
    leagueNameCn: string;
    matchName: string;
    homeTeamId: number;
    homeTeamNameCn: string;
    awayTeamId: number;
    awayTeamNameCn: string;
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
    pandaVideoId: string;
    pandaMatchId: number;
    pandaLinkId: string;
    pandaOppositeStatus: number;
    category?: any;
    halfSettlementStatus: number;
    fullSettlementStatus: number;
    settlementType?: any;
    matchCondition?: any;
    videoReverse: number;
    startTime?: any;
    endTime?: any;
    leagueIds?: any;
    saleHandicaps?: any;
    allHandicaps?: any;
    handicapStatus: number;
    unSettlementEvents?: any;
    pageSize: number;
    pageNum: number;
  }

  type ESportMatchListData = {
    total: number;
    list: ESportMatchList[];
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
    navigatepageNums: number[];
    navigateFirstPage: number;
    navigateLastPage: number;
  }

  type getESportMatchListResType = COMMON.BASE_RES_TYPE<ESportMatchListData>
  type lockESportHandicapResType = COMMON.BASE_RES_TYPE<any>
  type unLockESportHandicapResType = COMMON.BASE_RES_TYPE<any>

  type getESportMatchListReqParams = {
    awayTeamId?: number;
    beginTime?: number;
    beginTimeLong?: number;
    countryId?: number;
    isSale?: number;
    leagueId?: number;
    matchName?: string;
    matchId?: number;
    pageNum?: number;
    pageSize?: number;
    sportId?: number;
    status?: number;
    startTime?: string;
    endTime?: string;
  }

  type BetItemsMapData = {
    betItemsId: number;
    betItemList?: any;
    sportId: number;
    leagueId: number;
    matchId: number;
    matchIdList?: any;
    kindsCode: string;
    betItemsName: string;
    sourceCode: string;
    sourceBetItemsId: number;
    sourceBetItemsMid: number;
    homeOrAway: string;
    handicap: string;
    odds: number;
    isSale: number;
    displayIndex: number;
    handicapIndex: number;
    handicapItemIndex: number;
    oddsType: string;
    handicapFilter: string;
    ctid: number;
    win: number;
    pageSize: number;
    pageNum: number;
    betOptions: number;
    eventTime: number;
    arr: BetItemsMapData[]
  }

  // type bettype = {
  //   key: string;
  //   list: BetItemsMapData[];
  // }

  type BetItemsMap = {
    all?: BetItemsMapData[]
    r1?: BetItemsMapData[]
    r2?: BetItemsMapData[]
    map1?: BetItemsMapData[]
    map2?: BetItemsMapData[]
    q1?: BetItemsMapData[]
    q2?: BetItemsMapData[]
    [key: string]: BetItemsMapData[]
  }

  type ESportMatchById = {
    matchId: number;
    sportId: number;
    beginTime: string;
    beginTimeLong: number;
    status: string;
    leagueId: number;
    leagueNameCn?: any;
    isSale: number;
    homeTeamId: number;
    homeTeamNameCn: string;
    awayTeamId: number;
    awayTeamNameCn: string;
    category: number;
    settlementStatus?: any;
    betItemsMap: BetItemsMap;
  }

  type Data = {
    matchId: number;
    sportId: number;
    beginTime: string;
    beginTimeLong: number;
    status: string;
    leagueId: number;
    leagueNameCn?: any;
    isSale: number;
    homeTeamId: number;
    homeTeamNameCn: string;
    awayTeamId: number;
    awayTeamNameCn: string;
    category: number;
    settlementStatus?: any;
    betItemsMap: BetItemsMap;
  }

  type getESportMatchByIdResType = COMMON.BASE_RES_TYPE<ESportMatchById>
  type manualSettleESportHandicapResType = COMMON.BASE_RES_TYPE<any>
}