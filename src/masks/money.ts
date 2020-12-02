import helpers from './helpers';

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

const sanitize = (value: string | number, precision: number, delimiter: string) => {
  if (typeof value === 'number') {
    return value.toFixed(precision);
  }

  const index = value.indexOf(delimiter);

  if (index > 0) {
    return value.slice(0, index + 1 + precision);
  }

  return value;
};

const insert = (text: string, index: number) => {
  if (index > 0) return text.substring(0, index) + '.' + text.substring(index, text.length);
  else return '.' + text;
};

const toMoney = (value: string, settings: any) => {
  const number = value.toString().replace(/[\D]/g, ''),
    clearDelimiter = new RegExp('^(0|\\' + settings.delimiter + ')'),
    clearSeparator = new RegExp('(\\' + settings.separator + ')$');

  let money = number.substr(0, number.length - settings.precision),
    masked = money.substr(0, money.length % 3),
    cents = new Array(settings.precision + 1).join('0');

  money = money.substr(money.length % 3, money.length);

  for (let i = 0, len = money.length; i < len; i++) {
    if (i % 3 === 0) masked += settings.delimiter;
    masked += money[i];
  }

  masked = masked.replace(clearDelimiter, '');
  masked = masked.length ? masked : '0';

  const beginCents = number.length - settings.precision,
    centsValue = number.substr(beginCents, settings.precision),
    centsLength = centsValue.length,
    centsSliced = settings.precision > centsLength ? settings.precision : centsLength;

  cents = (cents + centsValue).slice(-centsSliced);

  const output = settings.unit + masked + settings.separator + cents + settings.suffixUnit;

  return output.replace(clearSeparator, '');
};

const money = {
  value: (value: string | number = '', settings?: Settings) => {
    const merged = helpers.mergeSettings(DEFAULT_SETTINGS, settings);
    const sanitized = sanitize(value, merged.precision, merged.delimiter);
    return toMoney(sanitized, merged);
  },
  raw: (value: string = '', settings?: Settings) => {
    const merged = helpers.mergeSettings(DEFAULT_SETTINGS, settings);

    let cleaned = helpers.toNumber(value);
    const postion = cleaned.length - merged.precision;

    cleaned = insert(cleaned, postion);
    return +cleaned;
  },
  validate: (value: string = '', settings?: Settings) => {
    const merged = helpers.mergeSettings(DEFAULT_SETTINGS, settings);
    return value.length > merged.precision + merged.unit.length + merged.suffixUnit.length;
  },
};

export default money;
