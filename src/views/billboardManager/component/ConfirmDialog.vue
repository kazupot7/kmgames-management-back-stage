<template>
  <el-card>
    <div class="flex flex-col desc_main">
      <el-descriptions :column="1" direction="horizontal">
        <template #title>
          <el-tag type="success">{{ t('中文') }}</el-tag>
        </template>
        <el-descriptions-item :label="t('公告标题')">{{
          inputData.billboardTitleCn
        }}</el-descriptions-item>
        <el-descriptions-item :label="t('公告类型')">{{
          inputData.billboardTypeCn
        }}</el-descriptions-item>
        <el-descriptions-item :label="t('公告内容')"
          >{{ inputData.billboardContentCn }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="1" direction="horizontal">
        <template #title>
          <el-tag>{{ t('英文') }}</el-tag>
        </template>
        <el-descriptions-item :label="t('公告标题')">{{
          inputData.billboardTitleEn
        }}</el-descriptions-item>
        <el-descriptions-item :label="t('公告类型')">{{
          inputData.billboardTypeEn
        }}</el-descriptions-item>
        <el-descriptions-item :label="t('公告内容')"
          >{{ inputData.billboardContentEn }}
        </el-descriptions-item>
      </el-descriptions>

      <div class="flex justify-center" v-if="isOnlyShow">
        <el-button type="primary" @click="closeDialog">{{
          t('确认')
        }}</el-button>
      </div>
      <div class="flex justify-end" v-else>
        <el-button @click="closeDialog">{{ t('取消') }}</el-button>
        <el-button type="primary" @click="confirmPublishClick">{{
          t('确认发布')
        }}</el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { t } from '@/plugins/i18n';
import { EidtAndUpdateFormType } from '../utils/types';
import { message } from '@/utils/message';

const props = defineProps<{
  inputData: EidtAndUpdateFormType;
  isOnlyShow?: boolean;
}>();

const confirmPublishClick = async () => {
  const url = props.inputData.id ? 'updateBillboardList' : 'addSBillboard';
  const res = await API[url](props.inputData);
  message(res.msg, { type: res.code ? 'error' : 'success' });
  closeDialog(!res.code ? 'closeAll' : '');
};
const emits = defineEmits(['closeDialog']);
const closeDialog = type => {
  emits('closeDialog', type);
};
</script>

<style scoped lang="scss">
.desc_main {
  :deep() {
    .el-descriptions__cell {
      display: flex;
    }
    .el-descriptions__label {
      flex-shrink: 0;
    }
  }
}
</style>
