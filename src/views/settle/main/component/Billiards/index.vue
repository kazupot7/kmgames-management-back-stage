<template>
  <PureTableBar
    :title="t('斯诺克/台球') + t('结算')"
    :columns="columns"
    @refresh="onSearch('reload')"
  >
    <template v-slot="{ size, dynamicColumns }">
      <pure-table
        align-whole="center"
        showOverflowTooltip
        :loading="matchStore.settleRequestLoading"
        :size="size"
        :row-key="row => row.matchId"
        adaptive
        :data="dataList"
        :columns="dynamicColumns"
        :pagination="{ ...pagination, pageSizes: [5, 10, 20, 50, 100] }"
        :paginationSmall="size === 'small' ? true : false"
        :header-cell-style="tableHeaderStyle"
        @page-size-change="handleTableWidthChange"
        @page-current-change="handleCurrentChange"
      >
        <template #operation="{ row }">
          <el-button
            class="reset-margin"
            type="primary"
            :size="size"
            @click="goSettleDetail(row)"
          >
            {{ t('结算详情') }}
          </el-button>
        </template>
      </pure-table>
    </template>
  </PureTableBar>
</template>

<script setup lang="ts">
import { PureTableBar } from '@/components/RePureTableBar';
import { t } from '@/plugins/i18n';
import { useBilliardsHook } from './util/hook';
import { usePublicHooks } from '@/hooks';
import { SearchFormType } from '../../utils/type';
import { useMatchStore } from '@/store/match';

const { tableHeaderStyle } = usePublicHooks();

const matchStore = useMatchStore();

const props = defineProps<{
  form: SearchFormType;
}>();

const {
  onSearch,
  columns,
  dataList,
  pagination,
  handleTableWidthChange,
  handleCurrentChange,
  form
} = useBilliardsHook();

form.value = props.form;
const filterData = (type: 'reload') => {
  onSearch(type);
};

const router = useRouter();
const goSettleDetail = row => {
  const params = JSON.parse(JSON.stringify(row));
  router.push({
    name: 'SETTLET_BILLIARDS_DETAIL',
    state: { params }
  });
};

defineExpose({ filterData });
</script>
