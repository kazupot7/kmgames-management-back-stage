declare namespace TenantAPI {


  type TenantList = {
    id: number;
    agentId: number;
    name: string;
    tenantCode: string;
    tenantKey: string;
    status: number | boolean;
    comment: string;
    createdAt: string;
    updatedAt: string;
    tenantType?: any;
    tenantTag?: any;
    tenantLevel?: any;
    adminAccount?: any;
    adminPassword?: any;
    googleAuth: string;
    contact?: any;
    iv?: any;
    commissionRatio?: any;
    commissionRatioType: number;
    paymentCycle: number;
    currency: number;
    [key: string]: any;
  }

  type getTenantListData = {
    total: number;
    list: TenantList[];
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
    navigatepageNums: number[];
    navigateFirstPage: number;
    navigateLastPage: number;
  }

  type getAllSimplifiedTenant = {
    id: number;
    name: string;
    tenantCode: string;
  }

  type NewAuths = {
    iv: string;
    googleAuth: string;
    tenantKey: string;
  }

  type simpleAgentList = {
    id: number;
    name: string;
  }

  type TenantListReqType = {
    pageSize?: number;
    pageNum?: number;
    name?: string;
    tenantCode?: string;
    tenantType?: string;
    contact?: string;
    createdAtStart?: string;
    createdAtEnd?: string;
  }

  type getTenantListResType = COMMON.BASE_RES_TYPE<getTenantListData>;
  type deleteSysAccountResType = COMMON.BASE_RES_TYPE<any>;
  type updateUserPwdResType = COMMON.BASE_RES_TYPE<any>;
  type updateStatusByIdResType = COMMON.BASE_RES_TYPE<null>;
  type getAllSimplifiedTenantsResType = COMMON.BASE_RES_TYPE<getAllSimplifiedTenant[]>;
  type genNewAuthsResType = COMMON.BASE_RES_TYPE<NewAuths>;
  type getSimpleAgentsResType = COMMON.BASE_RES_TYPE<simpleAgentList[]>;
  type genGoogleAuthResType = COMMON.BASE_RES_TYPE<[]>;
  type resetAdminPwdResType = COMMON.BASE_RES_TYPE<null>;
  type updateTenantStatusResType = COMMON.BASE_RES_TYPE<null>;
  type updateTenantResType = COMMON.BASE_RES_TYPE<null>;
  type deleteTenantsResType = COMMON.BASE_RES_TYPE<null>;


  type createTenantsParamsType = {
    id?: number | string;
    status: number | string | boolean;
    name: string;
    tenantKey: string | number;
    tenantType: string;
    adminAccount: string;
    tenantCode: string;
    adminPassword: string;
    googleAuth: string | number;
    tenantTag: string;
    contact: string;
    agentId: string | number;
    baseUrlType_40: string | number;
    baseUrlType_50: string | number;
    commissionRatio: string | number;
    tenantLevel: string;
    commissionRatioType: string | number;
    paymentCycle: string | number;
    iv: string;
    baseUrlType_10: string;
    baseUrlType_20: string;
    baseUrlType_21: string;
    currency: string | number;
    comment: string;
  }

  type SaveWhiteType = {
    id?: string | number;
    tenantId?: string | number;
    tenantCode?: string | number;
    whiteIp?: string | number;
    effectType?: string | number;
    applyBy?: string | number;
    status?: string | number | boolean;
  }

  type whiteList = {
    id: number;
    tenantId: number;
    tenantCode?: any;
    whiteIp: string;
    effectType: number;
    status: number | string | boolean;
    applyBy: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
  }

  type getWhiteData = {
    total: number;
    list: whiteList[];
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


  type SaveWhiteTypeResType = COMMON.BASE_RES_TYPE<null>
  type getWhiteListResType = COMMON.BASE_RES_TYPE<getWhiteData>
  type updateWhiteStatusTypeResType = COMMON.BASE_RES_TYPE<null>

  type getWhiteListReqType = {
    pageNum: number;
    pageSize: number;
    createdBy?: string;
    name?: string;
    status?: string;
    startCreatedAt?: string;
    endCreatedAt?: string;
  }
}