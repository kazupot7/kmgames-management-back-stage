<template>
  <div class="main">
    <SearchForm
      :loading="loading"
      :operationTypeList="operationTypeList"
      :searchMenuList="searchMenuList"
      @on-search="onSearch"
      :form="form"
    />
    <PureTableBar
      :title="t('操作日志表')"
      :columns="columns"
      @refresh="onSearch('reload')"
    >
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
          :header-cell-style="tableHeaderStyle"
          @page-size-change="handleTableWidthChange"
          @page-current-change="handleCurrentChange"
        >
          <template #requestLog="{ row }">
            <el-button type="primary" :link="true" @click="openRequestLog(row)">
              {{ t('点击查看') }}
            </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<script setup lang="ts">
import { PureTableBar } from '@/components/RePureTableBar';
// import AddFill from '@iconify-icons/ri/add-circle-line';
import { useOperationLog } from './utils/hook';
import SearchForm from './component/SearchForm.vue';
import RequestDialog from './component/RequestDialog.vue';
import { t } from '@/plugins/i18n';
import { addDialog } from '@/components/ReDialog';
import { usePublicHooks } from '@/hooks';

defineOptions({ name: 'operationLog' });
const { tableHeaderStyle } = usePublicHooks();
const openRequestLog = (row: OperationLogDataAPI.OperationLogListFetchList) => {
  addDialog({
    title: t('请求参数'),
    props: {
      requestLog: JSON.parse(row.requestLog) ?? {}
    },
    width: '40%',
    draggable: true,
    hideFooter: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(RequestDialog)
  });
};

// const formRef = ref();
const {
  loading,
  columns,
  dataList,
  pagination,
  onSearch,
  handleTableWidthChange,
  handleCurrentChange,
  operationTypeList,
  searchMenuList,
  form
} = useOperationLog();
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
