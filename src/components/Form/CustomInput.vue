<template>
  <div class="w-full bg-red-50">
    <el-tabs tab-position="top" class="custom_input" type="border-card">
      <el-tab-pane label="中文">
        <el-input :placeholder="placehoder" v-model="formData.zh" />
      </el-tab-pane>
      <el-tab-pane label="English">
        <el-input :placeholder="placehoder" v-model="formData.en" />
      </el-tab-pane>
      <!-- <el-tab-pane label="French">
      <el-input />
    </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    placehoder: string;
    txtData: {
      zh: string;
      en: string;
    };
  }>(),
  {
    placehoder: t('请输入内容')
  }
);

const formData = ref(props.txtData);
</script>

<style scoped lang="scss">
.custom_input {
  border: none !important;
  // min-width: 35vw;
  :deep() {
    .el-tabs__header {
      margin-bottom: 0;
    }
    .el-tabs__item {
      height: 32px;
    }
    .el-tabs__nav-scroll {
      height: 32px;
    }
    .el-tabs__nav-wrap {
      &:after {
        display: none;
      }
    }
    .el-tabs__content {
      padding: 0 !important;
    }
    .el-tabs__header {
      border-bottom: none !important;
      border-top: 1px solid var(--el-border-color-light);
      border-left: 1px solid var(--el-border-color-light);
    }
  }
}
</style>
