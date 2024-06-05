<template>
  <div class="timer_container">
    <el-time-picker
      v-model="row.eventTime"
      :placeholder="t('请选择当前录入时间')"
      :disabled="!row.isEdit"
      value-format="x"
      :default-value="dayjs().startOf('day').toDate()"
      @change="changeEventTime"
      format="HH:mm:ss"
    />
  </div>
</template>

<script setup lang="ts">
import { t } from '@/plugins/i18n';
import { message } from '@/utils/message';
import dayjs from 'dayjs';
const props = defineProps<{
  row: SattleDataAPI.InningEvent;
  index: number;
  list: SattleDataAPI.InningEvent[];
  dataList: SattleDataAPI.TennisEventsData[];
  parentIndex: number;
}>();

const emits = defineEmits(['changeEventTime']);

const changeEventTime = () => {
  const { index, row, list, dataList, parentIndex } = props;
  if (
    parentIndex > 0 &&
    index === 0 &&
    row.eventTime < dataList[parentIndex - 1].eventTime
  ) {
    return message(t('当前盘结算时间不能小于上一盘'), { type: 'error' });
  }
  const preData = list[index - 1];
  const nextData = list[index + 1];
  if (
    +row.eventTime <=
    (preData?.eventTime && (new Date(preData?.eventTime).getTime() as number))
  ) {
    message(t('时间不能小于前一个事件发生时间'), { type: 'error' });
    row.eventTime = '';
  } else if (
    +row.eventTime >= (new Date(nextData?.eventTime).getTime() as number)
  ) {
    message(t('时间不能大于前一个事件发生时间'), { type: 'error' });
    row.eventTime = '';
  }
};
</script>

<style scoped lang="scss">
.timer_container {
  :deep() {
    .is-disabled {
      .el-input__wrapper {
        border: none;
        background-color: transparent;
        box-shadow: none;
      }
    }
  }
}
</style>
