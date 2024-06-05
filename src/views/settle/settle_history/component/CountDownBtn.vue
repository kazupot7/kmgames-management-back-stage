<template>
  <el-countdown
    v-if="
      isSelfHandle && parentRow.settlementType !== 2 && row.settleType !== 1
    "
    class="!text-xs mr-3"
    :value="getTimeValue(row)"
    format="HH:mm:ss"
    @finish="countdownFinish"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  row: SattleDataAPI.MatchEventsList;
  parentRow: SattleDataAPI.getSettlementDataList;
}>();

//- 距离事件接受后剩余时间
const BASE_TIME = 1000 * 60 * 5;

const getTimeValue = (d: SattleDataAPI.MatchEventsList) => {
  const t = BASE_TIME - (d.t - new Date(d.createdAt).getTime());
  return Date.now() + t;
};

const isSelfHandle = computed(() => {
  if (props.parentRow.settlementType === 2) return false;
  const t = props.row.t - new Date(props.row.createdAt).getTime();
  if (t <= 0) {
    props.row.isShowCount = false;
    return false;
  } else {
    const isShow =
      BASE_TIME - (props.row.t - new Date(props.row.createdAt).getTime()) > 0;
    props.row.isShowCount = isShow;
    return isShow;
  }
});

//- 倒计时结束事件
const countdownFinish = () => (props.row.isShowCount = false);
</script>

<style lang="scss" scoped>
:deep() {
  .settle_admin {
    font-size: 12px;
  }
  .el-statistic__number {
    font-size: 14px;
    color: var(--el-color-primary-light-3);
  }
}
</style>
