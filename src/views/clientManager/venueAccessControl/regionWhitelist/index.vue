<template>
  <div class="main">
    <pure-table
      align-whole="center"
      table-layout="auto"
      :loading="loading"
      adaptive
      :data="dataList"
      :columns="columns"
      :header-cell-style="tableHeaderStyle"
    >
      <template #status="{ row }: { row: RoleAPI.querySysAccountListData }">
        <el-switch
          v-model="row.status"
          inline-prompt
          class="pure-datatheme"
          :active-text="t('开启')"
          :inactive-text="t('关闭')"
          :before-change="() => updateUserStatus(row)"
          :style="switchStyle"
        />
      </template>
    </pure-table>
  </div>
</template>

<script setup lang="ts">
import { useRoleHook } from './utils/hook';
import { usePublicHooks } from '@/hooks';
import { t } from '@/plugins/i18n';

defineOptions({ name: 'CLIENTMANAGER_VENUEACCESSCONTROL_REGIONWHITELIST' });
const { tableHeaderStyle } = usePublicHooks();
const { switchStyle } = usePublicHooks();
const { loading, columns, dataList, updateUserStatus } = useRoleHook();
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
