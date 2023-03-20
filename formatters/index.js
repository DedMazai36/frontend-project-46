import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormattedString = (file1, file2, formatType) => {
  switch (formatType) {
    case 'stylish':
      return `{\n${stylish(file1, file2)}\n}`;
    case 'plain':
      return plain(file1, file2).flat(10).join('\n');
    case 'json':
      return JSON.stringify(json(file1, file2));
    default:
      return 'Unknown format name';
  }
};

export default getFormattedString;
