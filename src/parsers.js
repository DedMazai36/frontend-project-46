import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'node:fs';
import yaml from 'js-yaml';

const getObjectFromFilePath = (filePath1, filePath2) => {
  const filename = fileURLToPath(import.meta.url);
  const directory = dirname(filename);
  const absoluteFilePath1 = path.resolve(directory, '..', 'Files', filePath1);
  const absoluteFilePath2 = path.resolve(directory, '..', 'Files', filePath2);
  let file1;
  let file2;

  if (absoluteFilePath1.endsWith('.json') && absoluteFilePath2.endsWith('.json')) {
    file1 = JSON.parse(fs.readFileSync(absoluteFilePath1));
    file2 = JSON.parse(fs.readFileSync(absoluteFilePath2));
  } else if ((absoluteFilePath1.endsWith('.yaml') && absoluteFilePath2.endsWith('.yaml')) || (absoluteFilePath1.endsWith('.yml') && absoluteFilePath2.endsWith('.yml'))) {
    file1 = yaml.load(fs.readFileSync(absoluteFilePath1));
    file2 = yaml.load(fs.readFileSync(absoluteFilePath2));
  }

  return [file1, file2];
};

export default getObjectFromFilePath;
