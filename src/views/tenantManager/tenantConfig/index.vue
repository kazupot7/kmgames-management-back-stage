<template>
  <div class="main">
    <SearchForm
      :loading="loading"
      @onSearch="onSearch"
      :form="form"
      :tenantList="tenantList"
    />

    <PureTableBar :columns="columns" @refresh="onSearch('reload')">
      <template #title>
        <el-button type="primary" @click="openDialog(t('新增商户'))"  v-if="hasAuth('TENANTMANAGERADD')">
          {{ t('新增商户') }}
        </el-button>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          align-whole="center"
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
          <template #status="{ row }: { row: TenantAPI.TenantList }">
            <el-switch
              v-model="row.status"
              :size="size"
              inline-prompt
              class="pure-datatheme"
              :active-text="t('开启')"
              :inactive-text="t('关闭')"
              :before-change="() => updateTenantStatus(row)"
              :style="switchStyle"
            />
          </template>
          <template #operation="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              @click="openDialog(t('编辑商户'), row)"
              v-if="hasAuth('TENANTMANAGERUPDATE')"
            >
              {{ t('编辑') }}
            </el-button>
            <el-button
              class="reset-margin"
              link
              type="danger"
              :size="size"
              @click="delTenantClick(row)"
              v-if="hasAuth('TENANTMANAGERDELETE')"
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
import { useTenantHook } from './utils/hook';
import SearchForm from './component/SearchForm.vue';
import { t } from '@/plugins/i18n';
import { usePublicHooks } from '@/hooks';
import { hasAuth } from '@/router/utils';

defineOptions({ name: 'tenantManager' });
const { tableHeaderStyle } = usePublicHooks();
const { switchStyle } = usePublicHooks();

const {
  loading,
  columns,
  dataList,
  pagination,
  form,
  tenantList,
  onSearch,
  handleTableWidthChange,
  handleCurrentChange,
  openDialog,
  updateTenantStatus,
  delTenantClick
} = useTenantHook();
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
