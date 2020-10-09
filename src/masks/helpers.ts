type Object = {[key: string]: any};

const helpers = {
  toNumber: (value: string) => value.replace(/(?!^-)[^0-9]/g, ''),

  mergeSettings: (obj1: Object = {}, obj2: Object = {}) => {
    const obj3: Object = {};
    for (const key in obj1) obj3[key] = obj1[key];
    for (const key in obj2) obj3[key] = obj2[key];
    return obj3;
  },
};

export default helpers;
