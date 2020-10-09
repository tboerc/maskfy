type MaskTransalation = {[key: string]: (val: string) => string};

const DEFAULT_TRANSLATION: MaskTransalation = {
  '*': (val) => val,
  '9': (val) => val.replace(/[^0-9]+/g, ''),
  A: (val) => val.replace(/[^a-zA-Z]+/g, ''),
  S: (val) => val.replace(/[^a-zA-Z0-9]+/g, ''),
};

const toPattern = (value: string, mask: string, translation = DEFAULT_TRANSLATION) => {
  let result = '';
  let maskCharIndex = 0;
  let valueCharIndex = 0;

  while (true) {
    if (maskCharIndex === mask.length) break;
    if (valueCharIndex === value.length) break;

    const maskChar = mask[maskCharIndex];
    const valueChar = value[valueCharIndex];

    // value equals mask, just set
    if (maskChar === valueChar) {
      result += maskChar;
      valueCharIndex += 1;
      maskCharIndex += 1;
      continue;
    }

    // apply translator if match
    const translationHandler = translation[maskChar];

    if (!translationHandler) {
      // not masked value, fixed char on mask
      result += maskChar;
      maskCharIndex += 1;
      continue;
    }

    const resolverValue = translationHandler(valueChar || '');

    if (resolverValue === '') {
      // valueChar replaced so don't add it to result, keep the mask at the same point and continue to next value char
      valueCharIndex += 1;
      continue;
    } else if (resolverValue !== null) {
      result += resolverValue;
      valueCharIndex += 1;
    } else {
      result += maskChar;
    }

    maskCharIndex += 1;
  }
  return result;
};

const custom = {
  value: (value: string, mask: string, translation?: MaskTransalation) => {
    if (value === '') return value;
    const masked = toPattern(value, mask, translation);
    return masked;
  },
};

export default custom;
