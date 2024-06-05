import { http } from "@/utils/http";

export const roleData = {
  //- 新增角色
  addRole: (data: RoleAPI.addSysAccountRes) => http.request<RoleAPI.addSysAccountReqType>("post", "/sysRole/v1/add", { data }),
  //- 修改角色
  updateRole: (data: RoleAPI.addSysAccountRes) => http.request<RoleAPI.addSysAccountReqType>("post", "/sysRole/v1/update", { data }),
  //- 角色列表
  querySysAccountList: (data: RoleAPI.querySysAccountListReqType) => http.request<RoleAPI.querySysAccountListResType>("post", "/sysRole/v1/list", { data }),
  //- 角色删除
  deleteRole: (data: {
    roleId: number
  }) => http.request<RoleAPI.deleteSysAccountResType>("post", "/sysRole/v1/delete", { data }),
  //- 修改角色状态
  updateRoleStatus: (data: {
    roleId: number,
    status: number;
  }) => http.request<RoleAPI.updateStatusByIdResType>("post", "/sysRole/v1/updateStatus", { data }),
  //- 角色菜单列表
  allPermissionList: (data: {
    roleId: number,
  }) => http.request<RoleAPI.allPermissionResType>("post", "/sysResource/v1/allPermission", { data }),
  //- 修改权限菜单
  updateRoleResource: (data: {
    roleId: number,
    resourceList: number[]
  }) => http.request<RoleAPI.allPermissionResType>("post", "/sysRole/v1/updateRoleResource", { data }),
};
