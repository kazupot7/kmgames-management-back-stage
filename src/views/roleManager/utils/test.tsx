export const list = [
  {
    enName: 'userManager',
    id: 1,
    name: '用户管理',
    parentId: 0,
    resourceFlag: 1,
    routerPath: '/sysUser/userManager',
    sort: 1,
    type: 0,
    childResourceList: [
      {
        childResourceList: [],
        enName: 'userManagerQuery',
        id: 100,
        name: '页面查看',
        parentId: 1,
        resourceFlag: 1,
        routerPath: '/sysUser/v1/queryUserList',
        sort: 1,
        type: 1
      },
      {
        childResourceList: [],
        enName: 'userManagerAdd',
        id: 101,
        name: '新增用户',
        parentId: 1,
        resourceFlag: 1,
        routerPath: '/sysUser/v1/insert',
        sort: 2,
        type: 1
      }
    ]
  },
  {
    enName: 'tenantManager',
    id: 2,
    name: '商户管理',
    parentId: 0,
    resourceFlag: 1,
    routerPath: '/sysTenant/tenantManager',
    sort: 2,
    type: 0,
    childResourceList: [
      {
        childResourceList: [],
        enName: 'tenantManagerQuery',
        id: 200,
        name: '页面查看',
        parentId: 2,
        resourceFlag: 1,
        routerPath: '/sysTenant/v1/queryTenantList',
        sort: 1,
        type: 1
      },
      {
        childResourceList: [],
        enName: 'tenantManagerAdd',
        id: 201,
        name: '新增商户',
        parentId: 2,
        resourceFlag: 1,
        routerPath: '/sysTenant/v1/insert',
        sort: 2,
        type: 1
      }
    ]
  },
  {
    enName: 'roleManager',
    id: 3,
    name: '角色管理',
    parentId: 0,
    resourceFlag: 1,
    routerPath: '/sysRole/roleManager',
    sort: 3,
    type: 0,
    childResourceList: [
      {
        childResourceList: [
          {
            childResourceList: [],
            enName: 'roleManagerQuery',
            id: 300,
            name: '页面查看',
            parentId: 310,
            resourceFlag: 1,
            routerPath: '/sysRole/v1/queryRoleList',
            sort: 1,
            type: 1
          },
          {
            childResourceList: [],
            enName: 'roleManagerAdd',
            id: 301,
            name: '新增角色',
            parentId: 310,
            resourceFlag: 1,
            routerPath: '/sysRole/v1/insert',
            sort: 2,
            type: 1
          }
        ],
        enName: 'test',
        id: 310,
        name: '测试角色菜单',
        parentId: 3,
        resourceFlag: 1,
        routerPath: '/sysRole/v1/test',
        sort: 1,
        type: 0
      },
      {
        childResourceList: [
          {
            childResourceList: [],
            enName: 'roleManagerUpdate',
            id: 302,
            name: '编辑角色',
            parentId: 311,
            resourceFlag: 1,
            routerPath: '/sysRole/v1/update',
            sort: 3,
            type: 1
          },
          {
            childResourceList: [],
            enName: 'roleManagerDelete',
            id: 303,
            name: '删除角色',
            parentId: 311,
            resourceFlag: 1,
            routerPath: '/sysRole/v1/delete',
            sort: 4,
            type: 1
          }
        ],
        enName: 'test1',
        id: 311,
        name: '测试角色菜单1',
        parentId: 3,
        resourceFlag: 1,
        routerPath: '/sysRole/v1/test1',
        sort: 2,
        type: 0
      }
    ]
  }
];
