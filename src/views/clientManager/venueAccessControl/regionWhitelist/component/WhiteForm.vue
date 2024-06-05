<!-- <template>
  <el-form
    class="relative pl-3 pr-3 member_form"
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="auto"
    label-position="top"
  >
    <el-form-item :label="`${t('申请人')}:`" prop="input" required>
      <el-input
        v-model="newFormInline.input"
        :placeholder="t('请输入申请人')"
      />
    </el-form-item>

    <div>{{ t('网关API') }}</div>

    <el-form-item :label="t('IP地址:')" prop="type" required>
      <el-input type="textarea" v-model="newFormInline.input" />
    </el-form-item>

    <div>{{ t('商户管理系统') }}</div>

    <el-form-item :label="t('IP地址:')" prop="type" required>
      <el-input type="textarea" v-model="newFormInline.input" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { formRules } from '../utils/rule';
import { FormProps } from '../utils/types';
// import type { UploadProps } from 'element-plus';
// import { Plus } from '@element-plus/icons-vue';
import { t } from '@/plugins/i18n';
// import { SPORT_ID_MAP } from '@/utils/maps/sports_map';
// import { useMatchStore } from '@/store/match';
// import { inputRestrictions } from '@/utils/formatNumber';
// import CustomInput from '@/components/Form/CustomInput.vue';

// const matchStore = useMatchStore();
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
</style> -->

<template>
  <div>123</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
