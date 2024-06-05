<template>
  <div>
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item :label="`${t('角色名称')}:`" prop="name">
        <el-input
          v-model="form.name"
          :placeholder="t('请输入角色名称')"
          clearable
          maxlength="20"
          v-enter="search"
          class="!w-[150px]"
        />
      </el-form-item>

      <el-form-item :label="`${t('状态')}:`" prop="status">
        <el-select class="!w-[150px]" v-model="form.status">
          <el-option :value="' '" :label="t('全部状态')"></el-option>
          <el-option :value="1" :label="t('启用')"></el-option>
          <el-option :value="0" :label="t('禁用')"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="`${t('创建人')}:`" prop="createdBy">
        <el-input
          v-model="form.createdBy"
          :placeholder="t('请输入创建人')"
          clearable
          v-enter="search"
          maxlength="20"
          class="!w-[150px]"
        />
      </el-form-item>

      <el-form-item prop="createTimeStart" :label="`${t('创建时间')}:`">
        <el-date-picker
          class="!w-[240px]"
          type="daterange"
          v-model="selectDate"
          :start-placeholder="t('开始时间')"
          :end-placeholder="t('结束时间')"
          @change="changeDate"
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
import dayjs from 'dayjs';

const props = defineProps<{
  loading: boolean;
  form: SearchFormType;
}>();

const formRef = ref<FormInstance>();
const selectDate = ref('');
const emits = defineEmits(['onSearch']);
const resetForm = (formEl: FormInstance | undefined) => {
  formEl.resetFields();
  selectDate.value = '';
  props.form.startCreatedAt = '';
  props.form.endCreatedAt = '';
  search();
};

const search = () => {
  emits('onSearch', ...['reload']);
};

const changeDate = t => {
  if (!t) {
    props.form.startCreatedAt = '';
    props.form.endCreatedAt = '';
  } else {
    props.form.startCreatedAt = dayjs(t[0])
      .startOf('day')
      .format('YYYY-MM-DD HH:mm:ss');
    props.form.endCreatedAt = dayjs(t[1])
      .endOf('day')
      .format('YYYY-MM-DD HH:mm:ss');
  }
  search();
};
</script>

<style scoped></style>
