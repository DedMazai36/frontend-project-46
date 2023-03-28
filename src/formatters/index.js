import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const formatters = {
  plain: formatPlain,
  stylish: formatStylish,
  json: formatJson,
};

export default (internalTree, formatType) => {
  const format = formatters[formatType];

  return format(internalTree);
};
