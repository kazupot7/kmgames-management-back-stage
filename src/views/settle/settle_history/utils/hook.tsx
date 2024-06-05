import { message } from '@/utils/message';
import type { PaginationProps } from '@pureadmin/table';
import { removeEmptyStringKeys } from '@/utils/utilFn';
import { childColumns, columns } from './tableColumnList';
import { MatchEventType, SearchFormType } from './type';
import { dateSetSecond, getSecondTime } from '@/utils/formatDate';
import { YELLOW_OR_RED } from '@/utils/maps/sports_map';

export function useSettle() {
  const form = reactive<SearchFormType>({
    leagueId: '',
    matchId: '',
    status: '',
    startTime: '',
    endTime: ''
  });

  const dataList = reactive<SattleDataAPI.getSettlementDataList[]>([]);
  const loading = ref(true);
  const childloading = ref(true);
  const switchLoadMap = ref({});
  const currentSportId = ref(1);
  const childDataTotal = ref(0);
  const expandMatchList = reactive<number[]>([]);
  const expandRowList = reactive<SattleDataAPI.getSettlementDataList[]>([]);
  const loopTimer = ref<NodeJS.Timeout>();

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1
  });

  const handleTableWidthChange = (pageSize: number) => {
    pagination.pageSize = pageSize;
    onSearch();
  };

  const handleCurrentChange = (val: number) => {
    pagination.currentPage = val;
    expandMatchList.length = 0;
    expandRowList.length = 0;
    onSearch();
  };

  //- 搜索初始化
  const onSearch = async (type?: 'reload', spoprtId?: number) => {
    loopTimer.value && clearInterval(loopTimer.value);
    try {
      if (spoprtId) currentSportId.value = spoprtId;
      if (type === 'reload') {
        pagination.currentPage = 1;
        expandMatchList.length = 0;
        expandRowList.length = 0;
      }
      loading.value = true;
      const data = removeEmptyStringKeys(form);
      const res: SattleDataAPI.getSettlementListRes =
        await API.getSettlementHistory({
          ...data,
          pageSize: pagination.pageSize,
          pageNum: pagination.currentPage,
          sportId: currentSportId.value
        });
      loading.value = false;
      if (res.code) return message(res.msg, { type: 'error' });
      dataList.length = 0;
      dataList.push(...res.data.list);
      dataList.forEach(
        _ =>
          (_.childrenData = [
            {
              type: MatchEventType.Goal,
              key: 'matchScoreRecordList',
              tableList: []
            },
            {
              type: MatchEventType.YellowRedCard,
              key: 'penaltyCardRecordList',
              tableList: []
            },
            {
              type: MatchEventType.Corner,
              key: 'cornerRecordList',
              tableList: []
            }
          ])
      );
      pagination.total = res.data.total;
      pagination.pageSize = res.data.pageSize;
      pagination.currentPage = res.data.pageNum;
    } catch (error) {
      loading.value = false;
    }
  };

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch('reload');
  };

  //- 打开关闭结算列表
  const expandChange = (
    row: SaleDataAPI.PreSaleList,
    currentExpandList: SattleDataAPI.getSettlementDataList[]
  ) => {
    if (currentExpandList.length) {
      expandMatchList.length = 0;
      if (row) {
        expandMatchList.push(row.matchId);
        expandRowList.push(...currentExpandList);
      }
    } else {
      expandMatchList.length = 0;
    }
    getChildrenData(row);
  };

  //- 获取当前展开行结算列表
  const getChildrenData = async row => {
    childloading.value = true;
    const res = await API.getMatchEvents({ matchId: row.matchId });
    childloading.value = false;
    if (res.code) return message(res.msg, { type: 'error' });
    childDataTotal.value = 0;
    row.childrenData.forEach((item: SaleDataAPI.ChildrenDataList) => {
      item.tableList = res.data[item.key];
      childDataTotal.value += item.tableList.length;
      if (item.tableList.length) {
        item.tableList.forEach(_ => {
          _.createdAt = new Date(_.createdAt).getTime() + 1000 * 60 * 5;
          _.isEdit = false;
          _.isSave = false;
          _.isShowCount = false;
          _.matchId = row.matchId;
          _.t = res.ts;
          _.isBackEndReturnData = true;
          if (_.eventTime.toString().length < 10) {
            _.eventTime = dateSetSecond(_.eventTime as number);
          } else {
            _.eventTime = getSecondTime(_.eventTime, row.beginTime);
          }
          item.type === 'yellow_red_card' &&
            (_.redOrYellow = YELLOW_OR_RED[_.eventCode]);
        });
      }
    });
  };

  onMounted(() => onSearch());
  onUnmounted(() => {
    loopTimer.value && clearInterval(loopTimer.value);
  });

  const reloadTable = async () => {
    await onSearch('reload');
    expandRowList.forEach(async row => {
      await getChildrenData(row);
      dataList.forEach(d => {
        if (d.matchId === row.matchId) d.childrenData = row.childrenData;
      });
    });
  };

  return {
    form,
    loading,
    childloading,
    columns,
    dataList,
    pagination,
    onSearch,
    resetForm,
    handleTableWidthChange,
    switchLoadMap,
    expandChange,
    handleCurrentChange,
    childColumns,
    getChildrenData,
    currentSportId,
    expandMatchList,
    reloadTable
  };
}
