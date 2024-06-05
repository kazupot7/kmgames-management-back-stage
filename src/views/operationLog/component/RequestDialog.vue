<template>
  <vue-json-pretty
    v-model:data="renderData"
    :deep="3"
    :show-double-quotes="true"
    :show-line="true"
    :show-length="true"
    :show-line-number="true"
    :editable="false"
  />
</template>

<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { JSONDataType } from 'vue-json-pretty/types/utils';
const props = defineProps<{
  requestLog: JSONDataType;
}>();

const renderData = reactive<Record<string, unknown>>(
  props.requestLog as Record<string, unknown>
);
</script>

<style scoped></style>
