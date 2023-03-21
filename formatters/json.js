/* eslint-disable no-use-before-define */
import _ from 'lodash';
import { getFiltredNames, isObject } from './formattersEngine.js';

const getStatus = (object2, arrayOfNames, name) => {
  const [filtredNamesOfObject1,,
    filtredNamesOfObject2] = arrayOfNames;

  if (filtredNamesOfObject1.includes(name)) {
    if (!Object.getOwnPropertyNames(object2).includes(name)) {
      return 'removed';
    }
    return 'notChanged';
  }
  if (filtredNamesOfObject2.includes(name)) {
    return 'added';
  }

  return 'updated';
};

const getValue = (object1, object2, arrayOfNames, name) => {
  const [filtredNamesOfObject1,
    filtredNamesOfIntersection,
    filtredNamesOfObject2] = arrayOfNames;

  if (filtredNamesOfObject1.includes(name)) {
    if (Object.getOwnPropertyNames(object2).includes(name)) {
      return _.cloneDeep(object1[name]);
    }
  }
  if (filtredNamesOfObject2.includes(name)) {
    return _.cloneDeep(object2[name]);
  }
  if (filtredNamesOfIntersection.includes(name)) {
    if (isObject(object1[name]) && isObject(object2[name])) {
      return json(
        _.cloneDeep(object1[name]),
        _.cloneDeep(object2[name]),
      );
    }
  }
  return _.cloneDeep(object2[name]);
};

const json = (object1, object2) => {
  const arrayOfNames = getFiltredNames(object1, object2);
  const arrayForSort = _.sortBy(arrayOfNames.flat(10));

  const resultArray = arrayForSort.map((name) => ({
    key: name,
    status: getStatus(object2, arrayOfNames, name),
    value: getValue(object1, object2, arrayOfNames, name),
  }));

  return resultArray;
};

export default json;
