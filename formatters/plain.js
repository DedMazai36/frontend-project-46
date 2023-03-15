/* eslint-disable max-len */
import { getFiltredNames, isObject } from './formattersEngine.js';

const ifStringAddApostrophe = (str) => {
  if (typeof str === 'string') {
    return `'${str}'`;
  }
  return str;
};

const plain = (object1, object2, path = '') => {
  const arrayOfNames = getFiltredNames(object1, object2);
  const filtredNamesOfObject1 = arrayOfNames[0];
  const filtredNamesOfIntersection = arrayOfNames[1];
  const filtredNamesOfObject2 = arrayOfNames[2];
  const arrayForSort = arrayOfNames.flat(10).sort();
  const resultArrayOfStrings = [];
  arrayForSort.forEach((name) => {
    const cumulativePath = `${path}.${name}`;
    if (filtredNamesOfObject1.includes(name)) {
      if (!Object.getOwnPropertyNames(object2).includes(name)) {
        resultArrayOfStrings.push(`Property '${cumulativePath.slice(1, cumulativePath.length)}' was removed`);
      }
    }
    if (filtredNamesOfObject2.includes(name)) {
      if (!isObject(object2[name])) {
        resultArrayOfStrings.push(`Property '${cumulativePath.slice(1, cumulativePath.length)}' was added with value: ${ifStringAddApostrophe(object2[name])}`);
      } else {
        resultArrayOfStrings.push(`Property '${cumulativePath.slice(1, cumulativePath.length)}' was added with value: [complex value]`);
      }
    }
    if (filtredNamesOfIntersection.includes(name)) {
      if (!isObject(object1[name])) {
        if (!isObject(object2[name])) {
          resultArrayOfStrings.push(`Property '${cumulativePath.slice(1, cumulativePath.length)}' was updated. From ${ifStringAddApostrophe(object1[name])} to ${ifStringAddApostrophe(object2[name])}`);
        } else {
          resultArrayOfStrings.push(`Property '${cumulativePath.slice(1, cumulativePath.length)}' was updated. From ${ifStringAddApostrophe(object1[name])} to [complex value]`);
        }
      } else if (!isObject(object2[name])) {
        resultArrayOfStrings.push(`Property '${cumulativePath.slice(1, cumulativePath.length)}' was updated. From [complex value] to ${ifStringAddApostrophe(object2[name])}`);
      } else {
        resultArrayOfStrings.push(plain(object1[name], object2[name], cumulativePath));
      }
    }
  });

  return resultArrayOfStrings;
};

export default plain;
