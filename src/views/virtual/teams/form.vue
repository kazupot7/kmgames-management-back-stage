<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="150px"
  >
    <el-form-item
      :label="`${t('球队ID')}:`"
      prop="teamId"
      v-if="newFormInline.teamId"
    >
      <el-input
        v-model="newFormInline.teamId"
        disabled
        :placeholder="t('球队ID')"
      />
    </el-form-item>

    <el-form-item :label="`${t('中文简体')}:`" prop="teamNameCn">
      <el-input
        v-model="newFormInline.teamNameCn"
        clearable
        :placeholder="t('中文简体')"
      />
    </el-form-item>

    <el-form-item :label="`${t('英文名称')}:`" prop="teamNameEn">
      <el-input
        v-model="newFormInline.teamNameEn"
        clearable
        :placeholder="t('英文名称')"
      />
    </el-form-item>

    <el-form-item :label="`${t('简称')}:`" prop="teamName">
      <el-input
        v-model="newFormInline.teamName"
        clearable
        :placeholder="t('简称')"
      />
    </el-form-item>

    <el-form-item :label="`${t('英文名（数据商）')}:`" prop="dataSource">
      <el-input
        v-model="newFormInline.dataSource"
        clearable
        :placeholder="t('英文名（数据商）')"
      />
    </el-form-item>

    <el-form-item
      :label="`${t('英文名（数据商）Name')}:`"
      prop="dataSourceName"
    >
      <el-input
        v-model="newFormInline.dataSourceName"
        clearable
        :placeholder="t('英文名（数据商）Name')"
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

import { t } from "@/plugins/i18n";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    teamId: "",
    teamNameCn: "",
    teamNameEn: "",
    teamName: "",
    dataSource: "",
    dataSourceName: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>
