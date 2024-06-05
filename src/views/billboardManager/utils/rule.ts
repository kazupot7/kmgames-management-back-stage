import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { t } from "@/plugins/i18n";

const formRules = reactive(<FormRules>{
  billboardTitleCn: [{ required: true, message: t('中文标题不能为空') }],
  // billboardTitleEn: [{ required: true, message: t('英文标题不能为空') }],
  // billboardTypeEn: [{ required: true, message: t('英文类型不能为空') }],
  billboardTypeCn: [{ required: true, message: t('中文类型不能为空') }],
  billboardContentCn: [{ required: true, message: t('中文内容不能为空') }],
  // billboardContentEn: [{ required: true, message: t('英文不能为空') }],
});

export { formRules };
