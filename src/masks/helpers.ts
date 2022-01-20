export const toNumber = (v = '') => v.replace(/(?!^-)[^0-9]/g, '');

export const mergeSettings = <T extends Record<string, any>>(obj1: T, obj2?: T) => ({...obj1, ...obj2} as Required<T>);
