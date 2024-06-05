<template>
  <el-input
    v-model="renderStr"
    :placeholder="placeholder"
    clearable
    :maxlength="maxlength"
    v-enter="search"
    :class="className"
  />
</template>

<script setup lang="ts">
import { storageLocal } from '@pureadmin/utils';
interface ILocaleType {
  locale: 'zh' | 'en' | 'fr';
}
const props = withDefaults(
  defineProps<{
    cnVal: string;
    enVal: string;
    maxlength?: string;
    className?: string;
    placeholder?: string;
    useSystem?: boolean;
    compnentLan?: string;
  }>(),
  {
    className: '',
    maxlength: '1000',
    placeholder: ''
  }
);

const emits = defineEmits(['update:cnVal', 'update:enVal', 'searchClick']);
const lan =
  (storageLocal().getItem('responsive-locale') as ILocaleType)?.locale ?? 'zh';
const renderStr = computed({
  get() {
    return (props.compnentLan ?? lan) === 'zh' ? props.cnVal : props.enVal;
  },
  set(val) {
    if ((props.compnentLan ?? lan) === 'zh') {
      emits('update:cnVal', val);
    } else {
      emits('update:enVal', val);
    }
  }
});

const search = () => emits('searchClick');
</script>

<style scoped></style>
