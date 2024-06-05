<template>
  <el-select
    :class="[row.canceled && 'canceled', '!w-[150px]']"
    :disabled="!row.isEdit"
    v-model="row.homeAway"
    :placeholder="t('请选择')"
    @change="teamChangeEvent(row, index, item.tableList, item.type)"
  >
    <el-option :label="t('主队')" value="home" />
    <el-option v-if="!row.isEdit" :label="t('平局')" value="" />
    <el-option :label="t('客队')" value="away" />
  </el-select>
</template>

<script setup lang="ts">
import { t } from '@/plugins/i18n';
import { MatchEventRowType } from '../utils/type';

defineProps<
  MatchEventRowType & {
    item: SattleDataAPI.ChildrenDataList;
  }
>();

const emits = defineEmits(['teamChangeEvent']);

const teamChangeEvent = (...data) => emits('teamChangeEvent', ...data);
</script>
