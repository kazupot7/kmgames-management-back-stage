<template>
  <div class="">
    <div
      class="font-bold text-xl pb-2 border-b-[1px] border-[#f0f0f0] dark:border-[#303030]"
    >
      {{ t('绑定谷歌验证器') }}
    </div>

    <div class="flex justify-between items-center pr-5">
      <div class="flex flex-col items-center">
        <ReQrcode :text="'hello'" :margin="0" />
        <div class="flex items-center">
          <span class="mr-2">123123asdasd</span>
          <el-button class="text-sm" type="primary" link v-copy:click="123">{{
            t('复制')
          }}</el-button>
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
      <el-form :model="renderForm" label-position="top">
        <el-col :span="12">
          <el-form-item :label="`${t('谷歌验证器')}:`" prop="code" required>
            <el-input
              v-model="renderForm.code"
              :placeholder="t('请输入谷歌验证码')"
            />
          </el-form-item>
        </el-col>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { t } from '@/plugins/i18n';
import ReQrcode from '@/components/ReQrcode';
const props = defineProps<{
  formData: { code: string };
}>();

const renderForm = ref(props.formData);
</script>

<style scoped></style>
