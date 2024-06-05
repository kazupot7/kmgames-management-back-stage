import { t } from "@/plugins/i18n";


export const PLAY_MAP = [
  { idx: 1, val: { zh: '足球', en: 'SOCCER' } },
  { idx: 2, val: { zh: '篮球', en: 'BASKETBALL' } },
  { idx: 3, val: { zh: '网球', en: 'TzhNIS' } },
  // { idx: 4, val: { zh: '电子竞技', en: 'ESPORT' } },
  { idx: 5, val: { zh: '斯诺克/台球', en: 'SNOOKER' } },
  { idx: 6, val: { zh: '排球', en: 'VOLLEYBALL' } },
  { idx: 7, val: { zh: '特别项目', en: 'SPECIAL' } },
  { idx: 8, val: { zh: '飞镖', en: 'BOOMERANG' } },
  { idx: 9, val: { zh: '橄榄球', en: 'RUGBY' } },
  { idx: 10, val: { zh: '拳击/格斗', en: 'BOXING' } },
  { idx: 11, val: { zh: '手球', en: 'HANDBALL' } },
  { idx: 12, val: { zh: '冰球', en: 'ICE_HOCKEY' } },
  { idx: 13, val: { zh: '板球', en: 'CRICKET' } },
  { idx: 14, val: { zh: '金融投注', en: 'FINANCE' } },
  { idx: 15, val: { zh: '彩票', en: 'LOTTERY' } },
  { idx: 16, val: { zh: '美式足球', en: 'AMERICAN_FOOTBALL' } },
  { idx: 17, val: { zh: '高尔夫球', en: 'GOLF' } },
  { idx: 18, val: { zh: '棒球', en: 'BASEBALL' } },
  { idx: 19, val: { zh: '羽毛球', en: 'BADMINTON' } },
  { idx: 20, val: { zh: '选美大赛', en: 'BEAUTY_CONTEST' } },
  { idx: 21, val: { zh: '赛车', en: 'RACING' } },
  { idx: 22, val: { zh: '沙滩足球', en: 'BEACH_SOCCER' } },
  { idx: 23, val: { zh: '乒乓球', en: 'PING_PONG' } },
  { idx: 24, val: { zh: '垒球', en: 'SOFTBALL' } },
  { idx: 25, val: { zh: '室内足球', en: 'INDOOR_SOCCER' } },
  { idx: 26, val: { zh: '沙滩排球', en: 'BEACH_VOLLEYBALL' } },
  { idx: 27, val: { zh: '冬季运动', en: 'WINTER_SPORTS' } },
  { idx: 28, val: { zh: '曲棍球', en: 'HOCKEY' } },
  { idx: 29, val: { zh: '自行车', en: 'BICYCLE' } },
  { idx: 30, val: { zh: '体操', en: 'GYMNASTICS' } },
  { idx: 31, val: { zh: '田径', en: 'TRACK_AND_FIELD_EVzhTS' } },
  { idx: 32, val: { zh: '更多运动', en: 'MORE' } },
  { idx: 33, val: { zh: '水上运动', en: 'WATER_SPORTS' } },
  { idx: 276, val: { zh: 'DOTA2', en: 'DOTA2' } },
  { idx: 277, val: { zh: 'CS:GO/CS2', en: 'CSGO' } },
  { idx: 278, val: { zh: '英雄联盟', en: 'LOL' } },
  { idx: 279, val: { zh: '王者荣耀', en: 'KING' } },
];


export const SPORT_ID_MAP = [
  { label: t('足球'), value: 1, type: 'FootBall' },
  { label: t('篮球'), value: 2, type: 'BasketBall' },
  { label: t('网球'), value: 3, type: 'Tennis' },
  // { label: t('电子竞技'), value: 4, type: 'FootBall' },
  { label: t('斯诺克/台球'), value: 5, type: 'Billiards' },
  { label: t('排球'), value: 6, type: 'Volleyball' },
  { label: t('特别项目'), value: 7, type: 'SpecialProjects' },
  { label: t('飞镖'), value: 8, type: 'Darts' },
  { label: t('橄榄球'), value: 9, type: 'Rugby' },
  { label: t('拳击/格斗'), value: 10, type: 'Boxing' },
  { label: t('手球'), value: 11, type: 'Handball' },
  { label: t('冰球'), value: 12, type: 'IceHockey' },
  { label: t('板球'), value: 13, type: 'Cricket' },
  { label: t('美式足球'), value: 16, type: 'AmericanFootball' },
  { label: t('羽毛球'), value: 19, type: 'Badminton' },
  { label: t('乒乓球'), value: 23, type: 'TableTennis' },
  { label: t('曲棍球'), value: 28, type: 'Hockey' },
]

export const ESPORT_ID_MAP = [
  { value: 276, label: 'DOTA2', },
  { value: 277, label: 'CS2', },
  { value: 278, label: '英雄联盟', },
  { value: 279, label: '王者荣耀', },
  { value: 280, label: 'LOL:激斗峡谷', },
  { value: 281, label: '永劫无间', },
  { value: 282, label: '无尽对决', },
  { value: 285, label: '传说对决', },
  { value: 286, label: '无畏契约', },
  { value: 287, label: 'MMA', },
  { value: 288, label: '绝地求生', },
  { value: 289, label: '穿越火线', },
  { value: 290, label: '守望先锋', },
  { value: 291, label: '星际争霸II', },
  { value: 292, label: '火箭联盟', },
  { value: 293, label: '彩虹六号', },
  { value: 294, label: '炉石传说', },
  { value: 295, label: 'FIFA', },
  { value: 296, label: '使命召唤', },
  { value: 297, label: '魔兽争霸3', },
]

export const MATCH_EVENT_CODE = {
  goal: t('足球进球'),
  yellow_red_card: t('红牌/黄牌'),
  corner: t('角球'),
  yellow_card: t('黄牌'),
  red_card: t('黄牌'),
  // match_status: t('比赛阶段'),
}

export const MATCH_STATUS = {
  nover: t('滚球'),
  over: t('比赛结束'),
  nobegin: t('未开始'),
}
export const ESPORT_MATCH_STATUS = {
  nover: t('比赛中'),
  over: t('比赛结束'),
  nobegin: t('未开赛'),
  canceled: t('比赛取消'),
}

//- 上半场 ｜ 下半场
export const MATCH_LEVEL = {
  6: t('上半场'),
  7: t('下半场')
}

//- 主队 ｜ 客队
export const HOME_AWAY = {
  home: t('主队'),
  away: t('客队')
}

// 开售状态映射
export const OPENING_STATUS = {
  0: t('未开售'),
  1: t('早盘'),
  2: t('滚球'),
  3: t('进行中'),
}
export const MATCH_PERIOD = {
  Q1: ' 第一节',
  Q2: ' 第二节 ',
  Q3: ' 第三节 ',
  Q4: ' 第四节 ',
  OT: ' 加时赛',
  HT: '上半场',
  FT: '下半场',
}
//- 盘口状态
export const HANDICAP_STATUS = {
  0: t('未锁盘'),
  1: t('锁盘'),
}

export const YELLOW_OR_RED = {
  'yellow_card': 1,
  'red_card': 2
}


//- 玩法声明映射
export const PLAY_MATCH = (code) => {
  const t1 = ['Q1_OU', 'Q2_OU', 'Q3_OU', 'Q4_OU', 'HT_OU', 'S1_OU', 'S2_OU', 'S3_OU', 'S4_OU', 'FTS_OU', 'FT_OU', 'PT_OU']
  const t2 = ['HT_AH', 'FT_AH', 'FTS_AH', 'Q4_AH', 'Q3_AH', 'Q1_AH', 'Q2_AH', 'S1_AH', 'S2_AH', 'S3_AH', 'S4_AH', 'PT_AH']
  const t3 = ['FT_OE', 'S2_ML', 'HT_OE']
  const t4 = ['FT_1X2', 'HT_1X2']
  const t5 = ['S1_ML', 'Q1_ML', 'Q2_ML', 'Q3_ML', 'Q4_ML', 'FT_ML', 'HT_ML', 'Winner_2ndFrame', 'Winner_1stFrame']
  switch (true) {
    case t1.includes(code):
      return {
        Over: t('大'),
        Under: t('小')
      }
    case t2.includes(code):
      return {
        Home: t('主'),
        Away: t('客')
      }
    case t3.includes(code):
      return {
        hideMiddle: true,
        Odd: t('单'),
        Even: t('双')
      }
    case t4.includes(code):
      return {
        hideMiddle: true,
        Home: t('主胜'),
        Away: t('客胜'),
        Draw: t('平')
      }
    case t5.includes(code):
      return {
        hideMiddle: true,
        Home: t('主'),
        Away: t('客'),
      }
  }
}

// 反波胆内容格式化
const BoDanSort = (a: any, b: any) => {
  const [aFirst, aSecond] = a.handicap.split('-');
  const [bFirst, bSecond] = b.handicap.split('-');
  if (aFirst !== bFirst) {
    return parseInt(aFirst) - parseInt(bFirst);
  }
  return parseInt(aSecond) - parseInt(bSecond);
};

// 波胆数据格式转换
export const transferBoDan = (list: any[]) => {
  const listData: any[] = [];
  const list1: any[] = [];
  const list2: any[] = [];
  const list3: any[] = [];
  let other: any = null;
  list.forEach((item) => {
    const temp = { ...item };
    if (temp.handicap === 'AOS') {
      temp.handicap = t('其他');
      other = temp;
    } else {
      const h = temp.handicap.match(/H(\S*)A/)[1];
      const a = temp.handicap.split('A')[1];
      temp.handicap = `${h}-${a}`;
      if (/[0-9]/.test(h) && /[0-9]/.test(a)) {
        if (h > a) list1.push(temp);
        if (h === a) list2.push(temp);
        if (h < a) list3.push(temp);
      }
    }
  });
  list1.sort(BoDanSort);
  list2.sort(BoDanSort);
  list3.sort(BoDanSort);
  if (other) {
    list2.push(other);
  }
  const len = Math.max(list1.length, list2.length, list3.length);
  for (let i = 0; i < len; i++) {
    listData[0 + (i * 3)] = list1[i] || null;
    listData[1 + (i * 3)] = list2[i] || null;
    listData[2 + (i * 3)] = list3[i] || null;
  }
  return listData;
};



export const SPORT_CATEGORY = [
  { label: t('普通体育'), value: 0 },
  { label: t('电子竞技'), value: 1 },
  { label: t('虚拟体育'), value: 2 },
]

export enum LeagueClassifyType {
  SPORT_CLASSIFY = 0,
  ESPORT_CLASSIFY = 1,
  VIRTUAL_SPORT_CLASSIFY = 2,
}