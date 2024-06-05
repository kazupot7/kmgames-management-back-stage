<template>
  <div class="main">
    <SearchForm :form="form" :loading="loading" @on-search="onSearch" />

    <PureTableBar :columns="columns" @refresh="onSearch('reload')">
      <template #title>
        <el-button type="primary" @click="openDialog(t('新增白名单'))">
          {{ t('新增') }}
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
          <template #tenantId="{ row }: { row: TenantAPI.whiteList }">
            {{ tenantList.find(item => item.id === row.tenantId)?.name }}
          </template>
          <template #tenantCode="{ row }: { row: TenantAPI.whiteList }">
            {{ tenantList.find(item => item.id === row.tenantId)?.tenantCode }}
          </template>
          <template
            #status="{ row }: { row: UserMangerAPI.querySysAccountListData }"
          >
            <el-switch
              v-model="row.status"
              :size="size"
              inline-prompt
              class="pure-datatheme"
              :active-text="t('开启')"
              :inactive-text="t('关闭')"
              :before-change="() => updateWhiteStatus(row)"
              :style="switchStyle"
            />
          </template>
          <template #operation="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              @click="openDialog(t('修改白名单'), row)"
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
import { useWhiteHook } from './utils/hook';
import SearchForm from './component/SearchForm.vue';
import { columns } from './component/TableColumnList';
import { t } from '@/plugins/i18n';
import { usePublicHooks } from '@/hooks';

const { switchStyle } = usePublicHooks();
const { tableHeaderStyle } = usePublicHooks();
defineOptions({ name: 'TENANTMANAGER_WHITEMANAGER' });

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
  updateWhiteStatus,
  tenantList
} = useWhiteHook();
</script>
