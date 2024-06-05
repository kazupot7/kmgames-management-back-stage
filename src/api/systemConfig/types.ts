declare namespace SysTemConfigAPI {
  type getDictListReq = {
    pageNum: number;
    pageSize: number;
    dictKey?: number | string;
    model?: number | string;
  }

  type DictList = {
    id: number;
    dictKey: string;
    dictValue: string;
    model: number;
    comment?: any;
    updatedAt: string;
    updatedBy: string;
  }

  type getDictListData = {
    total: number;
    list: DictList[];
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

  type getDictListResType = COMMON.BASE_RES_TYPE<getDictListData>
  type updateDictResType = COMMON.BASE_RES_TYPE<null>
}