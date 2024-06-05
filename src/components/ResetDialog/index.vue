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
    <div class="flex items-center justify-center">
      <el-button @click="closeDialog">{{ t('取消') }}</el-button>
      <el-button :disabled="isDisabled" type="primary" @click="resetPassword">{{
        t('确认')
      }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { t } from '@/plugins/i18n';
import { useUserStore } from '@/store/user';
import { getMD5 } from '@/utils/caypto';
import { message } from '@/utils/message';
import { resetPasswordRules } from '@/views/login/utils/rule';
import { IResetForm } from '@/views/login/utils/type';
import { FormInstance } from 'element-plus/es/components/form';

const resetFormRef = ref<FormInstance>();
const isDisabled = ref(true);
const userStore = useUserStore();

const resetForm = reactive<IResetForm>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const emits = defineEmits(['changeDisabledStatus', 'closeDialog']);
watch(
  () => resetForm,
  async _ => {
    const r: boolean = await new Promise(resolve =>
      resetFormRef.value.validate(resolve)
    );
    isDisabled.value = !r;
  },
  {
    deep: true
  }
);

const resetPassword = async () => {
  const res = await API.updatePwd({
    id: userStore.userInfo.id,
    pwd: getMD5(resetForm.oldPassword),
    newPwd: getMD5(resetForm.newPassword)
  });
  if (res.code) return message(res.msg, { type: 'error' });
  else message(t('修改成功，请重新登录'), { type: 'success' });
  closeDialog();
};

const closeDialog = () => {
  emits('closeDialog');
};
</script>

<style scoped></style>
