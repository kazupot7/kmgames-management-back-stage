<template>
  <div class="main">
    <PureTableBar
      :title="t('虚拟体育 - 球队库')"
      :columns="columns"
      @refresh="onSearch('reload')"
    >
      <!-- <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog(t('新增'))"
        >
          {{ t("新增球队") }}
        </el-button>
      </template> -->
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          adaptive
          :data="dataList"
          :columns="dynamicColumns"
          :pagination="{ ...pagination, pageSizes: [5, 10, 20, 50, 100] }"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
          @page-size-change="handleTableWidthChange"
          @page-current-change="handleCurrentChange"
        >
          <template #operation="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(EditPen)"
              @click="openDialog(t('编辑球队'), row)"
            >
              {{ t('编辑') }}
            </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<script setup lang="ts">
import { PureTableBar } from '@/components/RePureTableBar';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
// import Search from "@iconify-icons/ep/search";
// import Refresh from "@iconify-icons/ep/refresh";
import EditPen from '@iconify-icons/ep/edit-pen';
import AddFill from '@iconify-icons/ri/add-circle-line';
import { useTeam } from './utils/hook';

import { t } from '@/plugins/i18n';
defineOptions({ name: 'League' });

// const formRef = ref();
const {
  loading,
  columns,
  dataList,
  // switchStyle,
  pagination,
  onSearch,
  // resetForm,
  handleTableWidthChange,
  handleCurrentChange,
  // switchLoadMap,
  openDialog
  // changeSwitch
} = useTeam();
</script>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}
.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
