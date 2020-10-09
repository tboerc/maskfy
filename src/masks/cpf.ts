import custom from './custom';
import helpers from './helpers';

const ZERO_TO_NINE = Array.from({length: 9}, (_, i) => i);

const validate = (cpf: string = '') => {
  try {
    if (!(cpf.length === 14 || cpf.length === 11)) return false;

    const cpf_number = cpf
      .replace(/\./gi, '')
      .replace(/-/gi, '')
      .split('')
      .map((v) => +v);

    if (ZERO_TO_NINE.some((i) => cpf_number.every((v) => v === i))) throw new Error();

    let soma = cpf_number.slice(0, 9).reduce((prev, curr, index) => prev + curr * (10 - index), 0);
    let resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== cpf_number[9]) return false;

    soma = cpf_number.slice(0, 10).reduce((prev, curr, index) => prev + curr * (11 - index), 0);
    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== cpf_number[10]) return false;

    return true;
  } catch (e) {
    return false;
  }
};

const cpf = {
  validate,
  raw: (value: string = '') => helpers.toNumber(value),
  value: (value: string = '') => custom.value(value, '999.999.999-99'),
};

export default cpf;
