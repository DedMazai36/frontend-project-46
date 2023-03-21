import _ from 'lodash';
import { getFiltredNames, isObject } from './formattersEngine.js';

const getStringForObject1 = (
  name,
  object1,
  object2,
  namesOfFile1,
  replacer,
  spacesCount,
) => {
  const message = `${name}: ${object1[name]}`;
  if (
    _.intersection(namesOfFile1, Object.getOwnPropertyNames(object2)).indexOf(
      name,
    ) >= 0
  ) {
    return `${replacer.repeat(spacesCount)}  ${message}`;
  }
  return `${replacer.repeat(spacesCount)}- ${message}`;
};

const getStringForObject2 = (name, object, replacer, spacesCount) => {
  const message = `${name}: ${object[name]}`;
  return `${replacer.repeat(spacesCount)}+ ${message}`;
};

const getStringForSimpleObject = (
  name,
  object,
  replacer,
  spacesCount,
  numberObject = 0,
) => {
  switch (numberObject) {
    case 1:
      return `${replacer.repeat(spacesCount)}- ${name}: ${object[name]}`;
    case 2:
      return `${replacer.repeat(spacesCount)}+ ${name}: ${object[name]}`;
    default:
      return `${replacer.repeat(spacesCount)}  ${name}: ${object[name]}`;
  }
};

const iterForSimpleObject = (object, replacer, spacesCount) => {
  const objectNames = Object.getOwnPropertyNames(object);
  const resultArrayOfStrings = objectNames.map((name) => {
    const value = object[name];
    if (!isObject(value)) {
      return (
        getStringForSimpleObject(name, object, replacer, spacesCount)
      );
    }
    return [
      `${replacer.repeat(spacesCount)}  ${name}: {`,
      iterForSimpleObject(value, replacer, spacesCount + 2),
      `${replacer.repeat(spacesCount)}  }`,
    ];
  });
  return resultArrayOfStrings.flat(2).join('\n');
};

const stylish = (object1, object2, replacer = '  ', spacesCount = 1) => {
  const arrayOfNames = getFiltredNames(object1, object2);
  const [filtredNamesOfObject1,
    filtredNamesOfIntersection,
    filtredNamesOfObject2] = arrayOfNames;

  const arrayForSort = _.sortBy(arrayOfNames.flat(10));

  const resultArrayOfStrings = arrayForSort.map((name) => {
    if (filtredNamesOfObject1.includes(name)) {
      if (Object.getOwnPropertyNames(object2).includes(name)) {
        if (isObject(object1[name])) {
          const string = `${replacer.repeat(spacesCount)}  ${name}: {`;
          return [string,
            iterForSimpleObject(object1[name], replacer, spacesCount + 2),
            `${replacer.repeat(spacesCount)}  }`];
        }
        if (!isObject(object1[name])) {
          const string = getStringForObject1(
            name,
            object1,
            object2,
            filtredNamesOfObject1,
            replacer,
            spacesCount,
          );
          return string;
        }
      }
      if (!Object.getOwnPropertyNames(object2).includes(name)) {
        if (isObject(object1[name])) {
          const string = `${replacer.repeat(spacesCount)}- ${name}: {`;
          return [string,
            iterForSimpleObject(object1[name], replacer, spacesCount + 2),
            `${replacer.repeat(spacesCount)}  }`];
        }
        if (!isObject(object1[name])) {
          const string = getStringForObject1(
            name,
            object1,
            object2,
            filtredNamesOfObject1,
            replacer,
            spacesCount,
          );
          return string;
        }
      }
    }

    if (filtredNamesOfObject2.includes(name)) {
      if (isObject(object2[name])) {
        const string = `${replacer.repeat(spacesCount)}+ ${name}: {`;
        return [string,
          iterForSimpleObject(object2[name], replacer, spacesCount + 2),
          `${replacer.repeat(spacesCount)}  }`];
      }
      if (!isObject(object2[name])) {
        const string = getStringForObject2(
          name,
          object2,
          replacer,
          spacesCount,
        );
        return string;
      }
    }

    if (filtredNamesOfIntersection.includes(name)) {
      if (!(isObject(object1[name]) && isObject(object2[name]))) {
        if (isObject(object1[name]) && isObject(object2[name])) {
          const string1 = `${replacer.repeat(spacesCount)}- ${name}: {`;
          const string2 = `${replacer.repeat(spacesCount)}+ ${name}: {`;
          return [string1,
            iterForSimpleObject(object1[name], replacer, spacesCount + 2),
            `${replacer.repeat(spacesCount)}  }`,
            string2,
            iterForSimpleObject(object2[name], replacer, spacesCount + 2),
            `${replacer.repeat(spacesCount)}  }`];
        }
        if (isObject(object1[name]) && !isObject(object2[name])) {
          const string1 = `${replacer.repeat(spacesCount)}- ${name}: {`;
          const string2 = getStringForObject2(
            name,
            object2,
            replacer,
            spacesCount,
          );
          return [
            string1,
            iterForSimpleObject(object1[name], replacer, spacesCount + 2),
            `${replacer.repeat(spacesCount)}  }`,
            string2,
          ];
        }
        if (!isObject(object1[name]) && isObject(object2[name])) {
          const string1 = getStringForObject1(
            name,
            object1,
            object2,
            filtredNamesOfObject1,
            replacer,
            spacesCount,
          );
          const string2 = `${replacer.repeat(spacesCount)}+ ${name}: {`;
          return [
            string1,
            string2,
            iterForSimpleObject(object2[name], replacer, spacesCount + 2),
            `${replacer.repeat(spacesCount)}  }`,
          ];
        }
        if (!isObject(object1[name]) && !isObject(object2[name])) {
          const string1 = getStringForObject1(
            name,
            object1,
            object2,
            filtredNamesOfObject1,
            replacer,
            spacesCount,
          );
          const string2 = getStringForObject2(
            name,
            object2,
            replacer,
            spacesCount,
          );
          return [string1, string2];
        }
      }
      return [`${replacer.repeat(spacesCount)}  ${name}: {`,
        stylish(object1[name], object2[name], replacer, spacesCount + 2),
        `${replacer.repeat(spacesCount)}  }`];
    }
    return [];
  });

  return `${resultArrayOfStrings.flat(2).join('\n')}`;
};

export default stylish;
