<script setup lang="ts">
import { useRouter } from 'vue-router';
import noExist from '@/assets/status/404.svg?component';

defineOptions({
  name: '404'
});

const router = useRouter();
</script>

<template>
  <div class="flex justify-center items-center h-[640px]">
    <noExist />
    <div class="ml-12">
      <p class="font-medium text-4xl mb-4 dark:text-white">404</p>
      <p class="mb-4 text-gray-500">抱歉，你访问的页面不存在</p>
      <el-button type="primary" @click="router.push('/')"> 返回首页 </el-button>
    </div>
  </div>
</template>
