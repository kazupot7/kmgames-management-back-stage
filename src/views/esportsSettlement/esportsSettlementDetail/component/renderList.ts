import { t } from '@/plugins/i18n';
import { props } from './MatchDetailCard.vue';
import { ESPORT_ID_MAP } from '@/utils/maps/sports_map';

export const renderList = computed(() => {
  const d = [
    { title: t('赛事ID'), val: props.renderObj.matchId },
    { title: t('开赛时间'), val: props.renderObj.beginTime },
    { title: t('游戏'), val: ESPORT_ID_MAP.find(_ => _.value === props.renderObj.sportId).label },
    { title: t('赛事状态'), val: '比赛中' },
    { title: t('联赛'), val: 'LPL 中国职业联四 - 春季赛' },
    { title: t('盘口状态'), val: '已开盘' },
    { title: t('队伍'), val: '西安WE - OMNG' },
    { title: t('结算人员'), val: '手动结算' }
  ];
  return d;
});
