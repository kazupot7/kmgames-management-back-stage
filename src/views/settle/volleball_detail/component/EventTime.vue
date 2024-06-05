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
  row: SattleDataAPI.SnookerEventsResData;
  index: number;
  dataList: SattleDataAPI.SnookerEventsResData[];
}>();

const emits = defineEmits(['changeEventTime']);

const changeEventTime = () => {
  const { index, row, dataList } = props;
  if (index > 0 && row.eventTime < dataList[index - 1].eventTime) {
    row.eventTime = '';
    return message(t('当前盘结算时间不能小于上一局'), { type: 'error' });
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
        .el-input__prefix {
          display: none;
        }
        .el-input__inner {
          flex-grow: 0;
          text-align: center;
        }
      }
    }
  }
}
</style>
