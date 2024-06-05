<template>
  <div class="main">
    <PureTableBar :columns="columns" @refresh="onSearch" :title="t('维护设置')">
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
          :header-cell-style="tableHeaderStyle"
        >
          <template #status="{ row }: { row: SysTemConfigAPI.sysMainList }">
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
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<script setup lang="ts">
import { PureTableBar } from '@/components/RePureTableBar';
import { useMaintainHook } from './utils/hook';
import { columns } from './component/TableColumnList';
import { t } from '@/plugins/i18n';
import { usePublicHooks } from '@/hooks';

defineOptions({ name: 'SYSTEMCONFIG_MAINTAINMANAGER' });

const { tableHeaderStyle, switchStyle } = usePublicHooks();
const { loading, dataList, onSearch, updateUserStatus } = useMaintainHook();
</script>
