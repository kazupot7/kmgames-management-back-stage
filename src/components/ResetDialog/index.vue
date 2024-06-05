<template>
  <div class="pr-4">
    <el-form
      ref="resetFormRef"
      :model="resetForm"
      :rules="resetPasswordRules(resetForm)"
      size="large"
    >
      <el-form-item
        prop="oldPassword"
        :label="`${t('旧密码')}:`"
        label-width="100"
      >
        <el-input
          clearable
          show-password
          v-model="resetForm.oldPassword"
          :placeholder="t('请输入旧密码')"
        />
      </el-form-item>

      <el-form-item
        prop="newPassword"
        :label="`${t('新密码')}:`"
        label-width="100"
      >
        <el-input
          clearable
          show-password
          v-model="resetForm.newPassword"
          :placeholder="t('请输入8个字符，包含英文数字')"
        />
      </el-form-item>

      <el-form-item
        prop="confirmPassword"
        :label="`${t('确认密码')}:`"
        label-width="100"
      >
        <el-input
          clearable
          show-password
          v-model="resetForm.confirmPassword"
          :placeholder="t('请再次输入新密码')"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { t } from '@/plugins/i18n';
import { resetPasswordRules } from '@/views/login/utils/rule';
import { IResetForm } from '@/views/login/utils/type';
import { FormInstance } from 'element-plus/es/components/form';

const resetFormRef = ref<FormInstance>();
const resetForm = reactive<IResetForm>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});
const emits = defineEmits(['changeDisabledStatus']);
watch(
  () => resetForm,
  _ => {
    resetFormRef.value.validate(async v => {
      emits('changeDisabledStatus', v);
    });
  },
  {
    deep: true
  }
);

function getRef() {
  return resetFormRef.value;
}

defineExpose({ getRef });
</script>

<style scoped></style>
