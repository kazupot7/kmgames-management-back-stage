declare namespace BillboardManagerAPI {

  /* 
  传标题：billboardTitleCn，英文billboardTitleEn,类型：中文billboardTypeCn，英文billboardTypeEn,内容：中文billboardContentCn，英文billboardContentEn
   */
  type addSysAccountRes = {
    id?: string | number;
    billboardTitleCn: string;
    billboardTitleEn: string;
    billboardTypeCn: string;
    billboardTypeEn: string;
    billboardContentCn: string;
    billboardContentEn: string;
  };
  type querySysAccountListReqType = {
    pageNum: number;
    pageSize: number;
    billboardTitleCn?: string;
    billboardTitleEn?: string;
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

  type BillboardList = {
    id: number;
    billboardTitleCn: string;
    billboardTitleEn: string;
    billboardTypeCn: string;
    billboardTypeEn: string;
    billboardContentCn: string;
    billboardContentEn: string;
    status: number | boolean;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    sendAt?: any;
  }

  type BillboardData = {
    total: number;
    list: BillboardList[];
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
  type getBillboardListResType = COMMON.BASE_RES_TYPE<BillboardData>;
  type deleteSysAccountResType = COMMON.BASE_RES_TYPE<any>;
  type updateUserPwdResType = COMMON.BASE_RES_TYPE<any>;
  type updateStatusByIdResType = COMMON.BASE_RES_TYPE<null>;
}