import getObjectFromFilePath from './parsers.js';
import { stylish, getFiltredNames } from './stylish.js';

const genDiff = (filePath1, filePath2, stylishType) => {
  const arrayOfFiles = getObjectFromFilePath(filePath1, filePath2);
  const file1 = arrayOfFiles[0];
  const file2 = arrayOfFiles[1];
  const arrayOfNames = getFiltredNames(file1, file2);
  let resultString;
  switch (stylishType) {
    case 'first':
      resultString = stylish(arrayOfNames, file1, file2);
      break;
    default:
      resultString = 'unknown stylish name';
  }

  return `{\n${resultString}\n}`;
};

export default genDiff;
