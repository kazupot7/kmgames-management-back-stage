<template>
  <div
    class="px-3 mr-1 navbar-bg-hover"
    :title="props.isActive ? '点击折叠' : '点击展开'"
    @click="toggleClick"
  >
    <IconifyIconOffline
      :icon="props.isActive ? MenuFold : MenuUnfold"
      class="inline-block align-middle hover:text-primary dark:hover:!text-white"
    />
  </div>
</template>

<script setup lang="ts">
import MenuFold from "@iconify-icons/ri/menu-fold-fill";
import MenuUnfold from "@iconify-icons/ri/menu-unfold-fill";

const props = withDefaults(
  defineProps<{
    isActive: boolean;
  }>(),
  {
    isActive: false
  }
);

const emit = defineEmits<{
  (e: "toggleClick"): void;
}>();

const toggleClick = () => {
  emit("toggleClick");
};
</script>
