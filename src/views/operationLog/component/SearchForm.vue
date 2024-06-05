<template>
  <div>
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item :label="`${t('操作内容')}:`" prop="operateLog">
        <el-input
          v-model="form.operateLog"
          :placeholder="t('操作内容')"
          clearable
          v-enter="search"
          class="!w-[200px]"
        />
      </el-form-item>

      <el-form-item :label="`${t('用户名')}:`" prop="userName">
        <el-input
          v-model="form.userName"
          :placeholder="t('用户名')"
          clearable
          v-enter="search"
          class="!w-[200px]"
        />
      </el-form-item>

      <el-form-item :label="`${t('操作类型')}:`" prop="operateType">
        <el-select
          v-model="form.operateType"
          :placeholder="t('操作类型')"
          class="!w-[150px]"
        >
          <el-option
            :label="item"
            :value="item"
            v-for="item in operationTypeList"
            :key="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item :label="`${t('操作日志级联菜单')}:`" prop="operateMenu">
        <el-cascader
          v-model="form.operateMenu"
          class="!w-[260px]"
          :options="searchMenuList"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="search()"
        >
          {{ t('查询') }}
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          {{ t('重置') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { t } from '@/plugins/i18n';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import Refresh from '@iconify-icons/ep/refresh';
import Search from '@iconify-icons/ep/search';
import type { FormInstance } from 'element-plus';
import { SearchFormType } from '../utils/types';

defineProps<{
  loading: boolean;
  operationTypeList: string[];
  searchMenuList: OperationLogDataAPI.OperationMenuTypeChildren[];
  form: SearchFormType;
}>();

const formRef = ref<FormInstance>();

const emits = defineEmits(['onSearch']);

const resetForm = (formEl: FormInstance | undefined) => {
  formEl.resetFields();
  search();
};

const search = () => {
  emits('onSearch', ...['reload']);
};
</script>

<style scoped></style>
