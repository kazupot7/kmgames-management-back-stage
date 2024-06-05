import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { t } from "@/plugins/i18n";

/** 密码正则（密码格式应为8-18位数字、字母、符号的任意两种组合） */
export const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/;

export const REGEXP_EMAIL = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

const APPLY_BY = /^[\w\W\d\D\s\S]{2,30}$/;

const formRules = reactive(<FormRules>{
  tenantId: [{ required: true, message: t('商户名称不能为空') }],
  applyBy: [
    {
      validator: (_, value, callback) => {
        if (value === "") {
          callback(new Error(t("申请人不能为空")));
        } else if (!APPLY_BY.test(value)) {
          callback(new Error(t("申请人格式不正确")));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  effectType: [{ required: true, message: t('作用域不能为空') }],
  whiteIp: [{ required: true, message: t('IP地址不能为空') }],
});

export { formRules };
