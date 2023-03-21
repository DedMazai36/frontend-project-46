import _ from 'lodash';
import { getFiltredNames, isObject } from './formattersEngine.js';

const ifStringAddApostrophe = (str) => {
  if (typeof str === 'string') {
    return `'${str}'`;
  }
  return str;
};

const plain = (object1, object2, path = '') => {
  const arrayOfNames = getFiltredNames(object1, object2);
  const [filtredNamesOfObject1,
    filtredNamesOfIntersection,
    filtredNamesOfObject2] = arrayOfNames;
  const arrayForSort = _.sortBy(arrayOfNames.flat(10));

  const resultArrayOfStrings = arrayForSort.map((name) => {
    const cumulativePath = `${path}.${name}`;
    if (filtredNamesOfObject1.includes(name)) {
      if (!Object.getOwnPropertyNames(object2).includes(name)) {
        return (
          `Property '${cumulativePath.slice(
            1,
            cumulativePath.length,
          )}' was removed`);
      }
    }
    if (filtredNamesOfObject2.includes(name)) {
      if (!isObject(object2[name])) {
        return (
          `Property '${cumulativePath.slice(
            1,
            cumulativePath.length,
          )}' was added with value: ${ifStringAddApostrophe(object2[name])}`);
      }
      return (
        `Property '${cumulativePath.slice(
          1,
          cumulativePath.length,
        )}' was added with value: [complex value]`);
    }
    if (filtredNamesOfIntersection.includes(name)) {
      if (!isObject(object1[name])) {
        if (!isObject(object2[name])) {
          return (
            `Property '${cumulativePath.slice(
              1,
              cumulativePath.length,
            )}' was updated. From ${ifStringAddApostrophe(
              object1[name],
            )} to ${ifStringAddApostrophe(object2[name])}`);
        }
        return (
          `Property '${cumulativePath.slice(
            1,
            cumulativePath.length,
          )}' was updated. From ${ifStringAddApostrophe(
            object1[name],
          )} to [complex value]`);
      }
      if (!isObject(object2[name])) {
        return (
          `Property '${cumulativePath.slice(
            1,
            cumulativePath.length,
          )}' was updated. From [complex value] to ${ifStringAddApostrophe(
            object2[name],
          )}`);
      }
      return (
        plain(object1[name], object2[name], cumulativePath));
    }
    return [];
  });

  return _.remove(resultArrayOfStrings);
};

export default plain;
