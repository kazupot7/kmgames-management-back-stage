<template>
  <el-select
    :class="[row.canceled === 1 && 'canceled', '!w-[150px]']"
    :disabled="!row.isEdit"
    @change="changeSwitch"
    v-model="row.matchPeriodId"
    :placeholder="t('请选择')"
  >
    <el-option
      :label="
        row.eventCode == MatchEventType.MatchStatus
          ? t('上半场结束')
          : t('上半场')
      "
      :value="row.eventCode == MatchEventType.MatchStatus ? 31 : 6"
    />
    <el-option
      :label="
        row.eventCode == MatchEventType.MatchStatus
          ? t('下半场结束')
          : t('下半场')
      "
      :value="row.eventCode == MatchEventType.MatchStatus ? 100 : 7"
    />
  </el-select>
</template>

<script setup lang="ts">
import { t } from '@/plugins/i18n';
import { MatchEventRowType, MatchEventType } from '../../utils/type';
import { message } from '@/utils/message';

const props = defineProps<
  MatchEventRowType & {
    item: SattleDataAPI.ChildrenDataList;
  }
>();

const changeSwitch = val => {
  if (props.item.tableList.length === 1) {
    if (val === 7 || val === 100) {
      message(t('请先选择上半场进行结算'), { type: 'error' });
      props.row.matchPeriodId = 6;
    }
  } else if (
    props.item.tableList[props.index - 1].matchPeriodId == 7 &&
    val === 6
  ) {
    props.row.matchPeriodId = 7;
    message(t('请先选择下半场进行结算'), { type: 'error' });
  }
};
</script>

<style lang="scss">
.canceled {
  i {
    display: none;
  }
}
</style>
