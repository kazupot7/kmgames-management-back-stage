declare namespace UserMangerAPI {

  type addSysAccountRes = {
    id?: string | number;
    name: string;
    dept: string | number;
    roleId: string | number;
    comment: string;
    status: string | number | boolean;
    pwd: string;
    ukeyCode: string;
    isAdmmin: number;
    avatar: string;
  };

  type querySysAccountListReqType = {
    pageNum?: number;
    pageSize?: number;
    name?: string;
    createdBy?: string;
    startCreatedAt?: string;
    endCreatedAt?: string;
  }

  type querySysAccountListData = {
    id: number;
    name: string;
    pwd: string;
    salt: string;
    dept: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
    updateBy?: any;
    ukeyCode?: any;
    ukeyPassword?: any;
    ukeyType?: any;
    lastLoginTime: string;
    status: number | boolean;
    isAdmin?: any;
    comment: string;
    roleId: number;
    roleName: string;
    createdBy: string;
    lastLoginIp?: any;
  }

  type querySysAccountListInfo = {
    total: number;
    list: querySysAccountListData[];
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
    navigatepageNums?: any;
    navigateFirstPage: number;
    navigateLastPage: number;
  }

  type addSysAccountReqType = COMMON.BASE_RES_TYPE<null>;
  type querySysAccountListResType = COMMON.BASE_RES_TYPE<querySysAccountListInfo>;
  type deleteSysAccountResType = COMMON.BASE_RES_TYPE<any>;
  type updateUserPwdResType = COMMON.BASE_RES_TYPE<any>;
  type updateStatusByIdResType = COMMON.BASE_RES_TYPE<null>;
}