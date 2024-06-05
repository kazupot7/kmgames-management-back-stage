import { message } from '@/utils/message';
import { ElMessageBox } from 'element-plus';
import { usePublicHooks } from '@/hooks';
import { SPORT_LEVEL_LIST_TYPE } from './type';
import { SPORT_LEVEL_LIST } from './map';
export function useEsportsSettlement() {
  const route = useRoute();
  const dataList = reactive<SaleDataAPI.PreSaleList[]>([]);
  const loading = ref(true);
  const switchLoadMap = ref({});
  const { switchStyle } = usePublicHooks();
  const rList = reactive<SPORT_LEVEL_LIST_TYPE[]>([]);
  const renderObj = reactive<EsportsSettlementAPI.ESportMatchById>(
    {} as EsportsSettlementAPI.ESportMatchById
  );

  //- 分页点击
  const handleCurrentChange = (val: number, index) =>
    (rList[index].currentPage = val);

  //- 每页显示条数改变
  const handleTableWidthChange = (v: number) => {
    rList.forEach(_ => (_.pageSize = v));
  };

  //- 获取详情数据
  const getEsportMatchInfo = async () => {
    loading.value = true;
    const res = await API.getESportMatchById({
      matchId: +route.params.matchId
    });
    loading.value = false;
    if (res.code) return message(res.msg, { type: 'error' });
    res.data.betItemsMap.all = Object.values(res.data.betItemsMap).flat();
    const keyList = Object.keys(res.data.betItemsMap);
    //- 清洗后端返回数据
    if (keyList.length) {
      keyList.forEach((key: string) => {
        const filterKey = key.replace(/^\["|"\]$/g, '');
        res.data.betItemsMap[filterKey] = res.data.betItemsMap[key];
        key !== 'all' && delete res.data.betItemsMap[key];
      });
    }
    Object.assign(renderObj, res.data);
    formatData();
  };

  //- 格式化数据
  const formatData = () => {
    SPORT_LEVEL_LIST.forEach(item => {
      Object.keys(renderObj.betItemsMap).forEach(key => {
        if (item.key === key) item.list = renderObj.betItemsMap[key];
      });
    });
    rList.length = 0;
    rList.push(...SPORT_LEVEL_LIST.filter(_ => _.list.length));

    rList.forEach(item => {
      const l = item.list;
      l.sort((a: any, b: any) => a.displayIndex - b.displayIndex);
      const o = {};
      l.forEach(d => {
        if (!o[d.sourceBetItemsMid]) o[d.sourceBetItemsMid] = [];
        o[d.sourceBetItemsMid].push(d);
      });
      item.list.length = 0;
      Object.values(o).forEach(arr => {
        item.list.push({
          betOptions: arr[0].win === null ? -1 : arr[0].win === 1 ? 0 : 1,
          ...arr[0],
          arr
        });
      });
    });
  };

  //- 结算提交
  const manualSettleESportHandicapClick = async (
    row: EsportsSettlementAPI.BetItemsMapData
  ) => {
    if (row.betOptions < 0)
      return message(t('请先选择投注项'), { type: 'error' });

    ElMessageBox.confirm(t('确认要结算该记录么?'), '系统提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
      dangerouslyUseHTMLString: true,
      draggable: true
    }).then(async () => {
      const params = {
        matchId: row.matchId,
        betResultItems: row.arr.map((item, index) => {
          let betResult;
          if (index === 0) {
            betResult = row.betOptions === 0 ? 4 : 3;
          } else {
            betResult = row.betOptions === 1 ? 4 : 3;
          }
          return {
            betItemId: item.betItemsId,
            betResult,
            handicap: item.handicap,
            kindsCode: item.kindsCode
          };
        })
      };
      const res = await API.manualSettleESportHandicap(params);
      if (res.code) return message(res.msg, { type: 'error' });
      getEsportMatchInfo();
    });
  };

  onMounted(() => {
    getEsportMatchInfo();
  });

  return {
    loading,
    dataList,
    switchLoadMap,
    handleCurrentChange,
    switchStyle,
    renderObj,
    rList,
    manualSettleESportHandicapClick,
    handleTableWidthChange
  };
}
