<template>
  <div>
    <LanguageGroup />
    <el-card>
      <el-form
        ref="ruleFormRef"
        :model="newFormInline"
        :rules="formRules"
        class="pr-10"
        label-width="100px"
        :hide-required-asterisk="lan !== 'zh'"
      >
        <el-form-item :label="`${t('公告分类')}:`" prop="billClassify">
          <el-select v-model="newFormInline.billClassify" clearable filterable>
            <el-option
              :label="item.val[lan]"
              :value="item.idx"
              v-for="(item, index) in PLAY_MAP"
              :key="index"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          :label="`${t('公告标题')}:`"
          :prop="lan === 'zh' ? 'billboardTitleCn' : 'billboardTitleEn'"
        >
          <LanguageInput
            :placeholder="t('请输入公告标题')"
            v-model:cnVal="newFormInline.billboardTitleCn"
            v-model:enVal="newFormInline.billboardTitleEn"
            maxlength="30"
            :compnentLan="lan"
          />
        </el-form-item>

        <el-form-item
          :label="`${t('公告类型')}:`"
          :prop="lan === 'zh' ? 'billboardTypeCn' : 'billboardTypeEn'"
        >
          <LanguageInput
            :placeholder="t('请输入公告类型')"
            v-model:cnVal="newFormInline.billboardTypeCn"
            v-model:enVal="newFormInline.billboardTypeEn"
            maxlength="20"
            :compnentLan="lan"
          />
        </el-form-item>

        <el-form-item
          :label="`${t('公告内容')}:`"
          :prop="lan === 'zh' ? 'billboardTypeCn' : 'billboardContentEn'"
        >
          <LanguageInput
            :placeholder="t('请输入公告内容')"
            v-model:cnVal="newFormInline.billboardContentCn"
            v-model:enVal="newFormInline.billboardContentEn"
            maxLength="855"
            rows="5"
            type="textarea"
            :compnentLan="lan"
          />
        </el-form-item>

        <div class="flex justify-end">
          <el-button @click="closeDialog">{{ t('取消') }}</el-button>
          <el-button type="primary" @click="confirmClick">{{
            t('确定')
          }}</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { formRules } from './utils/rule';
import { t } from '@/plugins/i18n';
import { FormInstance } from 'element-plus/es/components/form';
import LanguageGroup from '@/components/Form/LanguageGroup.vue';
import ConfirmDialog from './component/ConfirmDialog.vue';
import LanguageInput from '@/components/LanguageInput.vue';

import {
  addDialog,
  closeDialog as closeItemDialog
} from '@/components/ReDialog';
import { EidtAndUpdateFormType } from './utils/types';
import { useCommonStore } from '@/store/common';
import { PLAY_MAP } from '@/utils/maps/sports_map';

const props = defineProps<{
  renderData: EidtAndUpdateFormType;
}>();

const emits = defineEmits(['closeDialog']);
const commonStore = useCommonStore();

const ruleFormRef = ref<FormInstance>();
const newFormInline = reactive(props.renderData);

const closeDialog = () => {
  emits('closeDialog');
};

watch(
  () => commonStore.inputLanType,
  v => {
    if (v !== 'zh') {
      ruleFormRef.value?.clearValidate();
    }
  }
);

const confirmClick = () => {
  ruleFormRef.value?.validate(async v => {
    if (v) {
      addDialog({
        title: t('发送确认'),
        width: '40%',
        closeOnClickModal: false,
        hideFooter: true,
        contentRenderer: ({ options, index }) =>
          h(ConfirmDialog, {
            inputData: newFormInline,
            onCloseDialog: (type?: 'closeAll') => {
              if (type === 'closeAll') {
                emits('closeDialog', 'reload');
              }
              closeItemDialog(options, index);
            }
          })
      });
    } else {
      //- 重置到中文
      commonStore.set_input_lan_type('zh');
    }
  });
};

const lan = computed(() => {
  return commonStore.inputLanType;
});
</script>

<style lang="scss"></style>
