import { http } from "@/utils/http";

export const metaData = {
  //- 普通体育
  getLeagueList: (data: MetadataAPI.LeagueListParams) => http.request<MetadataAPI.LeagueListRes>("post", "/league/v1/getLeagueList", { data }),

  updateLeague: (data: MetadataAPI.updateLeagueParamsType) => http.request<MetadataAPI.updateLeagueResType>("post", "/league/v1/updateLeague", { data }),

  getTeamList: (data: MetadataAPI.TeamListParamsType) => http.request<MetadataAPI.TeamListRes>("post", "/team/v1/getTeamList", { data }),

  updateTeam: (data: MetadataAPI.UpdateTeamParamsType) => http.request<MetadataAPI.TeamListRes>("post", "/team/v1/updateTeam", { data }),

  getCountryList: (data: {
    pageNum: number;
    pageSize: number;
  }) => http.request<MetadataAPI.getCountryListResType>("post", "/country/v1/getCountryList", { data }),

  getPlayerList: (data: {
    birthday?: number;
    countryId?: number;
    gender?: number;
    height?: number;
    isCountryPlayer?: number;
    nickName?: number;
    picture?: number;
    pageNum?: number;
    pageSize?: number;
    playerId?: string;
    playerNameCn?: number;
    teamId?: string;
  }) => http.request<MetadataAPI.PlayerListRes>("post", "/player/v1/getPlayerList", { data }),

};
