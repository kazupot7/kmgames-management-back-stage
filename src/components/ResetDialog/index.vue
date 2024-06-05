<template>
  <div class="pr-4">
    <el-form
      ref="resetFormRef"
      :model="resetForm"
      :rules="resetPasswordRules"
      size="large"
      @validate="validate"
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
import { IResetForm } from '@/views/login/utils/type';
import { REGEXP_PWD } from '@/views/tenantManager/whiteManager/utils/rule';
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
const validateList = {
  oldPassword: false,
  newPassword: false,
  confirmPassword: false
};

//表单校验
const validate = (formItemProp, isValid) => {
  validateList[formItemProp] = isValid;
  isDisabled.value = !Object.values(validateList).every(item => item);
};

/** 重置密码校验 */
const resetPasswordRules = reactive({
  oldPassword: [
    {
      validator: (_, value, callback) => {
        if (value === '') {
          callback(new Error(t('旧密码不能为空')));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  newPassword: [
    {
      validator: (_, value, callback) => {
        if (value === '') {
          callback(new Error(t('新密码不能为空')));
        } else if (!REGEXP_PWD.test(value)) {
          callback(new Error(t('密码至少8个字符，包括字母和数字')));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    {
      validator: (_, value, callback) => {
        if (value === '') {
          callback(new Error(t('确认密码不能为空')));
        } else if (resetForm.newPassword !== value) {
          callback(new Error(t('两次输入的密码不一致，请重新输入')));
        } else {
          callback();
        }
      },
      trigger: 'change'
    }
  ]
});

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
