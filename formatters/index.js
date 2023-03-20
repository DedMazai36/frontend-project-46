// import * as fs from 'node:fs';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormattedString = (file1, file2, formatType) => {
  let resultString;
  switch (formatType) {
    case 'stylish':
      resultString = `{\n${stylish(file1, file2)}\n}`;
      break;
    case 'plain':
      resultString = plain(file1, file2).flat(10).join('\n');
      break;
    case 'json':
      resultString = json(file1, file2);
      // fs.writeFileSync('__fixtures__/jsonResult.json', JSON.stringify(resultString));
      break;
    default:
      resultString = 'Unknown format name';
  }

  return resultString;
};

export default getFormattedString;
