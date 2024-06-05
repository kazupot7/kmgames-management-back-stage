<template>
  <div>
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item :label="`${t('角色名称')}:`" prop="leagueId">
        <el-input
          v-model="form.leagueNameCn"
          :placeholder="t('请输入角色名称')"
          clearable
          :formatter="v => formatNumber(v)"
          v-enter="search"
          class="!w-[150px]"
        />
      </el-form-item>

      <el-form-item :label="`${t('状态')}:`" prop="sportId">
        <el-select class="!w-[150px]">
          <el-option value="-1" :label="t('全部状态')"></el-option>
          <el-option value="1" :label="t('启用')"></el-option>
          <el-option value="2" :label="t('禁用')"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="`${t('创建人')}:`" prop="leagueId">
        <el-input
          v-model="form.leagueNameCn"
          :placeholder="t('请输入创建人')"
          clearable
          :formatter="v => formatNumber(v)"
          v-enter="search"
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
// import { SPORT_ID_MAP } from '@/utils/maps/sports_map';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import Refresh from '@iconify-icons/ep/refresh';
import Search from '@iconify-icons/ep/search';
import type { FormInstance } from 'element-plus';
import { SearchFormType } from '../utils/types';
import { formatNumber } from '@/utils/formatNumber';
// import { useMatchStore } from '@/store/match';

defineProps<{
  loading: boolean;
  form: SearchFormType;
}>();

// const matchStore = useMatchStore();
const formRef = ref<FormInstance>();
const selectDate = ref('');
const emits = defineEmits(['onSearch']);
const resetForm = (formEl: FormInstance | undefined) => {
  formEl.resetFields();
  search();
};

const search = () => {
  emits('onSearch', ...['reload']);
};

const changeDate = () => {};
</script>

<style scoped></style>
