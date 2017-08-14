import fs from 'fs';
import { map, mapValues, upperFirst } from 'lodash';

fs.readdirSync(__dirname).forEach((file) => {
  if (file.match(/\.js$/) && file !== 'index.js') {
    const enumeration = require(`./${file}`).default;
    const name = file
      .slice(0, -3)
      .split('-')
      .map(upperFirst)
      .join('');

    exports[name] = enumeration;
    exports[`${name}Values`] = map(enumeration);
  }
});
