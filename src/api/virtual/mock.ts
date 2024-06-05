

let matchData: VirtualAPI.League[] = [];
for (let i = 0; i < 50; i++) {
  matchData.push({
    key: i,
    leagueId: i + 100000,
    leagueNameCn: `The International - ${i}`,
    leagueNameEn: `The International - ${i}`,
    leagueName: `The International - ${i}`,
    dataSource: `188`,
    dataSourceName: `188`,
    sort: i
  });
}

const fetchVMatchList = ({ pageSize, pageNum }: VirtualAPI.LeagueListFetchProps) => {
  return new Promise<VirtualAPI.LeagueListRes>((resolve, reject) => {
    setTimeout(() => {
      if (matchData.length < pageSize * (pageNum - 1)) {
        reject("There are no sale records");
      }
      const list: VirtualAPI.League[] = matchData.filter(
        (_, index) =>
          index >= pageSize * (pageNum - 1) && index < pageSize * pageNum
      );
      resolve({
        code: 0,
        data: {
          list,
          total: matchData.length,
          pageSize,
          pageNum
        },
        msg: '',
      });
    }, 1000);
  });
};

const createVMatch = (match: VirtualAPI.League) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newEMatch = Object.assign(
        {},
        { ...match, leagueId: matchData[matchData.length - 1].leagueId + 1, sort: matchData[matchData.length - 1].sort + 1 }
      );
      matchData.push(newEMatch);
      resolve({ data: newEMatch });
      reject("rejected");
    }, 1000);
  });
};

const updateVMatch = (updatedMatchData: VirtualAPI.League) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = false;
      matchData = matchData.map((item) => {
        if (item.leagueId === updatedMatchData.leagueId) {
          success = true;
          return updatedMatchData;
        }
        return item;
      });
      if (success) {
        resolve("updated successfully");
      } else {
        reject("there is no leagues matched");
      }
    }, 1000);
  });
};

let teamData: VirtualAPI.Team[] = [];
for (let i = 0; i < 50; i++) {
  teamData.push({
    key: i,
    teamId: i + 100000,
    teamNameCn: `Esports Team ${i}`,
    teamNameEn: `Esports Team ${i}`,
    teamName: `Esports Team ${i}`,
    dataSource: `188`,
    dataSourceName: `188`
  });
}

const fetchVTeamsList = ({ pageSize, pageNum }: VirtualAPI.TeamListFetchProps) => {
  return new Promise<VirtualAPI.TeamListRes>((resolve, reject) => {
    setTimeout(() => {
      if (teamData.length < pageSize * (pageNum - 1)) {
        reject("There are no sale records");
      }
      const list: VirtualAPI.Team[] = teamData.filter(
        (_, index) =>
          index >= pageSize * (pageNum - 1) && index < pageSize * pageNum
      );
      resolve({
        code: 0,
        data: {
          list,
          total: teamData.length,
          pageSize,
          pageNum
        },
        msg: '',
      });
    }, 1000);
  });
};

const createVTeam = (newteamData: VirtualAPI.Team) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newTeam = Object.assign(
        {},
        { ...newteamData, teamId: teamData[teamData.length - 1].teamId + 1 }
      );
      teamData.push(newTeam);
      resolve({ data: newteamData });
      reject("rejected");
    }, 1000);
  });
};

const updateVTeam = (updatedteamData: VirtualAPI.Team) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = false;
      teamData = teamData.map((item) => {
        if (item.teamId === updatedteamData.teamId) {
          success = true;
          return updatedteamData;
        }
        return item;
      });
      if (success) {
        resolve("updated successfully");
      } else {
        reject("there is no teams matched");
      }
    }, 1000);
  });
};

const virtualMock = {
  fetchVMatchList,
  createVMatch,
  updateVMatch,
  fetchVTeamsList,
  createVTeam,
  updateVTeam
};

export default virtualMock;
