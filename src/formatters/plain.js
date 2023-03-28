import isObject from '../../utils/isObject.js';

const getValue = (value) => {
  if (isObject(value)) return '[complex value]';
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getStringForNotChangedTree = (object, cumulativePath) => {
  switch (object.status) {
    case 'added':
      return `Property '${cumulativePath}' was added with value: ${getValue(object.value)}`;
    case 'removed':
      return `Property '${cumulativePath}' was removed`;
    case 'changed':
      return `Property '${cumulativePath}' was updated. From ${getValue(object.value1)} to ${getValue(object.value2)}`;
    default:
      return [];
  }
};

const plain = (internalTree, path = []) => {
  const resultArr = internalTree.map((object) => {
    const cumulativePath = [path, object.key].flat(2).join('.');
    if (object.status !== 'changedTree') {
      return getStringForNotChangedTree(object, cumulativePath);
    }
    return plain(object.children, cumulativePath);
  });

  return resultArr.flat(2).join('\n');
};

export default plain;
