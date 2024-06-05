<template>
  <div class="main">
    <SearchForm :form="form" :loading="loading" @on-search="onSearch" />

    <PureTableBar :columns="columns" @refresh="onSearch('reload')">
      <template #title>
        <el-button
          type="primary"
          v-if="hasAuth('BILLBOARDADD')"
          @click="openDialog(t('新增公告'))"
        >
          {{ t('新增公告') }}
        </el-button>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          align-whole="center"
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
          <template
            #status="{ row }: { row: BillboardManagerAPI.BillboardList }"
          >
            <el-switch
              v-model="row.status"
              :size="size"
              inline-prompt
              class="pure-datatheme"
              :active-text="t('开启')"
              :inactive-text="t('关闭')"
              :before-change="() => updateUserStatus(row)"
              :style="switchStyle"
            />
          </template>
          <template #operation="{ row }">
            <el-button
              class="reset-margin"
              link
              type="info"
              :size="size"
              @click="showDetailDialog(row)"
            >
              {{ t('查看') }}
            </el-button>
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              @click="openDialog(t('修改公共'), row)"
              v-if="hasAuth('BILLBOARDUPDATE')"
            >
              {{ t('编辑') }}
            </el-button>
            <el-button
              @click="handleDelete(row)"
              class="reset-margin"
              link
              type="danger"
              :size="size"
              v-if="hasAuth('BILLBOARDDELETE')"
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
import { useBillboardManager } from './utils/hook';
import SearchForm from './component/SearchForm.vue';
import { columns } from './component/TableColumnList';
import { t } from '@/plugins/i18n';
import { usePublicHooks } from '@/hooks';
import { hasAuth } from '@/router/utils';

const { tableHeaderStyle } = usePublicHooks();

defineOptions({ name: 'BILLBOARDMANAGER' });
const { switchStyle } = usePublicHooks();

const {
  loading,
  dataList,
  pagination,
  form,
  onSearch,
  openDialog,
  handleTableWidthChange,
  handleCurrentChange,
  handleSelectionChange,
  handleDelete,
  updateUserStatus,
  showDetailDialog
} = useBillboardManager();
</script>
