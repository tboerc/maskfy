import custom from './custom';
import helpers from './helpers';

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

const verifierDigit = (digits: string): number => {
  let index: number = 2;
  const reverse: Array<number> = digits.split('').reduce((buffer: Array<number>, number) => {
    return [parseInt(number, 10)].concat(buffer);
  }, []);

  const sum: number = reverse.reduce((buffer, number) => {
    buffer += number * index;
    index = index === 9 ? 2 : index + 1;
    return buffer;
  }, 0);

  const mod: number = sum % 11;
  return mod < 2 ? 0 : 11 - mod;
};

const validate = (value: string = '') => {
  const stripped: string = helpers.toNumber(value);

  if (!stripped) {
    return false;
  }

  if (stripped.length !== 14) {
    return false;
  }

  if (BLACKLIST.includes(stripped)) {
    return false;
  }

  let numbers: string = stripped.substr(0, 12);
  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);

  return numbers.substr(-2) === stripped.substr(-2);
};

const cnpj = {
  validate,
  raw: (value: string = '') => helpers.toNumber(value),
  value: (value: string = '') => custom.value(value, '99.999.999/9999-99'),
};

export default cnpj;
