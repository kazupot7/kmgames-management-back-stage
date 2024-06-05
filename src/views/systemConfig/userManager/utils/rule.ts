import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { t } from "@/plugins/i18n";

/** 密码正则（密码格式应为8-18位数字、字母、符号的任意两种组合） */
export const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/;

export const REGEXP_EMAIL = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

const NAME_REG = /^[a-zA-Z][a-zA-Z0-9]{5,19}$/;

const formRules = reactive(<FormRules>{
  name: [
    {
      validator: (_, value, callback) => {
        if (value === "") {
          callback(new Error(t("账户名称不能为空")));
        } else if (!NAME_REG.test(value)) {
          callback(new Error(t("账号名称格式不正确")));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  dept: [{ required: true, message: t('所属部门不能为空') }],
  roleId: [
    { required: true, message: t('角色不能为空') },
    {
      validator: (_, value, callback) => {
        if (value === "") {
          callback(new Error(t("角色不能为空")));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  ukeyCode: [
    import.meta.env.VITE_BUILD_TYPE === 'pro' ? { required: true, message: t('U盾序列号不能为空不能为空') } : {},
  ],
});

export { formRules };
