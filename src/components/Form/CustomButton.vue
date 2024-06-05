<template>
  <el-button
    :icon="icon"
    :type="type"
    :link="link"
    :disabled="disabled"
    :loading="loading"
    :circle="circle"
    @click="btnClick"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      {{ btnText }}
    </template>
  </el-button>
</template>

<script setup lang="ts">
import { EpPropMergeType } from "element-plus/es/utils/vue/props/types";

withDefaults(
  defineProps<{
    icon?: Component | null;
    type?: EpPropMergeType<
      StringConstructor,
      | ""
      | "default"
      | "primary"
      | "success"
      | "warning"
      | "info"
      | "danger"
      | "text",
      unknown
    >;
    link?: boolean;
    disabled?: boolean;
    loading?: boolean | null;
    btnText?: string;
    circle?: boolean | null;
  }>(),
  {
    icon: null,
    type: "primary",
    link: false,
    disabled: false,
    loading: null,
    circle: null
  }
);
const emit = defineEmits(["click"]);
const btnClick = () => {
  emit("click");
};
</script>

<style scoped></style>
