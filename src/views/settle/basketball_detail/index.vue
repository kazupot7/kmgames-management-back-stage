<template>
  <div class="main">
    <!-- -盘口详情 -->

    <DetiltTitle
      :renderObj="currentMatch"
      @allSettleBtnClick="allSettleBtnClick"
    />
    <!-- Switch Match Period Type -->
    <template v-if="dataList.length === 0" class="p-3">
      <h3 class="text-sm mt-8">赛制</h3>
      <div class="flex mt-4">
        <el-button
          @click="isFourRound = true"
          size="small"
          :type="isFourRound ? 'primary' : ''"
        >
          {{t('四节制')}}  
        </el-button>
        <el-button
          @click="isFourRound = false"
          size="small"
          :type="!isFourRound ? 'primary' : ''"
        >
          {{t('两节制')}}  
        </el-button>
      </div>
    </template>
    <PureTableBar
      :title="t('賽果結算')"
      :columns="columns"
      @refresh="onSearch()"
    >
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          align-whole="center"
          showOverflowTooltip
          :size="size"
          :row-key="row => row.matchId"
          :data="renderData"
          :columns="dynamicColumns"
          :header-cell-style="tableHeaderStyle"
        >
          <template #matchPeriod="{ row }">
            <span>
              {{ MATCH_PERIOD[row.matchPeriod] }}
            </span>
          </template>
          <template #t1="{ row, index }">
            <input
              class="border w-1/3 mx-auto"
              v-if="isEdit && index === renderData.length - 1"
              type="number"
              v-model="NewEvent.t1"
            />
            <span v-else>
              {{ row.t1 }}
            </span>
          </template>
          <template #t2="{ row, index }">
            <input
              class="border w-1/3 mx-auto"
              v-if="isEdit && index === renderData.length - 1"
              type="number"
              v-model="NewEvent.t2"
            />
            <span v-else>
              {{ row.t2 }}
            </span>
          </template>
          <template #eventTime="{ row, index }">
            <el-time-picker
              v-if="isEdit && index === renderData.length - 1"
              v-model="timestamps"
              :placeholder="t('请选择当前录入时间')"
              :disabled="!isEdit"
              value-format="x"
              :default-value="dayjs().startOf('day').toDate()"
              format="HH:mm:ss"
            />
            <span v-else>{{ dayjs((dayjs(row.eventTime).diff(dayjs(currentMatch.beginTime) + 28800000))).format('HH:mm:ss') }}</span>
          </template>
          <template #operation="{ index }">
            <div
              class="flex gap-2 justify-center"
              v-if="isEdit && index === renderData.length - 1"
            >
              <el-button 
                type="primary"
                @click="handleNewEvent"  
              >
                {{t('結算節')}}
              </el-button>
              <el-button
                @click="isEdit = false"              
              >{{t('取消')}}</el-button>
            </div>
            <span v-else> - </span>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
    <template v-if="currentMatch.fullSettlementStatus !== 1 && !isEdit && ((isFourRound && dataList.length < 4) || (!isFourRound && dataList.length < 2)) ">
      <el-button
        type="primary" 
        class="mt-3 px-24"
        @click="setNewEventEdit"
      >
        {{t('新增節')}}
      </el-button>
    </template>
    <template v-else-if="currentMatch.fullSettlementStatus !== 1 && !isEdit && (dataList[dataList.length - 1].t1 === dataList[dataList.length - 1].t2)">
      <el-button
        type="primary" 
        class="mt-3 px-24"
        @click="setNewEventEdit"
      >
        {{t('新增加时赛')}}
      </el-button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePublicHooks } from '@/hooks';
import { PureTableBar } from '@/components/RePureTableBar';
import DetiltTitle from './component/DetailTitle.vue';
import { useBasketballDetailHook } from './utils/hook';
import { t } from '@/plugins/i18n';
import { MATCH_PERIOD } from '@/utils/maps/sports_map';
import dayjs from 'dayjs';

defineOptions({ name: 'SETTLE_BASKETBALL_DETAIL' });

const { tableHeaderStyle } = usePublicHooks();
const {
  onSearch,
  columns,
  timestamps,
  dataList,
  currentMatch,
  isEdit,
  isFourRound,
  allSettleBtnClick,
  setNewBasketballEvent
} = useBasketballDetailHook();
const matchId = history.state.params.matchId;

const NewEvent: SattleDataAPI.BasketballEvent = reactive({
  matchId: Number(matchId),
  eventTime: 0,
  t1: 0,
  t2: 0
});
const renderData = computed(() => {
  return isEdit.value ? dataList.concat(NewEvent) : dataList;
});

const setNewEventEdit = () => {
  isEdit.value = true;
  if (isFourRound.value) {
    if (dataList.length >= 4) {
      NewEvent.matchPeriod = 'OT';
    } else {
      NewEvent.matchPeriod = `Q${dataList.length + 1}`;
    }
  } else {
    switch (dataList.length) {
      case 0:
        NewEvent.matchPeriod = 'HT';
        break;
      case 1:
        NewEvent.matchPeriod = 'FT';
        break;
      default:
        NewEvent.matchPeriod = 'OT';
    }
  }
};

const handleNewEvent = async () => {
  setNewBasketballEvent(NewEvent);
};
onMounted(() => {
  onSearch();
});
</script>

<style scoped>
.custom-switch .el-switch__core {
  width: 500px;
}
</style>
