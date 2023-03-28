import isObject from '../../utils/isObject.js';

const getStringForSimpleObject = (object, spacesCount) => {
  const names = Object.getOwnPropertyNames(object);
  const resultArr = names.map((name) => {
    if (!isObject(object[name])) {
      return `${'  '.repeat(spacesCount)}${name}: ${object[name]}`;
    }
    return `${'  '.repeat(spacesCount)}${name}: {
${getStringForSimpleObject(object[name], spacesCount + 2)}
${'  '.repeat(spacesCount)}}`;
  });
  return resultArr.join('\n');
};

const getString = (object, replacer, spacesCount, keyForValue = 'value') => {
  if (!isObject(object[keyForValue])) {
    return `${'  '.repeat(spacesCount - 1)}${replacer}${object.key}: ${object[keyForValue]}`;
  }

  return `${'  '.repeat(spacesCount - 1)}${replacer}${object.key}: {
${getStringForSimpleObject(object[keyForValue], spacesCount + 2)}
${'  '.repeat(spacesCount)}}`;
};

const getStringForChanged = (object, spacesCount) => `${getString(object, '- ', spacesCount, 'value1')}
${getString(object, '+ ', spacesCount, 'value2')}`;

const getStringForNotChangedTree = (object, spacesCount) => {
  switch (object.status) {
    case 'added':
      return getString(object, '+ ', spacesCount);
    case 'removed':
      return getString(object, '- ', spacesCount);
    case 'notChanged':
      return getString(object, '  ', spacesCount);
    case 'changed':
      return getStringForChanged(object, spacesCount);
    default:
      return [];
  }
};

const stylish = (internalTree, spacesCount = 2) => {
  const resultArr = internalTree.map((object) => {
    if (object.status !== 'changedTree') {
      return getStringForNotChangedTree(object, spacesCount);
    }
    return `${'  '.repeat(spacesCount)}${object.key}: {
${stylish(object.children, spacesCount + 2)}
${'  '.repeat(spacesCount)}}`;
  });

  return resultArr.join('\n');
};

export default (internalTree) => `{\n${stylish(internalTree)}\n}`;
