<template>
  <div v-if="!row.id">
    <el-button
      size="small"
      type="primary"
      v-if="!row.isEdit"
      @click="row.isEdit = true"
      >{{ t('编辑') }}</el-button
    >
    <el-button
      v-if="row.isEdit"
      size="small"
      type="primary"
      @click="row.isEdit = false"
      >{{ t('保存') }}</el-button
    >
    <el-button
      v-if="!row.isEdit && isShowSettleBtn"
      size="small"
      type="primary"
      @click="settleJunClick"
      >{{ t('结算局') }}</el-button
    >
    <el-button size="small" type="danger" @click="deleteChildItem">{{
      t('删除')
    }}</el-button>
  </div>
  <span v-else>--</span>
</template>

<script setup lang="ts">
import { t } from '@/plugins/i18n';
const props = defineProps<{
  row: SattleDataAPI.InningEvent;
  childIndex: number;
}>();

const isShowSettleBtn = computed(() => {
  return (
    props.row.t1 !== '' &&
    props.row.t2 !== '' &&
    props.row.eventTime &&
    !props.row.isEdit
  );
});

const emits = defineEmits(['deleteChildItem', 'settlementHandicap']);

const deleteChildItem = () => emits('deleteChildItem');

const settleJunClick = () => {
  props.row.isEdit = false;
  emits('settlementHandicap');
};
</script>

<style scoped></style>
