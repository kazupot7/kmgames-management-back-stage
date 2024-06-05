import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { t } from '@/plugins/i18n'

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  leagueId: [{ required: true, message: t('联赛杯ID不能为空'), trigger: "blur" }],
  countryId: [{ required: true, message: t('国家地区不能为空'), trigger: "blur" }],
  leagueId188Bet: [{ required: true, message: t('188数据源联赛杯赛不能为空'), trigger: "blur" }],
  leagueNameCn: [{ required: true, message: t('联赛杯赛中文名不能为空'), trigger: "blur" }],
  leagueNameEn: [{ required: true, message: t('联赛杯赛英文名不能为空'), trigger: "blur" }],
  level: [{ required: true, message: t('联赛杯等级不能为空'), trigger: "blur" }],
  sportId: [{ required: true, message: t('赛种不能为空'), trigger: "blur" }],
});
