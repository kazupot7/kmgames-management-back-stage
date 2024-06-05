interface MyObj {
  [key: string]: any;
}


export const removeEmptyStringKeys = (obj: MyObj): MyObj => {
  return Object.entries(obj).reduce((newObj: MyObj, [key, value]) => {
    if (value !== '' && value !== ' ') {
      newObj[key] = value;
    }
    return newObj;
  }, {});
};