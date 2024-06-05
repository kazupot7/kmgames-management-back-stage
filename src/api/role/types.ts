declare namespace RoleAPI {

  type addSysAccountRes = {
    roleId?: string | number;
    roleName: string;
    comment: string;
    status: string | number | boolean;
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
    status: number | boolean;
    createdAt: string;
    createdBy: string;
    comment?: any;
    userCount: number;
    userList: string[];
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

  type ChildResourceList = {
    id: number;
    name: string;
    enName: string;
    routerPath: string;
    parentId: number;
    type: number;
    sort: number;
    resourceFlag: number;
    path: string;
    childResourceList: any[];
  }

  type allPermission = {
    id: number;
    name: string;
    enName: string;
    routerPath: string;
    parentId: number;
    type: number;
    sort: number;
    resourceFlag: number;
    path: string;
    childResourceList: ChildResourceList[];
  }



  type addSysAccountReqType = COMMON.BASE_RES_TYPE<null>;
  type querySysAccountListResType = COMMON.BASE_RES_TYPE<querySysAccountListInfo>;
  type deleteSysAccountResType = COMMON.BASE_RES_TYPE<any>;
  type updateUserPwdResType = COMMON.BASE_RES_TYPE<any>;
  type updateStatusByIdResType = COMMON.BASE_RES_TYPE<null>;
  type allPermissionResType = COMMON.BASE_RES_TYPE<allPermission[]>;
}