import fs from 'fs';
import { map, mapValues, upperFirst } from 'lodash';
import { GraphQLEnumType } from 'graphql';

const toGraphql = (name, enumeration) => (
  new GraphQLEnumType({
    name,
    values: mapValues(enumeration, value => ({ value })),
  })
);

fs.readdirSync(__dirname).forEach((file) => {
  if (file.match(/\.js$/) && file !== 'index.js') {
    const enumeration = require(`./${file}`).default;
    const name = file
      .slice(0, -3)
      .split('-')
      .map(upperFirst)
      .join('');

    exports[name] = enumeration;
    exports[`${name}Type`] = toGraphql(name, enumeration);
    exports[`${name}Values`] = map(enumeration);
  }
});
