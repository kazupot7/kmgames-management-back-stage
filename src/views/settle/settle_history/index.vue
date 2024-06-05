<template>
  <div class="main">
    <SearchForm
      :form="form"
      @resetForm="resetForm"
      :loading="loading"
      @onSearch="onSearch"
    />

    <SportTypeNav :currentSportId="currentSportId" @onSearch="onSearch" />

    <PureTableBar
      :title="t('结算历史')"
      :columns="columns"
      @refresh="reloadTable"
    >
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          align-whole="center"
          showOverflowTooltip
          :loading="loading"
          :size="size"
          :row-key="row => row.matchId"
          :expand-row-keys="expandMatchList"
          adaptive
          :data="dataList"
          :columns="dynamicColumns"
          :pagination="{ ...pagination, pageSizes: [5, 10, 20, 50, 100] }"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="tableHeaderStyle"
          @expand-change="expandChange"
          @page-size-change="handleTableWidthChange"
          @page-current-change="handleCurrentChange"
        >
          <template #expand="{ row: parentRow }: parentRowType">
            <div class="m-4">
              <div v-for="item in parentRow.childrenData" :key="item.type">
                <div class="mt-3 mb-1 font-bold">
                  {{ MATCH_EVENT_CODE[item.type] }}
                </div>

                <pure-table
                  align-whole="center"
                  :row-key="row => row.id"
                  :data="item.tableList"
                  :loading="childloading"
                  :columns="childColumns"
                  :row-class-name="tableRowClassName"
                  size="small"
                  table-layout="auto"
                  border
                  :header-cell-style="tableHeaderStyle"
                >
                  <!-- -事件是否有效 -->
                  <template #canceled="{ row }: MatchEventRowType">
                    <el-text
                      :class="[
                        '!text-xs',
                        row.canceled === 1 && '!text-sm font-bold'
                      ]"
                      :type="row.canceled === 1 ? 'danger' : 'info'"
                      >{{ row.canceled === 1 ? t('否') : t('是') }}</el-text
                    >
                  </template>

                  <!-- -数据商 -->
                  <template #dataSourceCode="{ row }: MatchEventRowType">
                    <el-text
                      v-if="row.isBackEndReturnData && row.settleType === 0"
                      v-for="(_, index) in eventQuotientList"
                      :key="index"
                      :type="row[_.type] === 1 ? 'primary' : 'info'"
                      :class="['!text-xs', index === 1 && '!mr-2 !ml-2']"
                      >{{ _.val }}</el-text
                    >
                    <span>-</span>
                  </template>
                </pure-table>
              </div>
            </div>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<script setup lang="ts">
import { t } from '@/plugins/i18n';
import { PureTableBar } from '@/components/RePureTableBar';
import { useSettle } from './utils/hook';
import SearchForm from './component/SearchForm.vue';
import { MATCH_EVENT_CODE } from '@/utils/maps/sports_map';
import SportTypeNav from './component/SportTypeNav.vue';
import { MatchEventRowType, parentRowType } from './utils/type';
import { usePublicHooks } from '@/hooks';

const { tableHeaderStyle } = usePublicHooks();

defineOptions({ name: 'SETTLE_HISTORY' });

//- 取消事件置灰
const tableRowClassName = ({ row }: MatchEventRowType) =>
  row.canceled === 1 ? 'pure-warning-row' : '';
const eventQuotientList = [
  { type: 'xjFlag', val: t('188数据') },
  { type: 'psFlag', val: t('熊猫数据') },
  { type: 'vsFlag', val: t('播控数据') }
];

const {
  form,
  loading,
  childloading,
  columns,
  dataList,
  pagination,
  onSearch,
  handleTableWidthChange,
  handleCurrentChange,
  childColumns,
  expandChange,
  resetForm,
  currentSportId,
  expandMatchList,
  reloadTable
} = useSettle();
</script>

<style lang="scss">
.pure-warning-row {
  --el-table-tr-bg-color: var(--el-color-danger-light-7);
  &:hover {
    td.el-table__cell {
      background-color: var(--el-color-danger-light-7) !important;
    }
  }
}
.canceled {
  .el-input__wrapper {
    box-shadow: none !important;
    border: none !important;
    background-color: transparent !important;
  }
}
</style>
