import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { t } from "@/plugins/i18n";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  leagueNameCn: [{ required: true, message: t("必须输入中文简体名字"), trigger: "blur" }],
  leagueNameEn: [{ required: true, message: t("必须输入英文名称"), trigger: "blur" }],
  leagueName: [{ required: true, message: t("必须输入简称"), trigger: "blur" }],
  dataSource: [{ required: true, message: t(" 必须输入英文名（数据商）"), trigger: "blur" }],
  dataSourceName: [{ required: true, message: t("必须输入数据商"), trigger: "blur" }],
});
