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
  const resultArrayOfStrings = [];
  objectNames.forEach((name) => {
    const value = object[name];
    if (!isObject(value)) {
      resultArrayOfStrings.push(
        getStringForSimpleObject(name, object, replacer, spacesCount),
      );
    } else {
      resultArrayOfStrings.push(`${replacer.repeat(spacesCount)}  ${name}: {`);
      resultArrayOfStrings.push(
        iterForSimpleObject(value, replacer, spacesCount + 2),
      );
      resultArrayOfStrings.push(`${replacer.repeat(spacesCount)}  }`);
    }
  });
  return resultArrayOfStrings.join('\n');
};

const stylish = (object1, object2, replacer = '  ', spacesCount = 1) => {
  const arrayOfNames = getFiltredNames(object1, object2);
  const filtredNamesOfObject1 = arrayOfNames[0];
  const filtredNamesOfIntersection = arrayOfNames[1];
  const filtredNamesOfObject2 = arrayOfNames[2];

  const arrayForSort = arrayOfNames.flat(10).sort();

  const resultArrayOfStrings = [];

  arrayForSort.forEach((name) => {
    if (filtredNamesOfObject1.includes(name)) {
      if (Object.getOwnPropertyNames(object2).includes(name)) {
        if (isObject(object1[name])) {
          const string = `${replacer.repeat(spacesCount)}  ${name}: {`;
          resultArrayOfStrings.push(string);
          resultArrayOfStrings.push(
            iterForSimpleObject(object1[name], replacer, spacesCount + 2),
          );
          resultArrayOfStrings.push(`${replacer.repeat(spacesCount)}  }`);
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
          resultArrayOfStrings.push(string);
        }
      }
      if (!Object.getOwnPropertyNames(object2).includes(name)) {
        if (isObject(object1[name])) {
          const string = `${replacer.repeat(spacesCount)}- ${name}: {`;
          resultArrayOfStrings.push(string);
          resultArrayOfStrings.push(
            iterForSimpleObject(object1[name], replacer, spacesCount + 2),
          );
          resultArrayOfStrings.push(`${replacer.repeat(spacesCount)}  }`);
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
          resultArrayOfStrings.push(string);
        }
      }
    }

    if (filtredNamesOfObject2.includes(name)) {
      if (isObject(object2[name])) {
        const string = `${replacer.repeat(spacesCount)}+ ${name}: {`;
        resultArrayOfStrings.push(string);
        resultArrayOfStrings.push(
          iterForSimpleObject(object2[name], replacer, spacesCount + 2),
        );
        resultArrayOfStrings.push(`${replacer.repeat(spacesCount)}  }`);
      }
      if (!isObject(object2[name])) {
        const string = getStringForObject2(
          name,
          object2,
          replacer,
          spacesCount,
        );
        resultArrayOfStrings.push(string);
      }
    }

    if (filtredNamesOfIntersection.includes(name)) {
      if (!(isObject(object1[name]) && isObject(object2[name]))) {
        if (isObject(object1[name])) {
          const string = `${replacer.repeat(spacesCount)}- ${name}: {`;
          resultArrayOfStrings.push(string);
          resultArrayOfStrings.push(
            iterForSimpleObject(object1[name], replacer, spacesCount + 2),
          );
          resultArrayOfStrings.push(`${replacer.repeat(spacesCount)}  }`);
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
          resultArrayOfStrings.push(string);
        }
        if (isObject(object2[name])) {
          const string = `${replacer.repeat(spacesCount)}+ ${name}: {`;
          resultArrayOfStrings.push(string);
          resultArrayOfStrings.push(
            iterForSimpleObject(object2[name], replacer, spacesCount + 2),
          );
          resultArrayOfStrings.push(`${replacer.repeat(spacesCount)}  }`);
        }
        if (!isObject(object2[name])) {
          const string = getStringForObject2(
            name,
            object2,
            replacer,
            spacesCount,
          );
          resultArrayOfStrings.push(string);
        }
      } else {
        resultArrayOfStrings.push(
          `${replacer.repeat(spacesCount)}  ${name}: {`,
        );
        resultArrayOfStrings.push(
          stylish(object1[name], object2[name], replacer, spacesCount + 2),
        );
        resultArrayOfStrings.push(`${replacer.repeat(spacesCount)}  }`);
      }
    }
  });

  return `${resultArrayOfStrings.join('\n')}`;
};

export default stylish;
