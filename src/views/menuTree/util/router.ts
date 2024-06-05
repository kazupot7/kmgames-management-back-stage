export const router = [
  {
    "path": "/metadata",
    "title": "赛程管理",
    "rank": 1,
    "children": [
      {
        "path": "/metadata/league",
        "title": "联赛管理",
        "showParent": true,
        "rank": "1-0",
      },
      {
        "path": "/metadata/team",
        "title": "球队管理",
        "showParent": true,
        "rank": "1-1",
      }
    ]
  },
  {
    "path": "/sale",
    "title": "开售管理",
    "rank": 0,
    "children": [
      {
        "path": "/sale/pre_sale",
        "title": "预开售管理",
        "showParent": true,
        "rank": "0-0",
      }
    ]
  },
  {
    "path": "/settle",
    "rank": 2,
    "title": "结算平台",
    "children": [
      {
        "path": "/settle/main",
        "title": "结算管理",
        "showParent": true,
        "rank": "2-0",
      },
      {
        "path": "/settle/settle_history",
        "title": "结算历史",
        "showParent": true,
        "rank": "2-1",
      }
    ]
  },
  {
    "path": "/esportsSettlement",
    "rank": 3,
    "title": "电竞结算",
    "children": [
      {
        "path": "/esportsSettlement/match",
        "title": "赛事列表",
        "showParent": true,
        "rank": "3-0",
      },
      {
        "path": "/esportsSettlement/esportsSettlementDetail/:matchId",
        "showLink": false,
        "title": "结算详情",
        "rank": "3-1",
      }
    ]
  },
  {
    "path": "/esports",
    "rank": 4,
    "title": "电子竞技",
    "children": [
      {
        "path": "/esports/match",
        "title": "联赛库",
        "showParent": true,
        "rank": '4-1',
      },
      {
        "path": "/esports/team",
        "title": "球队库",
        "showParent": true,
        "rank": '4-2',
      }
    ]
  },
  {
    "path": "/virtual",
    "rank": 5,
    "title": "虚拟体育",
    "children": [
      {
        "path": "/virtual/match",
        "title": "联赛库",
        "showParent": true,
        "rank": '5-1',
      },
      {
        "path": "/virtual/teams",
        "title": "球队库",
        "showParent": true,
        "rank": '5-2',
      }
    ]
  },
  {
    "path": "/history",
    "rank": 6,
    "title": "赛程历史",
  },
  {
    "path": "/operationLog",
    "rank": 7,
    "title": "操作日志",
  },
  {
    "path": "/menuTree",
    "rank": 8,
    "title": "菜单地图",
  }
]