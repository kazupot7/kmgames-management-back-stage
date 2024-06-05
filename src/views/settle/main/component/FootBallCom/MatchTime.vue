<template>
  <el-time-picker
    :class="[row.canceled === 1 && 'canceled']"
    v-model="row.eventTime"
    :placeholder="t('请选择当前录入时间')"
    :disabled="!row.isEdit"
    value-format="x"
    :default-value="dayjs().startOf('day').toDate()"
    @change="changeEventTime(row, index, item.tableList)"
    format="HH:mm:ss"
  />
</template>

<script setup lang="ts">
import { t } from '@/plugins/i18n';
import { MatchEventRowType } from '../../utils/type';
import { message } from '@/utils/message';
import dayjs from 'dayjs';

const props = defineProps<
  MatchEventRowType & {
    item: SattleDataAPI.ChildrenDataList;
  }
>();
const emits = defineEmits(['changeEventTime']);

watch(
  () => props.row,
  d => {
    if (d.t1 == 0 && d.t2 == 0) {
      d.eventTime = dayjs().startOf('day').valueOf();
    }
  },
  {
    immediate: true,
    deep: true
  }
);

const changeEventTime = (
  row: SattleDataAPI.MatchEventsList,
  childIndex: number,
  childrenData: SattleDataAPI.MatchEventsList[]
) => {
  if (childIndex === 0) return;
  if (
    +row.eventTime <= new Date(childrenData[childIndex - 1].eventTime).getTime()
  ) {
    message(t('时间不能小于前一个事件发生时间'), { type: 'error' });
    row.eventTime = '';
  }
};
</script>
