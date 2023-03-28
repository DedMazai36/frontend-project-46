import isObject from '../../utils/isObject.js';

const getValue = (value) => {
  if (isObject(value)) return '[complex value]';
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getStringForNotChangedTree = (object, cumulativePath) => {
  const status = {
    added: `Property '${cumulativePath}' was added with value: ${getValue(object.value)}`,
    removed: `Property '${cumulativePath}' was removed`,
    changed: `Property '${cumulativePath}' was updated. From ${getValue(object.value1)} to ${getValue(object.value2)}`,
  };
  return status[object.status] ? status[object.status] : [];
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
