<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="150px"
  >
    <el-form-item
      :label="`${t('联赛ID')}:`"
      prop="leagueId"
      v-if="newFormInline.leagueId"
    >
      <el-input
        v-model="newFormInline.leagueId"
        disabled
        :placeholder="t('联赛ID')"
      />
    </el-form-item>

    <el-form-item :label="`${t('中文简体')}:`" prop="leagueNameCn">
      <el-input
        v-model="newFormInline.leagueNameCn"
        clearable
        :placeholder="t('中文简体')"
      />
    </el-form-item>

    <el-form-item :label="`${t('英文名称')}:`" prop="leagueNameEn">
      <el-input
        v-model="newFormInline.leagueNameEn"
        clearable
        :placeholder="t('英文名称')"
      />
    </el-form-item>

    <el-form-item :label="`${t('简称')}:`" prop="leagueName">
      <el-input
        v-model="newFormInline.leagueName"
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

    <el-form-item
      :label="`${t('联赛排序')}:`"
      prop="sort"
      v-if="newFormInline.sort > -1"
    >
      <el-input v-model="newFormInline.sort" disabled clearable />
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
    leagueId: "",
    leagueNameCn: "",
    leagueNameEn: "",
    leagueName: "",
    dataSource: "",
    dataSourceName: "",
    sort: -1
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>
