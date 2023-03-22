import _ from 'lodash';
import { getFiltredNames, isObject } from './formattersEngine.js';

const ifStringAddApostropheOrComplexValue = (str) => {
  if (isObject(str)) return '[complex value]';
  if (typeof str === 'string') {
    return `'${str}'`;
  }
  return str;
};

const getStringForIntersection = (cumulativePath, object1, object2, name) => (
  `Property '${cumulativePath.slice(
    1,
    cumulativePath.length,
  )}' was updated. From ${ifStringAddApostropheOrComplexValue(
    object1[name],
  )} to ${ifStringAddApostropheOrComplexValue(object2[name])}`);

const getResultString = (cumulativePath, actionString, object1, object2, name) => {
  switch (actionString) {
    case 'was added with value:':
      return (
        `Property '${cumulativePath.slice(
          1,
          cumulativePath.length,
        )}' ${actionString} ${ifStringAddApostropheOrComplexValue(object2[name])}`);
    case 'was removed':
      return (
        `Property '${cumulativePath.slice(
          1,
          cumulativePath.length,
        )}' ${actionString}`);
    default:
      return getStringForIntersection(cumulativePath, object1, object2, name);
  }
};

const plain = (object1, object2, path = '') => {
  const arrayOfNames = getFiltredNames(object1, object2);
  const [
    uniqueNamesOfFile1,
    uniqueNamesOfFile2,
    intersectionWidthDifference,
    allNames,
  ] = arrayOfNames;
  const arrayForSort = _.sortBy(allNames);

  const resultArrayOfStrings = arrayForSort.map((name) => {
    const cumulativePath = `${path}.${name}`;
    if (uniqueNamesOfFile2.includes(name)) {
      return getResultString(cumulativePath, 'was added with value:', object1, object2, name);
    }
    if (uniqueNamesOfFile1.includes(name)) {
      return getResultString(cumulativePath, 'was removed', object1, object2, name);
    }
    if (intersectionWidthDifference.includes(name)) {
      if (!(isObject(object1[name]) && isObject(object2[name]))) {
        return getResultString(cumulativePath, '', object1, object2, name);
      }
      return plain(object1[name], object2[name], cumulativePath);
    }
    return [];
  });

  return _.remove(resultArrayOfStrings);
};

export default plain;
