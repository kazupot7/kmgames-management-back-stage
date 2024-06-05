<template>
  <div class="main">
    <!-- -盘口详情 -->
    <MatchDetailCard :renderObj="renderObj" />
    <template v-if="!keyList.length">
      <el-empty :description="t('暂无结算信息')" />
    </template>
    <template v-else>
      <BtnGroup :keyList="keyList" @changeIndex="changeIndex" />
      <PureTableBar :title="t('盘口详情')" :columns="columns">
        <template v-slot="{ size, dynamicColumns }">
          <pure-table
            align-whole="center"
            showOverflowTooltip
            table-layout="auto"
            :loading="loading"
            :size="size"
            adaptive
            :data="renderList"
            :columns="dynamicColumns"
            :pagination="{ ...pagination, pageSizes: [10, 20, 50, 100] }"
            :paginationSmall="size === 'small' ? true : false"
            :header-cell-style="tableHeaderStyle"
            @page-current-change="
              index => handleCurrentChange(index, selectIndex)
            "
            @page-size-change="handleTableWidthChange"
          >
            <!-- - 盘口投注项 -->
            <template #betOptions="{ row }">
              <el-radio-group class="bet_item" v-model="row.betOptions">
                <el-radio
                  :disabled="row.win != null"
                  :label="index"
                  border
                  :class="[row.arr.length > 2 && 'mb-1']"
                  v-for="(item, index) in row.arr"
                  :key="index"
                >
                  <span>{{ item.handicap }}</span>
                  <span class="ml-3">{{ item.odds }}</span>
                </el-radio>
              </el-radio-group>
            </template>

            <!-- - 操作 -->
            <template #operaction="{ row }">
              <el-button
                :disabled="row.win !== null"
                :type="row.win === null ? 'primary' : 'info'"
                @click="manualSettleESportHandicapClick(row)"
                >{{ t('确认结算') }}</el-button
              >
            </template>
          </pure-table>
        </template>
      </PureTableBar>
    </template>
  </div>
</template>

<script setup lang="ts">
import { PureTableBar } from '@/components/RePureTableBar';
import { useEsportsSettlement } from './utils/hook';
import MatchDetailCard from './component/MatchDetailCard.vue';
import BtnGroup from './component/BtnGroup.vue';
import { usePublicHooks } from '@/hooks';
import { columns } from './utils/TableColumnList';
import { t } from '@/plugins/i18n';

defineOptions({ name: 'ESPORTSSETTLEMENTDETAIL' });

const { tableHeaderStyle } = usePublicHooks();
const selectIndex = ref(0);

const changeIndex = index => {
  selectIndex.value = index;
  rList.forEach(_ => (_.currentPage = 1));
};

const keyList = computed(() => {
  return renderObj.betItemsMap
    ? Object.keys(renderObj.betItemsMap).map(key => key)
    : [];
});

const pagination = computed(() => {
  const r = {
    total: 0,
    pageSize: 10,
    currentPage: 1
  };
  if (rList[selectIndex.value]) {
    r.total = rList[selectIndex.value]?.list.length;
    r.pageSize = rList[selectIndex.value].pageSize;
    r.currentPage = rList[selectIndex.value].currentPage;
  }
  return r;
});

const renderList = computed(() => {
  rList[selectIndex.value]?.list.sort((a, b) => {
    if (a.win === null && b.win !== null) {
      return -1;
    } else if (a.win !== null && b.win === null) {
      return 1;
    } else {
      return 0;
    }
  });
  return rList[selectIndex.value]?.list.slice(
    (pagination.value.currentPage - 1) * pagination.value.pageSize,
    pagination.value.pageSize * pagination.value.currentPage
  );
});

const {
  loading,
  handleCurrentChange,
  renderObj,
  rList,
  manualSettleESportHandicapClick,
  handleTableWidthChange
} = useEsportsSettlement();
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

.bet_item {
  &.el-radio-group {
    display: flex;
    justify-content: space-between;
    label {
      width: 45%;
      margin-right: 0;
      :deep() {
        .el-radio__label {
          display: flex !important;
          span:first-child {
            max-width: 100px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>
