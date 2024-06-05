declare namespace ClientManagerAPI {
  type getCountryRegionWhiteListType = {
    id: number;
    region: string;
    status: number | boolean;
  }

  type getCountryRegionWhiteListResType = COMMON.BASE_RES_TYPE<getCountryRegionWhiteListType[]>
  type updateAndAddRaegionResType = COMMON.BASE_RES_TYPE<null>

  type searchIpData = {
    id: number;
    addr: string;
  }

  type searchIpRes = COMMON.BASE_RES_TYPE<searchIpData[]>
}