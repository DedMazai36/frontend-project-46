import getObjectFromFilePath from './parsers.js';
import getFormattedString from '../formatters/index.js';

const genDiff = (filePath1, filePath2, formatType = 'stylish') => {
  const arrayOfFiles = getObjectFromFilePath(filePath1, filePath2);
  const [file1, file2] = arrayOfFiles;
  const result = getFormattedString(file1, file2, formatType);

  return result;
};

export default genDiff;
