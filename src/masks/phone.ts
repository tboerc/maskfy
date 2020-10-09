import custom from './custom';
import helpers from './helpers';

type Settings = {
  ddd?: string;
  type?: 'BRL' | 'INTERNATIONAL';
};

const DEFAULT_SETTINGS: Settings = {
  type: 'BRL',
  ddd: '(99) ',
};

const PHONE_8_MASK = '9999-9999';
const PHONE_9_MASK = '99999-9999';
const PHONE_INTERNATIONAL = '+999 999 999 999';

const getMask = (value: string, settings?: Settings) => {
  const merged = helpers.mergeSettings(DEFAULT_SETTINGS, settings);

  if (merged.type === 'INTERNATIONAL') return PHONE_INTERNATIONAL;

  let mask = PHONE_8_MASK;
  const withDDD = merged.ddd && merged.ddd.length > 0;

  const use9DigitMask = (() => {
    if (withDDD) {
      const ddd = helpers.toNumber(merged.ddd);
      const remaining = value.substr(ddd.length);
      return remaining.length >= 9;
    }
    return value.length >= 9;
  })();

  if (use9DigitMask) mask = PHONE_9_MASK;
  if (withDDD) mask = `${merged.ddd}${mask}`;
  return mask;
};

const phone = {
  raw: (value: string = '') => helpers.toNumber(value),
  value: (value: string = '', settings?: Settings) => {
    const cleaned = helpers.toNumber(value);
    const mask = getMask(cleaned, settings);
    return custom.value(cleaned, mask);
  },
  validate: (value: string = '', settings?: Settings) => {
    const cleaned = helpers.toNumber(value);
    const mask = getMask(cleaned, settings);
    return value.length === mask.length;
  },
};

export default phone;
