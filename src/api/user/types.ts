declare namespace UserAPI {
  type Login_Role = {
    id: number;
    name: string;
    resources?: any;
  }

  type Login_User = {
    id: number;
    email: string;
    roles: Login_Role[];
  }

  type Login_Data = {
    token: string;
    user: Login_User;
  }

  type Login = {
    code: number;
    msg: string;
    data: Login_Data;
  }


  type LoginData = {
    token: string;
    name: string;
    id: number;
    status: number;
    isAdmin: number;
  }

  type LoginResType = COMMON.BASE_RES_TYPE<LoginData>

  type Meta = {
    title?: string;
    icon?: string;
    rank?: number | string;
    enTitle?: string;
    childResourceList?: any[];
    roles?: string[];
  }


  type RouterChildren = {
    path: string;
    name: string;
    enName?: string;
    childResourceList?: any[];
    sort?: string | number;
    meta: Meta;
  }

  type RouterData = {
    path: string;
    name?: string;
    meta: Meta;
    enName?: string;
    childResourceList?: any[];
    sort?: string | number;
    children?: RouterChildren[];
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

  type RouterResData = {
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

  type GetRouterTyperes = COMMON.BASE_RES_TYPE<RouterData[]>
  type RouterResType = COMMON.BASE_RES_TYPE<RouterResData[]>
}