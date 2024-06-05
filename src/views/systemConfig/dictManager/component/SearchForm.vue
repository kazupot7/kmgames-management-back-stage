<template>
  <el-form
    ref="formRef"
    :inline="true"
    :model="form"
    class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
  >
    <el-form-item :label="`${t('关键字')}:`" prop="dictKey">
      <el-input
        v-model="form.dictKey"
        :placeholder="t('关键字')"
        clearable
        maxlength="30"
        v-enter="search"
        class="!w-[200px]"
      />
    </el-form-item>

    <el-form-item :label="`${t('模块')}:`" prop="staus">
      <el-select v-model="form.model" clearable class="!w-[200px]" filterable>
        <el-option :label="t('全部')" :value="' '" />
        <el-option
          :label="item.val[lan]"
          :value="item.idx"
          v-for="(item, index) in PLAY_MAP"
          :key="index"
        />
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        :icon="useRenderIcon(SearchIcon)"
        :loading="loading"
        @click="search"
      >
        {{ t('查询') }}
      </el-button>
      <el-button :icon="useRenderIcon(RefreshIcon)" @click="resetForm(formRef)">
        {{ t('重置') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { t } from '@/plugins/i18n';
import SearchIcon from '@iconify-icons/ep/search';
import RefreshIcon from '@iconify-icons/ep/refresh';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { type FormInstance } from 'element-plus';
import { searchFormType } from '../utils/types';
import { PLAY_MAP } from '../utils/map';
import { getLan } from '@/utils/utilFn';

defineProps<{
  loading: boolean;
  form: searchFormType;
}>();

const formRef = ref();
const emits = defineEmits(['onSearch']);
const lan = getLan();

const resetForm = (formEl: FormInstance | undefined) => {
  formEl.resetFields();
  search();
};

const search = () => {
  emits('onSearch', ...['reload']);
};
</script>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}
.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
