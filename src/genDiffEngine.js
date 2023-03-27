import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'node:fs';
import getData from './parsers.js';
import format from './formatters/index.js';
import buildTree from './formatters/buildTree.js';

const getFileAndFormat = (filePath) => {
  const filename = fileURLToPath(import.meta.url);
  const directory = dirname(filename);
  const absoluteFilePath = path.resolve(directory, '..', '__fixtures__', filePath);
  const file = fs.readFileSync(absoluteFilePath);
  const formatFile = path.extname(filePath).slice(1);
  return [file, formatFile];
};

const readFiles = (path1, path2) => [path1, path2].map((filePath) => {
  const [file, formatFile] = getFileAndFormat(filePath);
  return getData(file, formatFile);
});

const genDiff = (filePath1, filePath2, formatType = 'stylish') => {
  const [data1, data2] = readFiles(filePath1, filePath2);

  const internalTree = buildTree(data1, data2);

  return format(internalTree, formatType);
};

export default genDiff;
