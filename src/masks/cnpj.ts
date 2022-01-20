import * as custom from './custom';
import {toNumber} from './helpers';

const BLACKLIST: Array<string> = [
  '00000000000000',
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999',
];

const verifierDigit = (digits: string) => {
  let index = 2;

  const reverse: Array<number> = digits.split('').reduce((prev: number[], curr) => {
    return [parseInt(curr, 10)].concat(prev);
  }, []);

  const sum = reverse.reduce((prev, curr) => {
    prev += curr * index;
    index = index === 9 ? 2 : index + 1;
    return prev;
  }, 0);

  const mod = sum % 11;

  return mod < 2 ? 0 : 11 - mod;
};

export const validate = (s: '') => {
  const stripped = toNumber(s);

  if (!stripped) {
    return false;
  }

  if (stripped.length !== 14) {
    return false;
  }

  if (BLACKLIST.includes(stripped)) {
    return false;
  }

  let numbers = stripped.substring(0, 12);
  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);

  return numbers.substring(-2) === stripped.substring(-2);
};

export const raw = (s = '') => toNumber(s);

export const value = (s = '') => custom.value(s, '99.999.999/9999-99');
