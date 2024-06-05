<script setup lang="ts">
import { useRouter } from 'vue-router';
import noAccess from '@/assets/status/403.svg?component';

defineOptions({
  name: '403'
});

const router = useRouter();
</script>

<template>
  <div class="flex justify-center items-center h-[640px]">
    <noAccess />
    <div class="ml-12">
      <p class="font-medium text-4xl mb-4 dark:text-white">403</p>
      <p class="mb-4 text-gray-500">抱歉，你无权访问该页面</p>
      <el-button type="primary" @click="router.push('/')"> 返回首页 </el-button>
    </div>
  </div>
</template>
