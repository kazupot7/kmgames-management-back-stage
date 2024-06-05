
// input输入数字
const MAX_INPUT_NUMBER_LENGTH = 15;
export const formatNumber = (val: string, len?: number) => {
  if (val === '0') return val;
  return val.replace(/\D/g, '').replace(/^0{1,}/g, '').slice(0, len ?? MAX_INPUT_NUMBER_LENGTH)
}

//- 过滤中文跟空格
export const formatChinese = (val: string, len?: number) => {
  if (val === '0') return val;
  return val.replace(/\u4e00-\u9fa5\s/g, '').replace(/^0{1,}/g, '').slice(0, len ?? MAX_INPUT_NUMBER_LENGTH)
}
const MIN = 1;
const MAX = 200;
export const inputRestrictions = (val, min: number = MIN, max: number = MAX) => {
  if (val !== '') {
    let n = val.replace(/\D/g, '').replace(/^0{1,}/g, '');
    if (n > max) n = max;
    if (n < min) n = min;
    return n;
  } else {
    return ''
  }
}