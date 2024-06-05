import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { t } from "@/plugins/i18n";
import { IResetForm } from "./type";

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

/** 重置密码校验 */
const resetPasswordRules = <T extends IResetForm>(form: T) => {
  return {
    oldPassword: [
      {
        validator: (_, value, callback) => {
          if (value === "") {
            callback(new Error(t("旧密码不能为空")));
          } else {
            callback();
          }
        },
        trigger: "blur"
      }
    ],
    newPassword: [
      {
        validator: (_, value, callback) => {
          if (value === "") {
            callback(new Error(t("新密码不能为空")));
          } else if (!REGEXP_PWD.test(value)) {
            callback(new Error(t("密码至少8个字符，包括字母和数字")));
          } else {
            callback();
          }
        },
        trigger: "blur"
      }
    ],
    confirmPassword: [
      {
        validator: (_, value, callback) => {
          if (value === "") {
            callback(new Error(t("确认密码不能为空")));
          } else if (form.newPassword !== value) {
            callback(new Error(t("两次输入的密码不一致，请重新输入")));
          } else {
            callback();
          }
        },
        trigger: "blur"
      }
    ],
  }
}


export { loginRules, resetPasswordRules };
