import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { t } from "@/plugins/i18n";

const formRules = reactive(<FormRules>{
  dictValue: [{ required: true, message: t('Value不能为空') }],
});

export { formRules };
