<template>
  <div class="select-none">
    <img :src="bg" class="wave" />
    <div class="flex-c absolute right-5 top-3">
      <el-switch
        v-model="dataTheme"
        inline-prompt
        :active-icon="dayIcon"
        :inactive-icon="darkIcon"
        @change="dataThemeChange"
      />
      <LanguageNav />
    </div>
    <div class="login-container">
      <div class="img">
        <component :is="toRaw(illustration)" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <avatar class="avatar" />
          <h2 class="outline-none">{{ title }}</h2>

          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="loginRules"
            size="large"
          >
            <el-form-item prop="username">
              <el-input
                clearable
                v-model="ruleForm.username"
                maxlength="30"
                :placeholder="t('输入您的用户名')"
                :prefix-icon="useRenderIcon(User)"
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                clearable
                show-password
                v-model="ruleForm.password"
                :placeholder="t('输入密码')"
                :prefix-icon="useRenderIcon(Lock)"
              />
            </el-form-item>

            <el-button
              class="w-full mt-4"
              size="default"
              type="primary"
              :loading="loading"
              @click="onLogin(ruleFormRef)"
            >
              {{ t('登录') }}
            </el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { message } from '@/utils/message';
import { loginRules } from './utils/rule';
import { useNav } from '@/layout/hooks/useNav';
import type { FormInstance } from 'element-plus';
import { useLayout } from '@/layout/hooks/useLayout';
import { getTopMenu, initRouter } from '@/router/utils';
import { bg, avatar, illustration } from './utils/static';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { toRaw } from 'vue';
import { useDataThemeChange } from '@/layout/hooks/useDataThemeChange';
import dayIcon from '@/assets/svg/day.svg?component';
import darkIcon from '@/assets/svg/dark.svg?component';
import Lock from '@iconify-icons/ri/lock-fill';
import User from '@iconify-icons/ri/user-3-fill';
import { addPathMatch } from '@/router/utils';
import { usePermissionStoreHook } from '@/store/permission';
import LanguageNav from '@/components/LanguageNav/index.vue';
import { useUserStore } from '@/store/user';
import { t } from '@/plugins/i18n';
import { useResetPasswordHook } from '@/hooks/resetPasswordHook';
import { getMD5 } from '@/utils/caypto';

defineOptions({ name: 'Login' });
const router = useRouter();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();
const { initStorage } = useLayout();
initStorage();
const { dataTheme, dataThemeChange } = useDataThemeChange();
dataThemeChange();
const { title } = useNav();
const userStore = useUserStore();
const ruleForm = reactive({
  username: '',
  password: ''
});

const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      _loginRequest();
    } else {
      loading.value = false;
      return fields;
    }
  });
};

const _loginRequest = async () => {
  usePermissionStoreHook().handleWholeMenus([]);
  addPathMatch();
  try {
    const res = await API.login({
      name: ruleForm.username,
      pwd: getMD5(ruleForm.password)
    });
    loading.value = false;
    if (res.code) return message(res.msg, { type: 'error' });
    //- 第一次登录强制弹出充值密码弹窗
    if (ruleForm.password === '123456') {
      ruleForm.password = '';
      return openResetDialog();
    }
    message(t('登录成功'), { type: 'success' });
    userStore.setUserInfo(res.data);
    initRouter().then(() => {
      router.push(getTopMenu(true).path);
    });
  } catch (error) {
    message(error.message, { type: 'error' });
    loading.value = false;
  }
};

const { openResetDialog } = useResetPasswordHook();
</script>

<style scoped>
@import url('@/style/login.css');
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
