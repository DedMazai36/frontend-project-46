/* eslint-disable max-len */
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

const getStringForObject1 = (name, object1, object2, namesOfFile1, replacer, spacesCount) => {
  const message = `${name}: ${object1[name]}`;
  if (_.intersection(namesOfFile1, Object.getOwnPropertyNames(object2)).indexOf(name) >= 0) {
    return `${replacer.repeat(spacesCount)}  ${message}`;
  }
  return `${replacer.repeat(spacesCount)}- ${message}`;
};

const getStringForObject2 = (name, object, replacer, spacesCount) => {
  const message = `${name}: ${object[name]}`;
  return `${replacer.repeat(spacesCount)}+ ${message}`;
};

const getStringForIntersection = (name, object1, object2, replacer, spacesCount) => {
  const message = `${replacer.repeat(spacesCount)}- ${name}: ${object1[name]}\n${replacer.repeat(spacesCount)}+ ${name}: ${object2[name]}`;
  return message;
};

const getStringForSimpleObject = (name, object, replacer, spacesCount, numberObject = 0) => {
  switch (numberObject) {
    case 1:
      return `${replacer.repeat(spacesCount)}- ${name}: ${object[name]}`;
    case 2:
      return `${replacer.repeat(spacesCount)}+ ${name}: ${object[name]}`;
    default:
      return `${replacer.repeat(spacesCount)}  ${name}: ${object[name]}`;
  }
};

const iterForSimpleObject = (object, replacer, spacesCount) => {
  const objectNames = Object.getOwnPropertyNames(object);
  const resultArrayOfStrings = [];
  objectNames.forEach((name) => {
    const value = object[name];
    if (!isObject(value)) {
      resultArrayOfStrings.push(getStringForSimpleObject(name, object, replacer, spacesCount));
    } else {
      resultArrayOfStrings.push(`${replacer.repeat(spacesCount)}  ${name}: {`);
      resultArrayOfStrings.push(iterForSimpleObject(value, replacer, spacesCount + 2));
      resultArrayOfStrings.push(`${replacer.repeat(spacesCount)}  }`);
    }
  });
  return resultArrayOfStrings.join('\n');
};

const stylish = (arrayOfNames, object1, object2, replacer = '  ', spacesCount = 1) => {
  const filtredNamesOfObject1 = arrayOfNames[0];
  const filtredNamesOfIntersection = arrayOfNames[1];
  const filtredNamesOfObject2 = arrayOfNames[2];

  const arrayForSort = arrayOfNames.flat(10).sort();

  const resultArrayOfStrings = [];

  arrayForSort.forEach((name) => {
    let value;
    if (Object.getOwnPropertyNames(object1).indexOf(name) >= 0) {
      value = object1[name];
    } else {
      value = object2[name];
    }

    if (!isObject(value)) {
      if (filtredNamesOfObject1.indexOf(name) >= 0) {
        const string = getStringForObject1(name, object1, object2, filtredNamesOfObject1, replacer, spacesCount);
        resultArrayOfStrings.push(string);
      }
      if (filtredNamesOfIntersection.indexOf(name) >= 0) {
        const string = getStringForIntersection(name, object1, object2, replacer, spacesCount);
        resultArrayOfStrings.push(string);
      }
      if (filtredNamesOfObject2.indexOf(name) >= 0) {
        const string = getStringForObject2(name, object2, replacer, spacesCount);
        resultArrayOfStrings.push(string);
      }
    }

    if (isObject(value) && filtredNamesOfIntersection.indexOf(name) < 0) {
      let string;
      if (filtredNamesOfObject1.indexOf(name) >= 0) {
        if (Object.getOwnPropertyNames(object2).indexOf(name) >= 0) {
          string = `${replacer.repeat(spacesCount)}  ${name}: {`;
        }
        string = `${replacer.repeat(spacesCount)}- ${name}: {`;
      } else {
        string = `${replacer.repeat(spacesCount)}+ ${name}: {`;
      }
      resultArrayOfStrings.push(string);
      resultArrayOfStrings.push(iterForSimpleObject(value, replacer, spacesCount + 2));
      resultArrayOfStrings.push(`${replacer.repeat(spacesCount)}  }`);
    }

    if (isObject(value) && filtredNamesOfIntersection.indexOf(name) >= 0) {
      if (isObject(object1[name]) && isObject(object2[name])) {
        resultArrayOfStrings.push(`${replacer.repeat(spacesCount)}  ${name}: {`);
        const filtredNamesOfNewObjects = getFiltredNames(object1[name], object2[name]);
        resultArrayOfStrings.push(stylish(filtredNamesOfNewObjects, object1[name], object2[name], replacer, spacesCount + 2));
        resultArrayOfStrings.push(`${replacer.repeat(spacesCount)}  }`);
      } else if (isObject(object1[name]) || isObject(object2[name])) {
        let string;
        if (filtredNamesOfObject1.indexOf(name) >= 0) {
          if (Object.getOwnPropertyNames(object2).indexOf(name) >= 0) {
            string = `${replacer.repeat(spacesCount)}  ${name}: {`;
          }
          string = `${replacer.repeat(spacesCount)}+ ${name}: {`;
        } else {
          string = `${replacer.repeat(spacesCount)}- ${name}: {`;
        }
        resultArrayOfStrings.push(string);
        resultArrayOfStrings.push(iterForSimpleObject(value, replacer, spacesCount + 2));
        resultArrayOfStrings.push(`${replacer.repeat(spacesCount)}  }`);
      }
      if (!isObject(object1[name])) {
        resultArrayOfStrings.push(getStringForSimpleObject(name, object1, replacer, spacesCount, 1));
      } else if (!isObject(object2[name])) {
        resultArrayOfStrings.push(getStringForSimpleObject(name, object2, replacer, spacesCount, 2));
      }
    }
  });

  return resultArrayOfStrings.join('\n');
};

export { stylish, getFiltredNames };
