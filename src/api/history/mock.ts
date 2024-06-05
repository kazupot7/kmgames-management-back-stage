let data: HistoryDataAPI.History[] = [];

for (let i = 0; i < 50; i++) {
  data.push({
    historyId: i,
    league: `league-${i}`,
    leagueLevel: i,
    date: new Date().toLocaleDateString(),
    status: i % 3,
    homeTeam: `主队名称-${i}`,
    score: "1 : 1",
    awayTeam: `主队名称-${i}`,
    neutral: `中立场-${i}`,
    businessDataSource: `商业数据源-${i}`,
    competitionDataSource: `精品数据源-${i}`,
    live: i % 2,
    saleStatus: i % 3,
    earlyDataSource: "早盘主数据源",
    earlyGamePlay: "早盘开售玩法",
    liveDataSource: "滚球主数据源"
  });
}

const fetchHistoryList = (fetchProps: HistoryDataAPI.HistoryListFetchProps) => {
  return new Promise<HistoryDataAPI.HistoryListRes>((resolve, reject) => {
    setTimeout(() => {
      const { pageSize, pageNum } = fetchProps;
      if (data.length < pageSize * (pageNum - 1)) {
        reject("There are no histories match");
      }
      const list = data.filter(
        (_, index) =>
          index >= pageSize * (pageNum - 1) && index < pageSize * pageNum
      );
      resolve({
        code: 0,
        data: { list, total: data.length, pageSize, pageNum },
        msg: ""
      });
    }, 1000);
  });
};

const historyMock = { fetchHistoryList };

export default historyMock;
