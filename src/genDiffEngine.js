import path from 'path';
import * as fs from "node:fs";
import _ from 'lodash';

const genDiff = (filePuth1, filePuth2) => {
    const absFilePuth1 = path.resolve('/home/andrey/frontend-project-46/', 'Files', filePuth1);
    const absFilePuth2 = path.resolve('/home/andrey/frontend-project-46/', 'Files', filePuth2);
    const file1 = JSON.parse(fs.readFileSync(absFilePuth1));
    const file2 = JSON.parse(fs.readFileSync(absFilePuth2));
    const namesOfFile1 = Object.getOwnPropertyNames(file1).sort();
    const namesOfFile2 = Object.getOwnPropertyNames(file2).sort();

    const filtredNamesOfFile1 = [...namesOfFile1].filter((name) => {
        if (namesOfFile2.indexOf(name) < 0 || file1[name] === file2[name]) {
            return true;
        }
    });
    const filtredNamesOfFile2 = _.difference(namesOfFile2, namesOfFile1);
    const intersectionNames = _.difference(_.intersection(namesOfFile1, namesOfFile2), filtredNamesOfFile1);

    let resultString = '';

    for (const name of filtredNamesOfFile1) {
        const value = file1[name];
        const message = `${name}: ${value}\n`;

        if (_.intersection(namesOfFile1, namesOfFile2).indexOf(name) >= 0) {
            resultString += `    ${message}`;
        } else {
            resultString += `  - ${message}`;
        }
    }
    for (const name of intersectionNames) {
        const message = `  - ${name}: ${file1[name]}\n  + ${name}: ${file2[name]}\n`;
        resultString += message;
    }
    for (const name of filtredNamesOfFile2) {
        const value = file2[name];
        const message = `${name}: ${value}\n`;

        resultString += `  + ${message}`;
    }

    return `{\n${resultString}}`
};

export default genDiff;
