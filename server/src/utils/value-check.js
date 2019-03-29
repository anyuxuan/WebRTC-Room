const toString = Object.prototype.toString;

const isType = (type) => (val) => toString.call(val) === `[object ${type}]`;

export const isEmpty = (val) => {
  return val == null || !(Object.keys(val) || val).length;
};

export const isPlainObject = isType('Object');

export const isString = isType('String');
