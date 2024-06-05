import { message } from "@/utils/message";
// import editForm from "../form.vue";
import type { PaginationProps } from "@pureadmin/table";
// import { addDialog } from "@/components/ReDialog";
import { t } from "@/plugins/i18n";
import { usePublicHooks } from "@/hooks";
import dayjs from "dayjs";

export function useHistory() {
  const dataList = reactive<HistoryDataAPI.History[]>([]);
  const loading = ref(true);
  const switchLoadMap = ref({});
  // const formRef = ref();
  const { switchStyle } = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: t("序号"),
      prop: "historyId",
      minWidth: 150,
      fixed: true
    },
    {
      label: t("联赛"),
      prop: "league",
      minWidth: 150,
      fixed: true
    },
    {
      label: t("联赛"),
      prop: "leagueLevel",
      minWidth: 150
    },
    {
      label: t("今日"),
      prop: "dateAndStatus",
      minWidth: 250,
      formatter: ({ date, status }) =>
        `${dayjs(date).format("YYYY-MM-DD HH:mm:ss")} : ${status}`
    },
    {
      label: t("主队名称"),
      prop: "homeTeam",
      minWidth: 150
    },
    {
      label: t("比分"),
      prop: "score",
      minWidth: 150
    },
    {
      label: t("客队名称"),
      prop: "awayTeam",
      minWidth: 150
    },
    {
      label: t("中立场"),
      prop: "neutral",
      minWidth: 150
    },
    {
      label: t("商业数据源"),
      prop: "businessDataSource",
      minWidth: 150
    },
    {
      label: t("竞品数据源"),
      prop: "competitionDataSource",
      minWidth: 150
    },
    {
      label: t("结算审核"),
      prop: "settlementReview",
      slot: "settlementReview",
      minWidth: 150
    },
    {
      label: t("滚球"),
      prop: "live",
      minWidth: 150
    },
    {
      label: t("开售状态"),
      prop: "saleStatus",
      minWidth: 150
    },
    {
      label: t("早盘主数据源"),
      prop: "earlyDataSource",
      minWidth: 150
    },
    {
      label: t("早盘开售玩法"),
      prop: "earlyGamePlay",
      minWidth: 150
    },
    {
      label: t("滚球"),
      prop: "liveDataSource",
      minWidth: 150
    }
  ];

  function handleSettlementReview(row: HistoryDataAPI.History) {
    console.log(row);
  }

  function handleTableWidthChange(val: number) {
    pagination.pageSize = val;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    onSearch();
  }

  async function onSearch(type?: string) {
    if (type === "reload") pagination.currentPage = 1;
    loading.value = true;
    // const data = removeEmptyStringKeys(form);
    const res: HistoryDataAPI.HistoryListRes = await API.getHistoryList({
      // ...data,
      pageSize: pagination.pageSize,
      pageNum: pagination.currentPage
    });
    if (res.code) return message(res.msg, { type: "error" });
    dataList.length = 0;
    dataList.push(...res.data.list);
    pagination.total = res.data.total;
    pagination.pageSize = res.data.pageSize;
    pagination.currentPage = res.data.pageNum;
    setTimeout(() => (loading.value = false), 500);
  }

  // const resetForm = formEl => {
  //   if (!formEl) return;
  //   formEl.resetFields();
  //   onSearch();
  // };

  // function openDialog(title: string, row?: ESportsAPI.League) {
  //   addDialog({
  //     title,
  //     props: {
  //       formInline: {
  //         leagueId: row?.leagueId ?? "",
  //         leagueNameCn: row?.leagueNameCn ?? "",
  //         leagueNameEn: row?.leagueNameEn ?? "",
  //         leagueName: row?.leagueName ?? "",
  //         dataSource: row?.dataSource ?? "",
  //         dataSourceName: row?.dataSourceName ?? "",
  //         sort: row?.sort
  //       }
  //     },
  //     width: "40%",
  //     draggable: true,
  //     fullscreenIcon: true,
  //     closeOnClickModal: false,
  //     contentRenderer: () => h(editForm, { ref: formRef }),
  //     beforeSure: (done, { options }) => {
  //       const FormRef = formRef.value.getRef();
  //       const curData = options.props.formInline as ESportsAPI.League;
  //       function chores() {
  //         done();
  //         onSearch();
  //       }
  //       FormRef.validate(async valid => {
  //         if (valid) {
  //           console.log("curData", curData);

  //           if (title === "新增") {
  //             await API.createhistory(curData);
  //             chores();
  //           } else {
  //             await API.updatehistory(curData);
  //             chores();
  //           }
  //         }
  //       });
  //     }
  //   });
  // }

  onMounted(() => {
    onSearch();
  });
  return {
    loading,
    columns,
    dataList,
    pagination,
    onSearch,
    handleTableWidthChange,
    switchLoadMap,
    handleCurrentChange,
    handleSettlementReview,
    switchStyle
  };
}
