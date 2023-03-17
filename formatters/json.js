import _ from 'lodash';
import { getFiltredNames, isObject } from './formattersEngine.js';

const json = (object1, object2) => {
  const arrayOfNames = getFiltredNames(object1, object2);
  const filtredNamesOfObject1 = arrayOfNames[0];
  const filtredNamesOfIntersection = arrayOfNames[1];
  const filtredNamesOfObject2 = arrayOfNames[2];
  const arrayForSort = arrayOfNames.flat(10).sort();
  const resultArray = [];

  arrayForSort.forEach((name) => {
    const resultObject = {};
    resultObject.key = name;

    if (filtredNamesOfObject1.includes(name)) {
      if (!Object.getOwnPropertyNames(object2).includes(name)) {
        resultObject.status = 'removed';
      } else {
        resultObject.status = 'notChanged';
        resultObject.value = _.cloneDeep(object1[name]);
      }
    }
    if (filtredNamesOfObject2.includes(name)) {
      resultObject.status = 'added';
      resultObject.value = _.cloneDeep(object2[name]);
    }
    if (filtredNamesOfIntersection.includes(name)) {
      if (isObject(object1[name]) && isObject(object2[name])) {
        resultObject.status = 'updated';
        resultObject.value = json(_.cloneDeep(object1[name]), _.cloneDeep(object2[name]));
      } else {
        resultObject.status = 'updated';
        resultObject.value = _.cloneDeep(object2[name]);
      }
    }

    resultArray.push(_.cloneDeep(resultObject));
  });

  return resultArray;
};

export default json;
