<template>
  <div class="bg-bg_color w-[99/100] pl-8 pb-3 pt-[12px]">
    <div class="font-bold text-lg mb-3">{{ t('盘口详情') }}</div>
    <el-row>
      <el-col
        class="mb-2"
        v-for="(item, index) in renderList"
        :key="index"
        :span="6"
      >
        <template v-if="item.title == 'button'">
          <el-button
            :type="renderObj.fullSettlementStatus !== 1 ? 'danger' : 'info'"
            @click="allSettleBtnClick"
            :disabled="renderObj.fullSettlementStatus === 1"
          >
            {{
              renderObj.fullSettlementStatus === 1
                ? t('结算完成')
                : t('全场结算')
            }}
          </el-button>
        </template>
        <template v-else>
          <span class="mr-2 text-sm">{{ item.title }}:</span>
          <span class="text-sm">{{ item.val }}</span>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { SPORT_ID_MAP, MATCH_STATUS } from '@/utils/maps/sports_map';
import { t } from '@/plugins/i18n';

const props = defineProps<{
  renderObj: EsportsSettlementAPI.ESportMatchList;
}>();
const renderList = computed(() => {
  const _ = props.renderObj;
  return [
    {
      title: t('赛事ID'),
      val: _?.matchId || ''
    },
    {
      title: t('联赛'),
      val: _?.leagueNameCn || ''
    },
    {
      title: t('开赛时间'),
      val: _?.beginTime
    },
    {
      title: t('盘口状态'),
      val: MATCH_STATUS[_?.status]
    },
    {
      title: t('赛种'),
      val: SPORT_ID_MAP.find(item => item.value === _?.sportId)?.label ?? '-'
    },
    {
      title: t('比赛方'),
      val: `${_?.homeTeamNameCn || '-'} VS ${_?.awayTeamNameCn || '-'}`
    },
    {
      title: t('结算状态'),
      val: _.fullSettlementStatus === 1 ? t('已结算') : t('未结算')
    },
    { title: 'button', val: t('全場結算') }
  ];
});

const emits = defineEmits(['allSettleBtnClick']);
const allSettleBtnClick = () => emits('allSettleBtnClick');
</script>

<style scoped></style>
