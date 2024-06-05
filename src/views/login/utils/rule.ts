import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { t } from "@/plugins/i18n";

/** 密码正则（密码格式应为8-18位数字、字母、符号的任意两种组合） */
export const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/;

export const REGEXP_EMAIL = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

/** 登录校验 */
const loginRules = reactive(<FormRules>{
  username: [
    {
      validator: (_, value, callback) => {
        if (value === "") {
          callback(new Error(t("请输入用户名")));
        } /* else if (!REGEXP_EMAIL.test(value)) {
          callback(new Error(t("请输入电子邮件格式的用户名")));
        } */ else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  password: [
    {
      validator: (_, value, callback) => {
        if (value === "") {
          callback(new Error(t("请输入密码")));
        }/*  else if (!REGEXP_PWD.test(value)) {
          callback(new Error(t("密码格式应为 8-18 位数字的任意组合")));
        }  */else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],

});



export { loginRules };
