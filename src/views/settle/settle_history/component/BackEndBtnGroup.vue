<template>
  <div class="flex" v-if="!row.canceled">
    <template v-if="row.isShowCount && row.settleTimes < 1">
      <el-button @click="advanceSettlement">{{ t('确认结算') }}</el-button>
    </template>
    <template v-else>
      <el-button
        v-if="row.settleTimes < 1"
        class="reset-margin"
        link
        type="danger"
        :disabled="
          index === 0
            ? false
            : index > 0 && dataList[index - 1]?.settleTimes < 1
        "
        :size="size"
        :icon="useRenderIcon('uploadIcon')"
        @click="handleChildrenData(row, parIndex, 'upload', parentRow)"
      >
        {{ t('提交') }}
      </el-button>
      <el-button
        v-if="isShowCancelBtn && isAllSettle && +row.t1 + +row.t2 !== 0"
        class="reset-margin"
        link
        type="danger"
        size="small"
        :icon="useRenderIcon('cancelIcon')"
        @click="cancelMatchEvent(row.id, row.matchId)"
      >
        {{ t('取消事件') }}
      </el-button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { t } from '@/plugins/i18n';

const props = defineProps<{
  row: SattleDataAPI.MatchEventsList;
  parentRow: SattleDataAPI.getSettlementDataList;
  size: any;
  parIndex: number;
  dataList: SattleDataAPI.MatchEventsList[];
  index: number;
}>();

const emits = defineEmits([
  'changeSettleType',
  'handleChildrenData',
  'cancelMatchEvent',
  'advanceSettlement'
]);

const isAllSettle = computed(() => {
  return props.dataList.every(_ => _.settleTimes !== 0);
});

const handleChildrenData = (...data) => emits('handleChildrenData', ...data);

const cancelMatchEvent = (...data) => emits('cancelMatchEvent', ...data);

const advanceSettlement = () =>
  emits('advanceSettlement', props.row, props.parentRow);

const isShowCancelBtn = computed(
  () =>
    props.index ===
    props.dataList
      .map((item: SattleDataAPI.MatchEventsList) => item.canceled)
      .lastIndexOf(0)
);
</script>

<style scoped></style>
