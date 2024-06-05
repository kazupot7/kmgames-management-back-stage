<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="150"
  >
    <el-form-item :label="`${t('菜单名称')}:`" prop="leagueId" required>
      <CustomInput
        :placehoder="t('请输入菜单名称')"
        :txt-data="newFormInline.txtData"
      />
    </el-form-item>

    <el-form-item :label="`${t('类型')}:`" required>
      <el-radio-group v-model="newFormInline.isShow">
        <el-select
          v-model="newFormInline.type"
          class="!w-[280px]"
          clearable
          :placeholder="t('请输入菜单类型')"
        >
          <el-option :label="t('菜单链接')" :value="0" />
          <el-option :label="t('按钮链接')" :value="1" />
        </el-select>
      </el-radio-group>
    </el-form-item>

    <el-form-item :label="`${t('参数key')}:`">
      <el-input :placeholder="t('输入按钮链接跳转时的参数key')" />
    </el-form-item>

    <el-form-item :label="`${t('插入位置')}:`" required>
      <el-radio-group v-model="newFormInline.isShow">
        <el-radio :label="1">{{ t('第一列') }}</el-radio>
        <el-radio :label="2">{{ t('最后一列') }}</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item :label="`${t('url地址')}:`" required>
      <el-input
        :placeholder="
          t('请输入英文大小写url链接，禁止包含空格，同级地址禁止重复')
        "
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { formRules } from '../util/formRule';
import { FormProps } from '../util/types';
import { t } from '@/plugins/i18n';
import CustomInput from '@/components/Form/CustomInput.vue';

const props = defineProps<FormProps>();

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>
