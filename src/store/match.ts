import { defineStore } from "pinia";
import { MatchType } from "./types";
import { LeagueClassifyType } from "@/utils/maps/sports_map";

export const useMatchStore = defineStore('MATCHSTATE', {
  state: (): MatchType => ({
    sportLeagueList: [],
    esportLeagueList: [],
    countryList: [],
    settleRequestLoading: false   //- 结算页面searchLoading
  }),
  actions: {
    //- 设置联赛供搜索使用 体育 + 电子竞技
    async set_lagueList(category: LeagueClassifyType, sportId?: number | string) {
      const params = {
        pageSize: 9999,
        pageNum: 1,
        category,
      }
      let listType: string;
      if (category === LeagueClassifyType.SPORT_CLASSIFY) {
        listType = 'sportLeagueList'
        params['sportId'] = sportId;
      } else {
        listType = 'esportLeagueList'
      }
      if (this.esportLeagueList.length && category === 1) return;

      const res: MetadataAPI.LeagueListRes = await API.getLeagueList(params);
      this[listType] = res.data.list;
    },
    async set_countryList() {
      if (this.countryList.length > 0) return;
      const res: MetadataAPI.getCountryListResType = await API.getCountryList({
        pageNum: 1,
        pageSize: 9999
      });
      this.countryList = res.data.list;
    },
    set_settleRequestLoading(_: boolean) {
      this.settleRequestLoading = _;
    }
  },
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage }
    ]
  }
});
