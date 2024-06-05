<template>
  <div class="main">
    <SearchForm
      :loading="loading"
      @on-search="onSearch"
      :form="searchForm"
      :matchCondition="matchCondition"
      @changeMatchCondition="changeMatchCondition"
    />
    <PureTableBar :columns="columns" @refresh="onSearch('reload')">
      <template #title>{{ t('电竞赛事列表') }}</template>
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
          @selection-change="handleSelectionChange"
          @page-size-change="handleTableWidthChange"
          @page-current-change="handleCurrentChange"
        >
          <!-- -比赛队伍 -->
          <template #matchTeam="{ row }: EsportMatchRowType">
            <span>{{ row.homeTeamNameCn }}</span>
            <span class="font-bold mr-2 ml-2">VS</span>
            <span>{{ row.awayTeamNameCn }}</span>
          </template>

          <!-- -锁盘按钮 -->
          <template #handicapStatus="{ row, index, props }">
            <el-switch
              :size="props.size === 'small' ? 'small' : 'default'"
              v-model="row.handicapStatus"
              :active-value="0"
              :inactive-value="1"
              inline-prompt
              :style="switchStyle"
              @change="changeSwitch({ row, index })"
            />
          </template>

          <template #operation="{ row }: EsportMatchRowType">
            <el-button
              class="reset-margin"
              type="primary"
              :size="size"
              @click="
                $router.push(
                  `/esportsSettlement/esportsSettlementDetail/${row.matchId}`
                )
              "
            >
              {{ t('结算详情') }}
            </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<script setup lang="tsx">
import { PureTableBar } from '@/components/RePureTableBar';
import { useEsportSettlement } from './utils/hook';
import { t } from '@/plugins/i18n';
import { columns } from './component/TableColumnList';
import SearchForm from './component/SearchForm.vue';
import { EsportMatchRowType } from './utils/types';
import { usePublicHooks } from '@/hooks';

defineOptions({ name: 'MATCH' });
const { tableHeaderStyle } = usePublicHooks();

const {
  loading,
  dataList,
  pagination,
  onSearch,
  handleTableWidthChange,
  handleCurrentChange,
  handleSelectionChange,
  changeSwitch,
  searchForm,
  switchStyle,
  matchCondition,
  changeMatchCondition
} = useEsportSettlement();
</script>
