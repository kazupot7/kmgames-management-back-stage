import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  matchId: [{ required: true, message: t('赛事ID不能为空'), trigger: "blur" }],
  matchName: [{ required: true, message: t('赛事名称不能为空'), trigger: "blur" }],
  level: [{ required: true, message: t('赛事等级不能为空'), trigger: "blur" }],
  sportId: [{ required: true, message: t('赛种不能为空'), trigger: "blur" }],
  beginTime: [{ required: true, message: t('比赛时间不能为空'), trigger: "blur" }],
});
