import { defineStore } from "pinia";
import { store } from "@/store";
import { userType } from "./types";
import { routerArrays } from "@/layout/types";
import { router, resetRouter } from "@/router";
import { storageSession } from "@pureadmin/utils";
import { useMultiTagsStoreHook } from "@/store/multiTags";
import { type DataInfo, removeStorage, sessionKey, TokenKey } from "@/utils/auth";

export const useUserStore = defineStore('USERSTATE', {
  state: (): userType => ({
    roles: storageSession().getItem<DataInfo<{ id: number; name: string; resources: null }>>(sessionKey)?.roles.map(_ => _.name) ?? [],
    userInfo: {} as UserAPI.LoginData,
    token: '',
  }),
  actions: {
    SET_ROLES(roles: Array<string>) {
      this.roles = roles;
    },
    async loginByUsername(_data) {
    },
    logOut() {
      this.roles = [];
      removeStorage();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      this.userInfo = {};
      router.push("/login");
    },
    setUserInfo(_: UserAPI.LoginData) {
      this.userInfo = Object.assign(this.userInfo, _)
      this.token = _.token;
      storageSession().setItem(sessionKey, this.userInfo);
      storageSession().setItem(TokenKey, this.token);
    },
  },
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage }
    ]
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
