<template>
  <div class="flex flex-col">
    <el-descriptions :column="1" direction="horizontal">
      <template #title>
        <el-tag type="success">{{ t('中文') }}</el-tag>
      </template>
      <el-descriptions-item :label="t('公告标题')"
        >kooriookami</el-descriptions-item
      >
      <el-descriptions-item :label="t('公告类型')"
        >18100000000</el-descriptions-item
      >
      <el-descriptions-item :label="t('公告内容')"
        >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions :column="1" direction="horizontal">
      <template #title>
        <el-tag>{{ t('英文') }}</el-tag>
      </template>
      <el-descriptions-item label="Announcement Title"
        >kooriookami</el-descriptions-item
      >
      <el-descriptions-item label="Announcement Type"
        >18100000000</el-descriptions-item
      >
      <el-descriptions-item label="Announcement Content"
        >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
      </el-descriptions-item>
    </el-descriptions>

    <div class="flex justify-end">
      <el-button @click="closeDialog">{{ t('取消') }}</el-button>
      <el-button type="primary" @click="confirmPublishClick">{{
        t('确认发布')
      }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { t } from '@/plugins/i18n';

const confirmPublishClick = async () => {
  closeDialog('closeAll');
};
const emits = defineEmits(['closeDialog']);
const closeDialog = type => {
  emits('closeDialog', type);
};
</script>

<style scoped></style>
