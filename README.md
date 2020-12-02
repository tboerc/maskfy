# maskfy

Pure javascript mask plugin to use anywhere you like.

## Features

- Only depends on javascript;
- Can mask inputs or just strings;
- Can be used on React, React Native, Node or anywhere.

## Installation

```bash
yarn add @tboerc/maskfy
# or npm i @tboerc/maskfy
```

## Usage

You can use maskfy just to mask a string:

```javascript
import {Mask} from '@tboerc/maskfy';

// Masking a string using a provided mask
// The sample bellow will output (85) 2741-1509
Mask.phone.value('8527411509');
```

But you can also use it alongside with a input component:

```javascript
import React from 'react';
import {Mask} from '@tboerc/maskfy';

const SomeScreen = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <input value={value} onChange={(e) => setValue(Mask.phone.value(e.target.value))} />
    </>
  );
};
```

It can be used with React Native too, but you will need to change some properties, like `onChange` to `onChangeText`.

## API

### Mask

All base masks are wrapped on this object, and alongside with it, there are the custom options and some helpers if nedded.

Currently, it ships by default masks to: `{cep, cnpj, cpf, money, phone}`.

The usage on all those mask will follow the same pattern with thoose three methods: `value`, `raw` and `validate`.

#### value(string, settings?)

Return the string with applied mask over it. Sometimes you can provide custom settings too.

#### raw(string, settings?)

Return the string without any applied mask. Sometimes you can provide custom settings too.

#### validate(string)

Tries to validate the string following some simple rules, generaly is based on the length of mask. But in some cases have complex validations, like in CPF mask.

### Mask.custom(string, mask)

If you need to use a custom mask, you can use the `custom` method. Just pass your string and the mask pattern to apply over it. The pattern rules are defined bellow.

    9 - Accept digit;
    A - Accept alpha;
    S - Accept alphanumeric;
    * - Accept all, EXCEPT white space.

## Thanks to

- [vanilla-masker](https://github.com/BankFacil/vanilla-masker);
- [react-native-masked-text](https://github.com/benhurott/react-native-masked-text).
