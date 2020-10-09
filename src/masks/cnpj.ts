import custom from './custom';
import helpers from './helpers';

const validate = (value: string) => {
  const empty = (value || '').trim().length === 0;
  if (empty) return false;

  const valida = new Array(6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
  let dig1 = 0;
  let dig2 = 0;

  const exp = /\.|\-|\//g;
  const cnpj = value.toString().replace(exp, '');
  const digito = +eval(cnpj.charAt(12) + cnpj.charAt(13));

  for (let i = 0; i < valida.length; i++) {
    dig1 += i > 0 ? +cnpj.charAt(i - 1) * valida[i] : 0;
    dig2 += +cnpj.charAt(i) * valida[i];
  }
  dig1 = dig1 % 11 < 2 ? 0 : 11 - (dig1 % 11);
  dig2 = dig2 % 11 < 2 ? 0 : 11 - (dig2 % 11);

  return dig1 * 10 + dig2 == digito;
};

const cnpj = {
  validate,
  raw: (value: string = '') => helpers.toNumber(value),
  value: (value: string = '') => custom.value(value, '99.999.999/9999-99'),
};

export default cnpj;
