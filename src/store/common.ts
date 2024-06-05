import { defineStore } from "pinia";
import { CommonType } from "./types";

export const useCommonStore = defineStore('COMMONSTORE', {
  state: (): CommonType => ({
    inputLanType: 'zh'   //- 语言类型
  }),
  actions: {
    set_input_lan_type(_: 'zh' | 'en') {
      this.inputLanType = _;
    }
  },
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage, paths: [], }
    ]
  }
});
