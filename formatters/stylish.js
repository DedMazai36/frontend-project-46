import _ from 'lodash';
import { getFiltredNames, isObject } from './formattersEngine.js';

const getStringForValue = (object, name, replacer, spacesCount) => {
  const message = `${name}: ${object[name]}`;
  return `${'  '.repeat(spacesCount)}${replacer}${message}`;
};

const iterForObject = (object, replacer, spacesCount) => {
  const objectNames = Object.getOwnPropertyNames(object);
  const resultArrayOfStrings = objectNames.map((name) => {
    const value = object[name];
    if (!isObject(value)) {
      return (
        getStringForValue(object, name, replacer, spacesCount)
      );
    }
    return [
      `${replacer.repeat(spacesCount)}  ${name}: {`,
      iterForObject(value, replacer, spacesCount + 2),
      `${replacer.repeat(spacesCount)}  }`,
    ];
  });
  return resultArrayOfStrings.flat(2).join('\n');
};

const getResultString = (object, name, replacer, spacesCount) => {
  if (!isObject(object[name])) {
    return getStringForValue(object, name, replacer, spacesCount);
  }

  return [
    `${'  '.repeat(spacesCount)}${replacer}${name}: {`,
    iterForObject(object[name], '  ', spacesCount + 2),
    `${'  '.repeat(spacesCount)}  }`,
  ];
};

const stylish = (object1, object2, spacesCount = 1) => {
  const arrayOfNames = getFiltredNames(object1, object2);
  const [
    uniqueNamesOfFile1,
    uniqueNamesOfFile2,
    intersectionWidthDifference,
    allNames,
  ] = arrayOfNames;
  const arrayForSort = _.sortBy(allNames);
  const resultArrayOfStrings = arrayForSort.map((name) => {
    if (uniqueNamesOfFile1.includes(name)) {
      return getResultString(object1, name, '- ', spacesCount);
    }
    if (uniqueNamesOfFile2.includes(name)) {
      return getResultString(object2, name, '+ ', spacesCount);
    }
    if (!intersectionWidthDifference.includes(name)) {
      return getResultString(object1, name, '  ', spacesCount);
    }
    if (!(isObject(object1[name]) && isObject(object2[name]))) {
      return [
        getResultString(object1, name, '- ', spacesCount),
        getResultString(object2, name, '+ ', spacesCount),
      ];
    }
    return [
      `${'  '.repeat(spacesCount)}  ${name}: {`,
      stylish(object1[name], object2[name], spacesCount + 2),
      `${'  '.repeat(spacesCount)}  }`,
    ];
  });

  return `${resultArrayOfStrings.flat(2).join('\n')}`;
};

export default stylish;
