/* eslint-disable no-use-before-define */
import _ from 'lodash';
import { getFiltredNames, isObject } from './formattersEngine.js';

const getStatus = (arrayOfNames, name) => {
  const [
    uniqueNamesOfFile1,
    uniqueNamesOfFile2,
    intersectionWidthDifference,,
  ] = arrayOfNames;

  if (uniqueNamesOfFile1.includes(name)) {
    return 'removed';
  }
  if (uniqueNamesOfFile2.includes(name)) {
    return 'added';
  }
  if (intersectionWidthDifference.includes(name)) {
    return 'updated';
  }
  return 'notChanged';
};

const getValue = (object1, object2, arrayOfNames, name) => {
  const [
    uniqueNamesOfFile1,
    uniqueNamesOfFile2,
    intersectionWidthDifference,,
  ] = arrayOfNames;
  if (uniqueNamesOfFile2.includes(name)) {
    return _.cloneDeep(object2[name]);
  }
  if (!intersectionWidthDifference.includes(name) && !uniqueNamesOfFile1.includes(name)) {
    return _.cloneDeep(object1[name]);
  }

  if (isObject(object1[name]) && isObject(object2[name])) {
    return json(
      _.cloneDeep(object1[name]),
      _.cloneDeep(object2[name]),
    );
  }

  return _.cloneDeep(object2[name]);
};

const json = (object1, object2) => {
  const arrayOfNames = getFiltredNames(object1, object2);
  const arrayForSort = _.sortBy(arrayOfNames[3]);

  const resultArray = arrayForSort.map((name) => ({
    key: name,
    status: getStatus(arrayOfNames, name),
    value: getValue(object1, object2, arrayOfNames, name),
  }));

  return resultArray;
};

export default json;
