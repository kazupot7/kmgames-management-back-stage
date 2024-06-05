<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    class="pr-10"
    label-width="100px"
  >
    <el-form-item :label="t('商户名称')" prop="tenantId">
      <el-select
        v-model="newFormInline.tenantId"
        filterable
        clearable
        :disabled="!!row.id"
      >
        <el-option
          v-for="item in tenantList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item :label="t('申请人')" prop="applyBy">
      <el-input
        :disabled="!!row.id"
        v-model="newFormInline.applyBy"
        :placeholder="t('请输入2-30个字符内')"
      />
    </el-form-item>

    <el-form-item :label="t('作用域')" prop="effectType">
      <el-select
        v-model="newFormInline.effectType"
        filterable
        clearable
        :disabled="!!row.id"
      >
        <el-option
          v-for="item in EFFECT_TYPE"
          :key="item.key"
          :label="item.val"
          :value="item.key"
        />
      </el-select>
    </el-form-item>

    <el-form-item :label="t('IP地址')" prop="whiteIp" required>
      <el-input
        type="textarea"
        v-model="newFormInline.whiteIp"
        :placeholder="t('英文小写逗号隔开，最多支持1000个字符')"
      />
    </el-form-item>

    <div class="flex justify-end">
      <el-button @click="closeDialog">{{ t('取消') }}</el-button>
      <el-button type="primary" @click="confirmClick">{{
        t('确定')
      }}</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { formRules } from './utils/rule';
import { t } from '@/plugins/i18n';
import { FormInstance } from 'element-plus/es/components/form';
import { message } from '@/utils/message';
import { removeEmptyStringKeys } from '@/utils/utilFn';
import { EFFECT_TYPE } from './utils/map';

const props = defineProps<{
  row: TenantAPI.SaveWhiteType;
  tenantList: TenantAPI.getAllSimplifiedTenant[];
}>();

const emits = defineEmits(['closeDialog']);

const ruleFormRef = ref<FormInstance>();
const newFormInline = reactive(props.row);

const closeDialog = () => {
  emits('closeDialog');
};

const confirmClick = () => {
  ruleFormRef.value.validate(async v => {
    const requestAPI = newFormInline.id ? 'updateWhiteList' : 'addWhiteList';
    if (v) {
      newFormInline.tenantCode = props.tenantList.find(
        _ => _.id === newFormInline.tenantId
      ).tenantCode;
      const params = newFormInline.id
        ? {
            id: newFormInline.id,
            whiteIp: newFormInline.whiteIp
          }
        : {
            ...(removeEmptyStringKeys(
              newFormInline
            ) as TenantAPI.SaveWhiteType),
            status: +newFormInline.status
          };
      const res = await API[requestAPI](params);

      message(res.msg, { type: res.code ? 'error' : 'success' });
      emits('closeDialog', res.code ? '' : 'reloadTable');
    }
  });
};
</script>

<style lang="scss"></style>
