import * as custom from './custom';
import {toNumber} from './helpers';

const BLACKLIST: Array<string> = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
  '12345678909',
];

const verifierDigit = (digits: string): number => {
  const numbers = digits.split('').map(number => {
    return parseInt(number, 10);
  });

  const modulus = numbers.length + 1;
  const multiplied = numbers.map((number, index) => number * (modulus - index));
  const mod = multiplied.reduce((prev, curr) => prev + curr) % 11;

  return mod < 2 ? 0 : 11 - mod;
};

export const validate = (s = '') => {
  const stripped = toNumber(s);

  if (!stripped) {
    return false;
  }

  if (stripped.length !== 11) {
    return false;
  }

  if (BLACKLIST.includes(stripped)) {
    return false;
  }

  let numbers = stripped.substring(0, 9);
  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);

  return numbers.substring(-2) === stripped.substring(-2);
};

export const raw = (s = '') => toNumber(s);

export const value = (s = '') => custom.value(s, '999.999.999-99');
