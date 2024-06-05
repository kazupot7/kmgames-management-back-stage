<template>
  <el-radio-group v-model="inputLanguageType" label="label position">
    <el-radio-button label="zh">{{ t('简中') }}</el-radio-button>
    <el-radio-button label="en">{{ t('英文') }}</el-radio-button>
  </el-radio-group>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common';
import { t } from '@/plugins/i18n';

const commonStore = useCommonStore();

const inputLanguageType = computed({
  get() {
    return commonStore.inputLanType;
  },
  set(v) {
    commonStore.set_input_lan_type(v);
  }
});
</script>

<style scoped></style>
