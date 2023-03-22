import _ from 'lodash';

const getFiltredNames = (object1, object2) => {
  const namesOfFile1 = _.sortBy(Object.getOwnPropertyNames(object1));
  const namesOfFile2 = _.sortBy(Object.getOwnPropertyNames(object2));

  const uniqueNamesOfFile1 = [...namesOfFile1].filter((name) => {
    if (!namesOfFile2.includes(name)) {
      return true;
    }
    return false;
  });
  const uniqueNamesOfFile2 = _.difference(namesOfFile2, namesOfFile1);
  const intersectionNames = _.intersection(namesOfFile1, namesOfFile2);

  const intersectionWidthDifference = intersectionNames.filter((name) => {
    const stringOfObject1 = JSON.stringify(object1[name]);
    const stringOfObject2 = JSON.stringify(object2[name]);
    if (stringOfObject1 !== stringOfObject2) {
      return true;
    }
    return false;
  });

  const allNames = _.uniq(_.concat(namesOfFile1, namesOfFile2).flat(2));

  return [uniqueNamesOfFile1, uniqueNamesOfFile2, intersectionWidthDifference, allNames];
};

const isObject = (object) => {
  if (typeof object === 'object' && !Array.isArray(object) && object !== null) {
    return true;
  }
  return false;
};

export { getFiltredNames, isObject };
