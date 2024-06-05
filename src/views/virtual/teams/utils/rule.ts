import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { t } from "@/plugins/i18n";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  teamNameCn: [{ required: true, message: t("中文简体"), trigger: "blur" }],
  teamNameEn: [{ required: true, message: t("英文名称"), trigger: "blur" }],
  teamName: [{ required: true, message: t("简称"), trigger: "blur" }],
  dataSource: [{ required: true, message: t("英文名（数据商）"), trigger: "blur" }],
  dataSourceName: [{ required: true, message: t("必须输入数据商"), trigger: "blur" }],
});
