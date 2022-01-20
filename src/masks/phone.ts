import * as custom from './custom';
import {mergeSettings, toNumber} from './helpers';

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

const getMask = (s: string, settings?: Settings) => {
  const merged = mergeSettings(DEFAULT_SETTINGS, settings);

  if (merged.type === 'INTERNATIONAL') return PHONE_INTERNATIONAL;

  let mask = PHONE_8_MASK;
  const withDDD = merged.ddd && merged.ddd.length > 0;

  const use9DigitMask = (() => {
    if (withDDD) {
      const ddd = toNumber(merged.ddd);
      const remaining = s.substring(ddd.length);
      return remaining.length >= 9;
    }
    return s.length >= 9;
  })();

  if (use9DigitMask) {
    mask = PHONE_9_MASK;
  }

  if (withDDD) {
    mask = `${merged.ddd}${mask}`;
  }

  return mask;
};

export const raw = (s = '') => toNumber(s);

export const value = (s = '', settings?: Settings) => {
  const cleaned = toNumber(s);
  const mask = getMask(cleaned, settings);
  return custom.value(cleaned, mask);
};

export const validate = (s = '', settings?: Settings) => {
  const mask = getMask(toNumber(s), settings);
  return s.length === mask.length;
};
