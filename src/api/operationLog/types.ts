declare namespace OperationLogDataAPI {
  type OperationLog = {
    operationLogId: number;
    operationAccount: string;
    resourceName: string;
    operationDateTime: string | Date;
    successOrNot: number;
    operationType: string;
    uniqueId: number;
    leagueId: number;
    beforeOperation: string;
    afterOperation: string;
    extra: string;
  };

  type OperationLogListFetchList = {
    id: number;
    userId: number;
    userName: string;
    requestLog: string;
    operateLog: string;
    operateType: string;
    operateMenu: string;
    operateIp: string;
    operateTime: number;
    createdAt: string;
    updatedAt: string;
  }

  type OperationLogListFetchData = {
    total: number;
    list: OperationLogListFetchList[];
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

  type OperationLogListFetchRes = COMMON.BASE_RES_TYPE<OperationLogListFetchData>;

  type OperationLogTypeRes = COMMON.BASE_RES_TYPE<string[]>;

  type OperationMenuTypeRes = COMMON.BASE_RES_TYPE<OperationMenuTypeChildren[]>;

  type OperationLogListFetchProps = {
    operateLog: string;
    operateMenu: string;
    operateType: string;
    pageNum: number;
    pageSize: number;
    userName: string;
  }

  type OperationMenuTypeChildren = {
    id: number;
    parentId: number;
    menuName: string;
    value?: number;
    label?: string;
    children: OperationMenuTypeChildren[] | null;
  }

}
