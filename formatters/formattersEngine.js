import _ from 'lodash';

const getFiltredNames = (object1, object2) => {
  const namesOfFile1 = Object.getOwnPropertyNames(object1).sort();
  const namesOfFile2 = Object.getOwnPropertyNames(object2).sort();

  const filtredNamesOfFile1 = [...namesOfFile1].filter((name) => {
    const stringOfObject1 = JSON.stringify(object1[name]);
    const stringOfObject2 = JSON.stringify(object2[name]);
    if (namesOfFile2.indexOf(name) < 0 || stringOfObject1 === stringOfObject2) {
      return true;
    } return false;
  });

  const filtredNamesOfFile2 = _.difference(namesOfFile2, namesOfFile1);

  const intersectionNames = _.intersection(namesOfFile1, namesOfFile2);
  const resultiIntersection = _.difference(intersectionNames, filtredNamesOfFile1);

  return [filtredNamesOfFile1, resultiIntersection, filtredNamesOfFile2];
};

const isObject = (object) => {
  if (typeof object === 'object' && !Array.isArray(object) && object !== null) {
    return true;
  }
  return false;
};

export { getFiltredNames, isObject };
