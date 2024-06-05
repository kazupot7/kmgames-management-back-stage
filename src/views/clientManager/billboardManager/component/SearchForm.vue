<template>
  <el-form
    ref="formRef"
    :inline="true"
    :model="form"
    class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
  >
    <el-form-item :label="`${t('公告类型')}:`" prop="billboardTypeCn">
      <LanguageInput
        v-model:cnVal="form.billboardTypeCn"
        v-model:enVal="form.billboardTypeEn"
        :placeholder="t('请输入公告类型')"
        maxlength="30"
        className="!w-[200px]"
        @searchClick="search"
      />
    </el-form-item>

    <el-form-item :label="`${t('标题')}:`" prop="billboardTitleCn">
      <LanguageInput
        v-model:cnVal="form.billboardTitleCn"
        v-model:enVal="form.billboardTitleEn"
        :placeholder="t('请输入公告标题')"
        maxlength="30"
        className="!w-[200px]"
        @searchClick="search"
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
import dayjs from 'dayjs';
import LanguageInput from '@/components/LanguageInput.vue';

const props = defineProps<{
  loading: boolean;
  form: searchFormType;
}>();
const selectDate = ref('');
const formRef = ref();
const emits = defineEmits(['onSearch']);
const resetForm = (formEl: FormInstance | undefined) => {
  formEl.resetFields();
  for (let key in props.form) {
    props.form[key] = '';
  }
  props.form.startCreatedAt = '';
  props.form.endCreatedAt = '';
  selectDate.value = '';
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
