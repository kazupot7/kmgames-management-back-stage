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


  type GetRouterTyperes = COMMON.BASE_RES_TYPE<RouterData[]>
}