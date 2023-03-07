import _ from 'lodash';
import getObjectFromFilePath from './parsers.js';

const getResultArray = (file1, file2) => {
  const namesOfFile1 = Object.getOwnPropertyNames(file1).sort();
  const namesOfFile2 = Object.getOwnPropertyNames(file2).sort();
  const filtredNamesOfFile1 = [...namesOfFile1].filter((name) => {
    if (namesOfFile2.indexOf(name) < 0 || file1[name] === file2[name]) {
      return true;
    } return false;
  });
  const filtredNamesOfFile2 = _.difference(namesOfFile2, namesOfFile1);
  const intersectionNames = _.intersection(namesOfFile1, namesOfFile2);
  const resultiIntersection = _.difference(intersectionNames, filtredNamesOfFile1);
  const resultArray = [];

  filtredNamesOfFile1.forEach((name) => {
    const message = `${name}: ${file1[name]}`;
    if (_.intersection(namesOfFile1, namesOfFile2).indexOf(name) >= 0) {
      resultArray.push(`    ${message}`);
    } else {
      resultArray.push(`  - ${message}`);
    }
  });
  resultiIntersection.forEach((name) => {
    const message = `  - ${name}: ${file1[name]}\n  + ${name}: ${file2[name]}`;
    resultArray.push(message);
  });
  filtredNamesOfFile2.forEach((name) => {
    const message = `${name}: ${file2[name]}`;
    resultArray.push(`  + ${message}`);
  });
  return resultArray;
};

const genDiff = (filePath1, filePath2) => {
  const arrayOfFiles = getObjectFromFilePath(filePath1, filePath2);
  const file1 = arrayOfFiles[0];
  const file2 = arrayOfFiles[1];
  const resultArray = getResultArray(file1, file2);
  const resultString = `{\n${resultArray.join('\n')}\n}`;

  return resultString;
};

export default genDiff;
