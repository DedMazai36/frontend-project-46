import _ from 'lodash';
import isObject from '../../utils/isObject.js';

const getNames = (data1, data2) => [
  Object.getOwnPropertyNames(data1),
  Object.getOwnPropertyNames(data2),
];

const getTypeForValue = (value) => {
  if (isObject(value)) {
    return 'nested';
  }
  return 'notNested';
};

const getStatus = (name, data1, data2) => {
  if (Object.hasOwn(data1, name) && !Object.hasOwn(data2, name)) {
    return 'removed';
  }
  if (!Object.hasOwn(data1, name) && Object.hasOwn(data2, name)) {
    return 'added';
  }
  if (_.isEqual(data1[name], data2[name])) {
    return 'notChanged';
  }
  return (isObject(data1[name]) && isObject(data2[name])) ? 'changedTree' : 'changed';
};

const getType = (name, data1, data2, status) => {
  if (status === 'added') {
    return getTypeForValue(data2[name]);
  }
  if (status === 'removed') {
    return getTypeForValue(data1[name]);
  }
  if (getTypeForValue(data1[name]) !== getTypeForValue(data2[name])) {
    return 'mixed';
  }
  return getTypeForValue(data1[name]);
};

const getValue = (name, data1, data2, status) => {
  const statuses = {
    added: data2[name],
    removed: data1[name],
    notChanged: data1[name],
  };
  return statuses[status];
};

const buildTree = (data1, data2) => {
  const [namesOfData1, namesOfData2] = getNames(data1, data2);
  const allNames = _.sortBy(_.union(namesOfData1, namesOfData2).flat(2));

  return allNames.map((name) => {
    const status = getStatus(name, data1, data2);
    const type = getType(name, data1, data2, status);
    return {
      key: name,
      status,
      type,
      children: status === 'changedTree' ? buildTree(data1[name], data2[name]) : undefined,
      value: getValue(name, data1, data2, status),
      value1: status === 'changed' ? data1[name] : undefined,
      value2: status === 'changed' ? data2[name] : undefined,
    };
  });
};

export default buildTree;
