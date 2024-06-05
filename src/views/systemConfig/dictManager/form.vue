<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    class="pr-10"
    label-width="100px"
  >
    <el-form-item label="KEY:" prop="dictKey">
      <el-input
        disabled
        v-model="newFormInline.dictKey"
        :placeholder="t('请输入2-30个字符内')"
      />
    </el-form-item>

    <el-form-item label="Value:" prop="dictValue">
      <el-input v-model="newFormInline.dictValue" maxlength="20" />
    </el-form-item>

    <el-form-item :label="`${t('备注')}:`" prop="comment">
      <el-input disabled v-model="newFormInline.comment" type="textarea" />
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

const props = defineProps<{
  row: {
    id: number;
    dictKey: string | number;
    dictValue: string;
    comment: string | number;
  };
}>();

const emits = defineEmits(['closeDialog']);

const ruleFormRef = ref<FormInstance>();
const newFormInline = reactive(props.row);

const closeDialog = () => {
  emits('closeDialog');
};

const confirmClick = () => {
  ruleFormRef.value.validate(async v => {
    if (v) {
      const res = await API.updateDict({
        id: newFormInline.id,
        dictValue: newFormInline.dictValue
      });
      message(res.msg, { type: res.code ? 'error' : 'success' });
      emits('closeDialog', res.code ? '' : 'reloadTable');
    }
  });
};
</script>

<style lang="scss"></style>
