<template>
  <div class="main tennis_container">
    <!-- -盘口详情 -->
    <DetiltTitle
      @allSettleBtnClick="allSettleBtnClick"
      :renderObj="renderObj"
      :allSettleLoading="allSettleLoading"
    />

    <PureTableBar :columns="columns" @refresh="onSearch()">
      <template #title>
        <div class="flex items-center">
          <el-button
            @click="addEventRow"
            size="small"
            type="primary"
            v-if="renderObj.fullSettlementStatus === 0"
            >{{ t('新增局') }}</el-button
          >
          <span></span>
        </div>
      </template>

      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          align-whole="center"
          :loading="loading"
          :size="size"
          :row-key="row => row.inningNum"
          adaptive
          :adaptiveConfig="{
            offsetBottom: 60
          }"
          :data="dataList"
          :columns="dynamicColumns"
          :header-cell-style="tableHeaderStyle"
        >
          <!-- -比分 -->
          <template #t1="{ row }">
            <Score :row="row" type="t1" />
          </template>
          <template #t2="{ row }">
            <Score :row="row" type="t2" />
          </template>

          <!-- -结算时间 -->
          <template #eventTime="{ row, index }">
            <EventTime :row="row" :index="index" :dataList="dataList" />
          </template>

          <!-- -局按钮 -->
          <template #operation="{ row, index }">
            <ChildOperation
              :row="row"
              :childIndex="index"
              @deleteChildItem="() => dataList.pop()"
              @settlementHandicap="settlementHandicap(row)"
            />
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<script setup lang="ts">
import { usePublicHooks } from '@/hooks';
import { PureTableBar } from '@/components/RePureTableBar';
import DetiltTitle from '../component/Settle_detail_title.vue';
import { useBilliardsHook } from './utils/hook';
import { t } from '@/plugins/i18n';
import Score from './component/Score.vue';
import EventTime from './component/EventTime.vue';
import ChildOperation from './component/ChildOperation.vue';

defineOptions({ name: 'SETTLE_TENNIS_DETAIL' });
const { tableHeaderStyle } = usePublicHooks();

const {
  onSearch,
  loading,
  columns,
  dataList,
  addEventRow,
  settlementHandicap,
  allSettleBtnClick,
  renderObj,
  allSettleLoading
} = useBilliardsHook();
</script>
