// import { http } from "@/utils/http";
import virtualMockAPI from './mock'

export const virtualData = {
  getVLeagueList: (data: VirtualAPI.LeagueListFetchProps) => {
    // return http.request<VirtualAPI.LeagueListRes>("post", "/league/v1/getLeagueList", { data })
    return virtualMockAPI.fetchVMatchList(data)
  },

  createVMatch: (props: VirtualAPI.League) => {
    // return http.request<VirtualAPI.TeamListRes>("post", "/team/v1/getTeamList", { data })
    return virtualMockAPI.createVMatch(props);
  },

  updateVMatch: (props: VirtualAPI.League) => {
    // return http.request<VirtualAPI.TeamListRes>("post", "/team/v1/getTeamList", { data })
    return virtualMockAPI.updateVMatch(props);
  },

  getVTeamList: (data: VirtualAPI.TeamListFetchProps) => {
    // return http.request<VirtualAPI.TeamListRes>("post", "/team/v1/getTeamList", { data })
    return virtualMockAPI.fetchVTeamsList(data)
  },

  createVTeam: (props: VirtualAPI.Team) => {
    // return http.request<VirtualAPI.TeamListRes>("post", "/team/v1/getTeamList", { data })
    return virtualMockAPI.createVTeam(props);
  },

  updateVTeam: (props: VirtualAPI.Team) => {
    // return http.request<VirtualAPI.TeamListRes>("post", "/team/v1/getTeamList", { data })
    return virtualMockAPI.updateVTeam(props);
  }

};
