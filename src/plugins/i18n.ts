// 多组件库的国际化和本地项目国际化兼容
import { App } from "vue";
import { type I18n, createI18n } from "vue-i18n";

// element-plus国际化
import enLocale from "element-plus/dist/locale/en.mjs";
import zhLocale from 'element-plus/dist/locale/zh-cn.mjs'
import frLocale from "element-plus/dist/locale/fr.mjs";
import { CRC32 as crc32 } from 'crc_32_ts';

function siphonI18n(prefix = "zh-CN") {
  return Object.fromEntries(
    Object.entries(
      import.meta.glob("../../locales/json/*.json", { eager: true })
    ).map(([key, value]: any) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1];
      return [matched, value.default];
    })
  )[prefix];
}

export const localesConfigs = {
  zh: {
    ...siphonI18n("zh-CN"),
    ...zhLocale
  },
  en: {
    ...siphonI18n("en"),
    ...enLocale
  },
  fr: {
    ...siphonI18n("fr"),
    ...frLocale
  }
};

/**
 * 国际化转换工具函数（自动读取根目录locales文件夹下文件进行国际化匹配）
 * @param message message
 */

export function t(message: any = "", params: any = {}) {
  if (!message) return "";
  let hashKey = `k${crc32.str(message).toString(16)}`;
  if (params.context) hashKey = `${hashKey}_${params.context}`
  let words = i18n.global.t.call(i18n.global.locale, hashKey, params);
  if (words === hashKey) {
    // console.log(message, "-未翻译", words, hashKey);
    words = message;
  };
  return words;
}

export const i18n: I18n = createI18n({
  legacy: false,
  locale: JSON.parse(localStorage.getItem('responsive-locale') ?? "{}").locale ?? 'zh',
  fallbackLocale: "en",
  messages: localesConfigs
});

export function useI18n(app: App) {
  app.use(i18n);
}
