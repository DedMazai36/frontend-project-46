import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (internalTree, formatType) => {
  switch (formatType) {
    case 'stylish':
      return `{\n${stylish(internalTree)}\n}`;
    case 'plain':
      return plain(internalTree);
    case 'json':
      return JSON.stringify(json(internalTree));
    default:
      return 'Unknown format name';
  }
};

export default format;
