import { storageLocal } from "@pureadmin/utils";

interface MyObj {
  [key: string]: any;
}

interface ILocaleType {
  locale: 'zh' | 'en' | 'fr';
}

export const removeEmptyStringKeys = (obj: MyObj): MyObj => {
  return Object.entries(obj).reduce((newObj: MyObj, [key, value]) => {
    if (value !== '' && value !== ' ') {
      newObj[key] = value;
    }
    return newObj;
  }, {});
};

export const getLan = (): 'zh' | 'en' | 'fr' => {
  const lan =
    (storageLocal().getItem('responsive-locale') as ILocaleType)?.locale ?? 'zh';
  return lan;
}