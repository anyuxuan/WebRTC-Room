const toString = Object.prototype.toString;

const isType = (type: string) => (val: any): boolean => toString.call(val) === `[object ${type}]`;

export const isEmpty = (val: any): boolean => {
  return val == null || !(Object.keys(val) || val).length;
};

export const isPlainObject = isType('Object');


