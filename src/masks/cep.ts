import custom from './custom';
import helpers from './helpers';

const cep = {
  validate: (value: string = '') => value.length === 9,
  raw: (value: string = '') => helpers.toNumber(value),
  value: (value: string = '') => custom.value(value, '99999-999'),
};

export default cep;
