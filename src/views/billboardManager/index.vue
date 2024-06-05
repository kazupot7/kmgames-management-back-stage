<template>
  <div class="main">
    <SearchForm :form="form" :loading="loading" @on-search="onSearch" />

    <PureTableBar :columns="columns" @refresh="onSearch('reload')">
      <template #title>
        <el-button type="primary" @click="openDialog(t('新增公告'))">
          {{ t('新增公告') }}
        </el-button>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          adaptive
          :default-sort="{ prop: 'level', order: 'descending' }"
          :data="dataList"
          :columns="dynamicColumns"
          :pagination="{ ...pagination, pageSizes: [5, 10, 20, 50, 100] }"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="tableHeaderStyle"
          @selection-change="handleSelectionChange"
          @page-size-change="handleTableWidthChange"
          @page-current-change="handleCurrentChange"
        >
          <template #resetPassword="{ row }">
            <el-button
              class="reset-margin"
              type="primary"
              size="small"
              @click="resetPasswordClick(row)"
            >
              {{ t('重置') }}
            </el-button>
          </template>
          <template #operation="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              @click="openDialog(t('编辑账号'), row)"
            >
              {{ t('编辑') }}
            </el-button>
            <el-button
              @click="handleDelete(row)"
              class="reset-margin"
              link
              type="danger"
              :size="size"
            >
              {{ t('删除') }}
            </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<script setup lang="ts">
import { PureTableBar } from '@/components/RePureTableBar';
// import Delete from '@iconify-icons/ep/delete';
// import AddFill from '@iconify-icons/ri/add-circle-line';
import { useBillboardManager } from './utils/hook';
import SearchForm from './component/SearchForm.vue';
import { columns } from './component/TableColumnList';
import { t } from '@/plugins/i18n';
import { usePublicHooks } from '@/hooks';

const { tableHeaderStyle } = usePublicHooks();

defineOptions({ name: 'USERMANAGER' });

const {
  loading,
  dataList,
  pagination,
  onSearch,
  openDialog,
  handleTableWidthChange,
  handleCurrentChange,
  handleSelectionChange,
  form,
  handleDelete,
  resetPasswordClick
} = useBillboardManager();
</script>
