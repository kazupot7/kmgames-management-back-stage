<template>
  <div class="main">
    <SearchForm :loading="loading" @onSearch="onSearch" :form="form" />

    <PureTableBar :columns="columns" @refresh="onSearch('reload')">
      <template #title>
        <el-button
          v-if="hasAuth('ROLEMANAGERADD')"
          type="primary"
          @click="openRoleDialog(t('新增角色'))"
        >
          {{ t('新增角色') }}
        </el-button>
        <div v-else></div>
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
          <template #status="{ row }: { row: RoleAPI.querySysAccountListData }">
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
              type="primary"
              :size="size"
              @click="openRoleSettingDialog(row.id)"
            >
              {{ t('权限设置') }}
            </el-button>
            <el-button
              v-if="hasAuth('ROLEMANAGERUPDATE')"
              class="reset-margin"
              link
              type="primary"
              :size="size"
              @click="openRoleDialog(t('编辑角色'), row)"
            >
              {{ t('编辑') }}
            </el-button>
            <el-button
              v-if="hasAuth('ROLEMANAGERDELETE')"
              class="reset-margin"
              link
              type="danger"
              :size="size"
              @click="handleDelete(row)"
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
import { useRoleHook } from './utils/hook';
import SearchForm from './component/SearchForm.vue';
import { t } from '@/plugins/i18n';
import { usePublicHooks } from '@/hooks';
import { hasAuth } from '@/router/utils';

defineOptions({ name: 'MEMBER' });
const { tableHeaderStyle } = usePublicHooks();
const { switchStyle } = usePublicHooks();

const {
  loading,
  columns,
  dataList,
  pagination,
  form,
  onSearch,
  handleTableWidthChange,
  handleCurrentChange,
  openRoleDialog,
  openRoleSettingDialog,
  updateUserStatus,
  handleDelete
} = useRoleHook();
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
