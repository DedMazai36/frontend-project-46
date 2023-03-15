import getObjectFromFilePath from './parsers.js';
import getFormattedString from '../formatters/index.js';

const genDiff = (filePath1, filePath2, formatType) => {
  const arrayOfFiles = getObjectFromFilePath(filePath1, filePath2);
  const file1 = arrayOfFiles[0];
  const file2 = arrayOfFiles[1];
  const result = getFormattedString(file1, file2, formatType);

  return result;
};

export default genDiff;
