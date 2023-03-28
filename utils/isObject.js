const isObject = (object) => {
  if (typeof object === 'object' && !Array.isArray(object) && object !== null) {
    return true;
  }
  return false;
};

export default isObject;
