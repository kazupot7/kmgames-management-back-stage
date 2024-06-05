<template>
  <div>
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item :label="`${t('商户名称')}:`" prop="name">
        <el-select
          v-model="form.name"
          :placeholder="t('请选择')"
          clearable
          filterable
          class="!w-[150px]"
        >
          <el-option
            :value="item.name"
            :label="item.name"
            v-for="item in tenantList"
            :key="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item :label="`${t('商户编号/ID')}:`" prop="tenantCode">
        <el-input
          v-model="form.tenantCode"
          :placeholder="t('请输入商户编号/ID')"
          clearable
          maxlength="50"
          v-enter="search"
          class="!w-[150px]"
        />
      </el-form-item>

      <el-form-item :label="`${t('商户类型')}:`" prop="tenantType">
        <el-select v-model="form.tenantType" clearable class="!w-[150px]">
          <el-option :value="' '" :label="t('全部')"></el-option>
          <el-option
            :value="item.key"
            :label="item.val"
            v-for="item in TENANT_TYPE"
            :key="item.key"
          />
        </el-select>
      </el-form-item>

      <el-form-item :label="`${t('商户对接人')}:`" prop="contact">
        <el-input
          v-model="form.contact"
          :placeholder="t('请输入商户对接人')"
          clearable
          v-enter="search"
          class="!w-[150px]"
        />
      </el-form-item>

      <el-form-item prop="createTimeStart" :label="`${t('注册时间')}:`">
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
// import { SPORT_ID_MAP } from '@/utils/maps/sports_map';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import Refresh from '@iconify-icons/ep/refresh';
import Search from '@iconify-icons/ep/search';
import type { FormInstance } from 'element-plus';
import { SearchFormType } from '../utils/types';
import { TENANT_TYPE } from '../utils/map';
import dayjs from 'dayjs';

const props = defineProps<{
  loading: boolean;
  form: SearchFormType;
}>();

const formRef = ref<FormInstance>();
const selectDate = ref('');
const emits = defineEmits(['onSearch']);
const tenantList = reactive<TenantAPI.getAllSimplifiedTenant[]>([]);

onMounted(() => {
  initAccountList();
});

//- 获取账号列表
const initAccountList = async () => {
  const res = await API.getAllSimplifiedTenants();
  if (res.code) return;
  tenantList.length = 0;
  tenantList.push(...res.data);
};

const resetForm = (formEl: FormInstance | undefined) => {
  formEl.resetFields();
  props.form.createdAtStart = '';
  props.form.createdAtEnd = '';
  selectDate.value = '';
  search();
};

const search = () => {
  emits('onSearch', ...['reload']);
};

const changeDate = t => {
  if (!t) {
    props.form.createdAtStart = '';
    props.form.createdAtEnd = '';
  } else {
    props.form.createdAtStart = dayjs(t[0]).startOf('day').valueOf();
    props.form.createdAtEnd = dayjs(t[1]).endOf('day').valueOf();
  }
  search();
};
</script>

<style scoped></style>
