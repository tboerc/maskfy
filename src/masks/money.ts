import {mergeSettings, toNumber} from './helpers';

type Settings = {
  precision?: number;
  separator?: string;
  delimiter?: string;
  suffixUnit?: string;
  unit?: string;
};

const DEFAULT_SETTINGS: Settings = {
  precision: 2,
  separator: ',',
  delimiter: '.',
  unit: 'R$ ',
  suffixUnit: '',
};

const sanitize = (value: string | number, precision: number) => {
  if (typeof value === 'number') {
    return value.toFixed(precision);
  }
  return value;
};

const insert = (s: string, index: number) => {
  if (index > 0) return s.substring(0, index) + '.' + s.substring(index, s.length);
  else return '.' + s;
};

const toMoney = (s: string, settings: Required<Settings>) => {
  const number = s.toString().replace(/[\D]/g, ''),
    clearSeparator = new RegExp('(\\' + settings.separator + ')$'),
    clearDelimiter = new RegExp('^(0|\\' + settings.delimiter + ')');

  let money = number.substring(0, number.length - settings.precision),
    masked = money.substring(0, money.length % 3),
    cents = new Array(settings.precision + 1).join('0');

  money = money.substring(money.length % 3, money.length);

  for (let i = 0, len = money.length; i < len; i++) {
    if (i % 3 === 0) masked += settings.delimiter;
    masked += money[i];
  }

  masked = masked.replace(clearDelimiter, '');
  masked = masked.length ? masked : '0';

  const beginCents = number.length - settings.precision,
    centsValue = number.substring(beginCents, settings.precision),
    centsLength = centsValue.length,
    centsSliced = settings.precision > centsLength ? settings.precision : centsLength;

  cents = (cents + centsValue).slice(-centsSliced);

  const output = settings.unit + masked + settings.separator + cents + settings.suffixUnit;

  return output.replace(clearSeparator, '');
};

export const value = (value: string | number = '', settings?: Settings) => {
  const merged = mergeSettings(DEFAULT_SETTINGS, settings);
  const sanitized = sanitize(value, merged.precision);

  return toMoney(sanitized, merged);
};

export const raw = (value = '', settings?: Settings) => {
  const merged = mergeSettings(DEFAULT_SETTINGS, settings);
  const cleaned = toNumber(value);

  return +insert(cleaned, cleaned.length - merged.precision);
};

export const validate = (value = '', settings?: Settings) => {
  const merged = mergeSettings(DEFAULT_SETTINGS, settings);
  return value.length > merged.precision + merged.unit.length + merged.suffixUnit.length;
};
