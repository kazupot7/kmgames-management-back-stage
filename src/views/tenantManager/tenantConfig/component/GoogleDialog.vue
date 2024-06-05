<template>
  <div class="">
    <div
      class="font-bold text-xl pb-2 border-b-[1px] border-[#f0f0f0] dark:border-[#303030]"
    >
      {{ t('绑定谷歌验证器') }}
    </div>

    <div class="flex justify-between items-center pr-5">
      <div class="flex flex-col items-center">
        <ReQrcode :text="googleCode" />
        <div class="flex items-center pl-5">
          <span class="mr-2">{{ googleCode }}</span>
          <el-button
            v-if="!!googleCode"
            class="text-sm"
            type="primary"
            link
            v-copy:click="googleCode"
            >{{ t('复制') }}</el-button
          >
        </div>
      </div>
      <div class="flex flex-col items-start">
        <span class="font-bold">{{ t('提示') }}:</span>
        <span
          >1.
          {{ t('使用Goolgle Authenticator扫描左图二维码，或者输入谷歌密钥') }}
        </span>
        <span
          >2.
          {{ t('下方输入谷歌双重身份验证口令') }}
        </span>
        <span
          >3.
          {{ t('请保存谷歌密钥，他将用于恢复的谷歌密钥') }}
        </span>
      </div>
    </div>

    <div class="mt-3 pl-5">
      <el-form
        :model="renderForm"
        label-position="top"
        ref="renderFormRef"
        :rules="formRules"
      >
        <el-col :span="12">
          <el-form-item :label="`${t('谷歌验证器')}:`" prop="code" required>
            <el-input
              v-model="renderForm.code"
              :placeholder="t('请输入谷歌验证码')"
              maxlength="10"
            />
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div class="flex justify-end">
      <el-button @click="closeDialog">{{ t('取消') }}</el-button>
      <el-button type="primary" @click="confirmClick">{{
        t('确定')
      }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { t } from '@/plugins/i18n';
import ReQrcode from '@/components/ReQrcode';
import { FormInstance } from 'element-plus';
const props = defineProps<{
  id: string | number;
}>();

const renderForm = reactive({ code: '' });
const googleCode = ref('');
const renderFormRef = ref<FormInstance>();

onMounted(() => {
  getGoogleCode();
});

const formRules = reactive({
  code: [{ required: true, message: t('谷歌验证码不能为空'), trigger: 'blur' }]
});

const emits = defineEmits(['closeDialog']);
const closeDialog = () => {
  emits('closeDialog');
};

const getGoogleCode = async () => {
  const res = await API.genGoogleAuth({ id: +props.id });
  googleCode.value = res.msg;
};

const confirmClick = () => {
  renderFormRef.value?.validate(async v => {
    if (v) {
      const res = await API.resetGoogleAuth({
        id: props.id,
        googleAuth: googleCode.value
      });
      if (res.code) return;
      emits('closeDialog', googleCode.value);
    }
  });
};
</script>

<style scoped></style>
