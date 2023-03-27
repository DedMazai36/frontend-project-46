import _ from 'lodash';

const getNames = (data1, data2) => [
  Object.getOwnPropertyNames(data1),
  Object.getOwnPropertyNames(data2),
];

const isObject = (object) => {
  if (typeof object === 'object' && !Array.isArray(object) && object !== null) {
    return true;
  }
  return false;
};

const getTypeForValue = (value) => {
  if (isObject(value)) {
    return 'nested';
  }
  return 'notNested';
};

const getStatus = (name, data1, data2) => {
  const [namesOfData1, namesOfData2] = getNames(data1, data2);

  if (namesOfData1.includes(name) && !namesOfData2.includes(name)) {
    return 'removed';
  }
  if (!namesOfData1.includes(name) && namesOfData2.includes(name)) {
    return 'added';
  }
  if (JSON.stringify(data1[name]) === JSON.stringify(data2[name])) {
    return 'notChanged';
  }
  if (isObject(data1[name]) && isObject(data2[name])) {
    return 'changedTree';
  }
  return 'changed';
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
  switch (status) {
    case 'added':
      return data2[name];
    case 'removed':
      return data1[name];
    case 'notChanged':
      return data1[name];
    default:
      return undefined;
  }
};

const buildTree = (data1, data2) => {
  const [namesOfData1, namesOfData2] = getNames(data1, data2);
  const allNames = _.sortBy(_.uniq(_.concat(namesOfData1, namesOfData2).flat(2)));

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

export { isObject };
export default buildTree;
