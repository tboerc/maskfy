import * as custom from './custom';
import {toNumber} from './helpers';

export const validate = (s = '') => s.length === 9;

export const raw = (s = '') => toNumber(s);

export const value = (s = '') => custom.value(s, '99999-999');
