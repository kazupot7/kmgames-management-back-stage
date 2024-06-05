<template>
  <el-form
    class="relative pl-3 pr-3 member_form"
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="auto"
  >
    <el-form-item :label="`${t('角色名称')}:`" prop="input" required>
      <el-input
        v-model="newFormInline.input"
        :placeholder="t('请输入角色名称')"
      />
    </el-form-item>

    <el-form-item :label="t('备注')">
      <el-input type="textarea" v-model="newFormInline.input" />
    </el-form-item>

    <el-form-item :label="`${t('角色状态')}:`" prop="status" required>
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
  </el-form>
</template>

<script setup lang="tsx">
import { ref } from 'vue';
import { formRules } from './utils/rule';
import { FormProps } from './utils/types';
import GoogleDialog from './component/GoogleDialog.vue';
// import type { UploadProps } from 'element-plus';
// import { Plus } from '@element-plus/icons-vue';
import { t } from '@/plugins/i18n';
// import { SPORT_ID_MAP } from '@/utils/maps/sports_map';
// import { useMatchStore } from '@/store/match';
// import { inputRestrictions } from '@/utils/formatNumber';
import { usePublicHooks } from '@/hooks';
import { addDialog } from '@/components/ReDialog';
// import CustomInput from '@/components/Form/CustomInput.vue';

// const matchStore = useMatchStore();
const { switchStyle } = usePublicHooks();
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    status: false,
    input: '',
    type: ''
  })
});

const emits = defineEmits(['reloadTable']);

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

const testChange = () => {};

//- 绑定谷歌验证器
const openResetGoogle = () => {
  addDialog({
    width: '35%',
    draggable: false,
    class: 'google_dialog',
    showClose: false,
    closeOnClickModal: false,
    props: {
      formData: {
        code: ''
      }
    },
    contentRenderer: () => h(GoogleDialog),
    beforeSure: (_done, { options }) => {
      console.log('form.vue文件 315==============行打印=', options);
      // const FormRef = googleRef.value.getRef();
      // const curData = options.props.code;
      // FormRef.validate(async valid => {});
    }
  });
};

function getRef() {
  return ruleFormRef.value;
}
defineExpose({ getRef });
</script>

<style lang="scss">
.status {
  position: absolute;
  top: -45px;
  left: 100px;
  display: flex !important;
  align-items: center;
  label {
    margin-bottom: 0 !important;
  }
}
.password {
  display: flex !important;
  align-items: center;
  label {
    margin-bottom: 0 !important;
    min-width: 40px;
    text-align: left !important;
  }
}
.key_container {
  .el-form-item__content {
    flex-wrap: nowrap;
    button {
      margin-left: 10px;
    }
  }
}

.member_form {
  label {
    font-size: 12px;
    margin-bottom: 0 !important;
  }
}

.google_dialog {
  .el-dialog__header {
    display: none !important;
  }
}
</style>
