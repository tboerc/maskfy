type Object = {[key: string]: any};

const helpers = {
  toNumber: (value: string) => value.replace(/(?!^-)[^0-9]/g, ''),

  mergeSettings: (obj1: Object = {}, obj2: Object = {}) => {
    return {...obj1, ...obj2};
  },
};

export default helpers;
