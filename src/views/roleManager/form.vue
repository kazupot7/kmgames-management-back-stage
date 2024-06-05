<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    class="pr-10"
    label-width="100px"
  >
    <el-form-item :label="`${t('角色名称')}:`" prop="roleName">
      <el-input
        v-model="newFormInline.roleName"
        clearable
        :placeholder="t('请输入2-30个英文字母或数字')"
      />
    </el-form-item>

    <el-form-item :label="t('备注')" prop="comment">
      <el-input
        type="textarea"
        v-model="newFormInline.comment"
        maxLength="255"
        :placeholder="t('只能输入255个字符的内容')"
      />
    </el-form-item>

    <el-form-item :label="t('角色状态')" prop="status" v-if="!row.roleId">
      <el-switch
        v-model="newFormInline.status"
        inline-prompt
        class="pure-datatheme"
        :active-text="t('开启')"
        :inactive-text="t('关闭')"
        @change="testChange"
        :style="switchStyle"
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
import { usePublicHooks } from '@/hooks';
import { FormInstance } from 'element-plus/es/components/form';
import { message } from '@/utils/message';
import { removeEmptyStringKeys } from '@/utils/utilFn';

const { switchStyle } = usePublicHooks();

const props = defineProps<{
  row: RoleAPI.addSysAccountRes;
}>();

const emits = defineEmits(['closeDialog']);

const testChange = () => {};

const ruleFormRef = ref<FormInstance>();
const newFormInline = reactive(props.row);

const closeDialog = () => {
  emits('closeDialog');
};

/* 传,roleName,status,comment */
const confirmClick = () => {
  ruleFormRef.value.validate(async v => {
    const requestAPI = newFormInline.roleId ? 'updateRole' : 'addRole';
    if (v) {
      const res = await API[requestAPI]({
        ...(removeEmptyStringKeys(newFormInline) as RoleAPI.addSysAccountRes),
        status: Number(newFormInline.status)
      });
      message(res.msg, { type: res.code ? 'error' : 'success' });
      emits('closeDialog', res.code ? '' : 'reloadTable');
    }
  });
};
</script>

<style lang="scss"></style>
