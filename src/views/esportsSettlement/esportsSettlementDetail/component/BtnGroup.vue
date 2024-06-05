<template>
  <el-radio-group class="mt-2" v-model="currentIndex" @change="changeIndex">
    <el-radio-button
      :label="index"
      v-for="(item, index) in mapList"
      :key="index"
      >{{ NAV_TITLE_NAME[item] }}</el-radio-button
    >
  </el-radio-group>
</template>

<script setup lang="ts">
import { NAV_TITLE_NAME } from '../utils/map';
const currentIndex = ref(0);
const emits = defineEmits(['changeIndex']);

const props = defineProps<{
  keyList: string[];
}>();

const mapList = computed(() => {
  const r = [
    'all',
    'final',
    'r1',
    'r2',
    'r3',
    'r4',
    'r5',
    'r6',
    'r7',
    'r8',
    'r0',
    'r10',
    'map1',
    'map2',
    'map3',
    'map4',
    'map5',
    'map6',
    'map7',
    'map8',
    'map9',
    'map10',
    'q1',
    'q2',
    'q3',
    'q4',
    'q6',
    'q7',
    'q8',
    'q9',
    'q10'
  ];
  return r.filter(key => props.keyList.includes(key));
});

const changeIndex = index => emits('changeIndex', index);
</script>

<style scoped></style>
