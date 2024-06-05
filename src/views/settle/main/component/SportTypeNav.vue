<template>
  <div class="flex mt-4">
    <CustomButton
      v-for="item in renderList"
      :key="item.value"
      :type="item.value === currentSportId ? 'primary' : ''"
      :btnText="item.label"
      @click="changeType(item)"
    />
  </div>
</template>

<script setup lang="ts">
import CustomButton from '@/components/Form/CustomButton.vue';
import { SPORT_ID_MAP } from '@/utils/maps/sports_map';

const props = defineProps<{
  currentSportId: number;
}>();

const emites = defineEmits(['changeCurrentComponentName']);

const renderList = computed(() => {
  return SPORT_ID_MAP.filter(_ => _.value !== 4);
});

const changeType = (_: { value: number; type: string }) => {
  if (_.value === props.currentSportId) return;
  // emites('onSearch', 'reload', val);
  emites('changeCurrentComponentName', _);
};
</script>

<style scoped></style>
