import { message } from '@/utils/message';
import { t } from '@/plugins/i18n';
import { columns, childColumns } from './tableColumnList';
import { ElMessageBox } from 'element-plus';

export function useTennisDetailHook() {
  const dataList = reactive<SattleDataAPI.TennisEventsData[]>([]);
  const childloading = ref(true);
  const allSettleLoading = ref(false);
  const loading = ref(true);
  const expandMatchList = reactive<number[]>([]);
  const t1Score = ref(0);
  const t2Score = ref(0);
  const canSettlement = ref(false);
  const boardType = ref('5-3');
  const juType = ref('LONG-SET');
  const renderObj = reactive<SattleDataAPI.getSettlementDataList>(
    {} as SattleDataAPI.getSettlementDataList
  );

  //- 展开关闭局列表
  const expandChange = (
    row: SattleDataAPI.TennisEventsData,
    list: SattleDataAPI.TennisEventsData[]
  ) => {
    if (list.length) {
      if (!expandMatchList.includes(row.setNum)) {
        expandMatchList.push(row.setNum);
      }
    } else {
      expandMatchList.length = 0;
    }
  };

  // - 初始化
  const onSearch = async () => {
    const res = await API.getTennisEvents({
      matchId: history.state.params.matchId
    });
    childloading.value = false;
    loading.value = false;
    if (res.code) return message(res.msg, { type: 'error' });
    dataList.length = 0;
    dataList.push(...res.data);
  };

  //- 修改盘类型
  const changeBoardType = (type: string) => {
    dataList.forEach(item => {
      if (!item.id) item.gameRule = type;
    });
  };

  //- 修改局类型
  const changeJuType = (
    dataList: SattleDataAPI.InningEvent[],
    type: string
  ) => {
    dataList.forEach(item => {
      if (!item.id) item.gameRule = type;
    });
  };

  //- 新增盘
  const addEventRow = () => {
    if (dataList.length > 0 && !dataList[dataList.length - 1].id) {
      return message(t('请先结算上一盘赛事'), { type: 'error' });
    }
    const params: Partial<SattleDataAPI.TennisEventsData> = {
      inningNum: 0,
      matchId: history.state.params.matchId,
      setNum: dataList.length + 1,
      gameRule: boardType.value,
      loading: false,
      t1: 0,
      t2: 0,
      inningEvents: [
        {
          inningNum: 1,
          matchId: history.state.params.matchId,
          setNum: dataList.length + 1,
          t1: '',
          t2: '',
          //todo eventTime: '',
          eventTime:
            dataList.length === 0
              ? Date.now()
              : +dataList[dataList.length - 1].eventTime + 1000 * 60,
          gameRule: juType.value,
          isEdit: false
        }
      ] as SattleDataAPI.InningEvent[]
    };
    dataList.push(params as SattleDataAPI.TennisEventsData);
  };

  //- 新增局
  const addChildRow = (parentRow: SattleDataAPI.TennisEventsData) => {
    const noEmpty = parentRow.inningEvents.every(item => {
      return (
        item.t1 !== '' &&
        item.t2 !== '' &&
        item.t1 !== item.t2 &&
        item.eventTime &&
        !item.isEdit
      );
    });

    if (!noEmpty)
      return message(t('请先完成并保存之前的事件'), { type: 'error' });

    const params = {
      inningNum: parentRow.inningEvents.length + 1,
      matchId: history.state.params.matchId,
      setNum: parentRow.setNum,
      gameRule: juType.value,
      t1: '',
      t2: '',
      // eventTime: '',
      eventTime:
        parentRow.inningEvents.length === 0
          ? +dataList[dataList.length - 1].eventTime + 1000 * 60
          : +parentRow.inningEvents[parentRow.inningEvents.length - 1]
              .eventTime +
            1000 * 60,
      isEdit: false
    } as SattleDataAPI.InningEvent;
    parentRow.inningEvents.push(params);
  };

  //- 结算盘事件
  const settlementHandicap = async (
    parentRow: SattleDataAPI.TennisEventsData
  ) => {
    const { eventTime, t1, t2 } =
      parentRow.inningEvents[parentRow.inningEvents.length - 1];

    if (!eventTime || !t1 || !t2) {
      return message(t('请先完成并保存事件'), { type: 'error' });
    }

    ElMessageBox.confirm(
      `
      <div class="text-center">
          <div class="flex  justify-between">
            <span class="w-[45%]">${
              history.state.params.homeTeamNameCn ?? '_'
            }</span>
            <span class="font-bold">VS</span>
            <span class="w-[45%]">${
              history.state.params.awayTeamNameCn ?? '_'
            }</span>
         </div>
          <div>${t1Score.value}${t('局')} ： ${t2Score.value}${t('局')}</div>
          <div>${t('手动结算后无法回退，请再次确定结果')}</div>
      </div>
      `,
      `${t('结算第')}${parentRow.setNum}${t('盘')}`,
      {
        dangerouslyUseHTMLString: true,
        confirmButtonText: t('确认结算'),
        cancelButtonText: t('取消'),
        center: true
      }
    ).then(async () => {
      const inningEvents = parentRow.inningEvents.map(item => {
        delete item['isEdit'];
        return item;
      });
      parentRow.loading = true;
      const params = {
        eventTime,
        inningEvents,
        t1: t1Score.value,
        t2: t2Score.value,
        gameRule: parentRow.gameRule,
        inningNum: 0,
        setNum: parentRow.setNum,
        matchId: history.state.params.matchId
      };
      try {
        const res = await API.addTennisEvent(params);
        if (res.code) return message(res.msg, { type: 'error' });
        parentRow.loading = false;
        onSearch();
      } catch (error) {
        parentRow.loading = false;
      }
    });
  };

  //- 全场结算
  const allSettleBtnClick = async () => {
    let s1 = 0;
    let s2 = 0;
    const scoreList = dataList.map(item => [item.t1, item.t2]);
    scoreList.forEach(item => (item[0] > item[1] ? ++s1 : ++s2));
    if (
      //- todo
      dataList.length < 2 ||
      dataList.some(item => !item.id) ||
      Math.abs(s1 - s2) < 1
    ) {
      return message(t('请先完成盘结算'), { type: 'error' });
    }
    ElMessageBox.confirm(
      `
      <div class="text-center">
          <div>${t('手动确认比赛结束后，即开始结算')}</div>
          <div>${t('全场比赛玩法，结算后无法回退。')}</div>
      </div>
      `,
      t('确认比赛结算'),
      {
        dangerouslyUseHTMLString: true,
        confirmButtonText: t('确认结算'),
        cancelButtonText: t('取消'),
        center: true
      }
    ).then(async () => {
      try {
        allSettleLoading.value = true;
        const res = await API.manualSettlementFullTime({
          matchId: history.state.params.matchId
        });
        allSettleLoading.value = false;
        if (res.code) return message(res.msg, { type: 'error' });
        getMatchDetail();
      } catch (error) {
        allSettleLoading.value = false;
      }
    });
  };

  //- 获取比赛详情
  const getMatchDetail = async () => {
    const res = await API.getPreSaleInfo({
      matchId: history.state.params.matchId
    });
    if (res.code) return message(res.msg, { type: 'error' });
    Object.assign(renderObj, res.data);
  };

  onMounted(() => {
    getMatchDetail();
    onSearch();
  });

  return {
    onSearch,
    loading,
    columns,
    dataList,
    expandMatchList,
    childloading,
    childColumns,
    addEventRow,
    addChildRow,
    settlementHandicap,
    t1Score,
    t2Score,
    canSettlement,
    allSettleBtnClick,
    renderObj,
    boardType,
    juType,
    changeBoardType,
    changeJuType,
    expandChange,
    allSettleLoading
  };
}
