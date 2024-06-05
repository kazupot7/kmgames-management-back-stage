import { http } from "@/utils/http";

export const esportData = {
  getESportsLeagueList: (data: ESportsAPI.ESportsLeagueListParams) => http.request<ESportsAPI.ESportsLeagueListType>("post", "/league/v1/getESportsLeagueList", { data }),
  getESportsTeamList: (data: ESportsAPI.ESportsTeamListParams) => http.request<ESportsAPI.ESportsTeamListResType>("post", "/team/v1/getESportsTeamList", { data }),

  createEMatch: (data: any) => {
    return http.request<ESportsAPI.TeamListRes>("post", "/team/v1/getTeamList", { data })
    // return esportsMockAPI.createEMatch(props);
  },

  updateEMatch: (data: {
    countryId?: number;
    leagueId?: number;
    leagueId188Bet?: number;
    leagueLogo?: number;
    leagueNameCn?: number;
    level?: number;
    leagueNameEn?: number;
    sportId?: number;
  }) => {
    return http.request<ESportsAPI.updateLeagueResType>("post", "/league/v1/updateESportsLeague", { data })
  },

  // getETeamList: (data: ESportsAPI.TeamListFetchProps) => {
  //   // return http.request<ESportsAPI.TeamListRes>("post", "/team/v1/getTeamList", { data })
  //   return esportsMockAPI.fetchETeamsList(data)
  // },

  // createETeam: (props: ESportsAPI.Team) => {
  //   // return http.request<ESportsAPI.TeamListRes>("post", "/team/v1/getTeamList", { data })
  //   return esportsMockAPI.createETeam(props);
  // },

  // updateETeam: (props: ESportsAPI.Team) => {
  //   // return http.request<ESportsAPI.TeamListRes>("post", "/team/v1/getTeamList", { data })
  //   return esportsMockAPI.updateETeam(props);
  // }

};
