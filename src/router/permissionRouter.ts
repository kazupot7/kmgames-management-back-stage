export const permissionData = {
  'Admin1': [
    {
      path: "/permission",
      meta: {
        title: "权限管理",
        icon: "lollipop",
        rank: 20
      },
      children: [
        {
          path: "/permission/page/index",
          name: "PermissionPage",
          meta: {
            title: "页面权限",
            roles: ["Admin", "Associate"]
          }
        },
        {
          path: "/permission/button/index",
          name: "PermissionButton",
          meta: {
            title: "按钮权限",
            roles: ["Admin", "Associate"],
            auths: ["btn_add", "btn_edit", "btn_delete"]
          }
        }
      ]
    }
  ]
}
