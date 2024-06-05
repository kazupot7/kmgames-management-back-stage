import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { t } from "@/plugins/i18n";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{
    validator: (_, value, callback) => {
      if (value === "") {
        callback(new Error(t("商户名称不能为空")));
      } else if (value.length < 2) {
        callback(new Error(t("商户名称为2-30个字符")));
      } else {
        callback();
      }
    },
    trigger: "blur"
  }],
  tenantType: [{ required: true, message: t("商户类型不能为空"), trigger: "blur" }],
  adminAccount: [{
    validator: (_, value, callback) => {
      const amindReg = /^[a-zA-Z0-9]{6,12}$/;
      if (value === "") {
        callback(new Error(t("管理员账号不能为空")));
      } else if (!amindReg.test(value)) {
        callback(new Error(t("管理员账号为6-12个字符")));
      } else {
        callback();
      }
    },
    trigger: "blur"
  }],
  tenantCode: [{
    validator: (_, value, callback) => {
      const amindReg = /^[a-zA-Z0-9]{2,30}$/;
      if (value === "") {
        callback(new Error(t("商户编码不能为空")));
      } else if (!amindReg.test(value)) {
        callback(new Error(t("商户编码为2-30个字符")));
      } else {
        callback();
      }
    },
    trigger: "blur"
  }],
  tenantTag: [{ required: true, message: t("商户标签不能为空"), trigger: "blur" }],
  contact: [{
    validator: (_, value, callback) => {
      const amindReg = /^[^\s\n]{2,30}$/;
      if (!amindReg.test(value)) {
        callback(new Error(t("商户对接人为2-30个字符")));
      } else {
        callback();
      }
    },
    trigger: "blur"
  }],
  agentId: [{ required: true, message: t("上级不能为空"), trigger: "blur" }],
  commissionRatio: [{ required: true, message: t("抽成比例不能为空"), trigger: "blur" }],
  commissionRatioType: [{ required: true, message: t("计算模式不能为空"), trigger: "blur" }],
  paymentCycle: [{ required: true, message: t("缴纳周期不能为空"), trigger: "blur" }],
  currency: [{ required: true, message: t("结算币种不能为空"), trigger: "blur" }],
  tenantLevel: [{ required: true, message: t("商户等级不能为空"), trigger: "blur" }],
});
