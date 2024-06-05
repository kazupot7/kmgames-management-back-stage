declare namespace HistoryDataAPI {
  type History = {
    historyId: number;
    league: string;
    leagueLevel: number;
    date: string | Date;
    status: number;
    homeTeam: string;
    score: string;
    awayTeam: string;
    neutral: string;
    businessDataSource: string;
    competitionDataSource: string;
    //   settlementReview: string;
    live: number;
    saleStatus: number;
    earlyDataSource: string;
    earlyGamePlay: string;
    liveDataSource: string;
  };
  type HistoryListFetchProps = COMMON.ListFetchProps & {
    historyId?: number;
  };
  type HistoryListData = COMMON.ListData<History>;
  type HistoryListRes = COMMON.BASE_RES_TYPE<HistoryListData>;
}
