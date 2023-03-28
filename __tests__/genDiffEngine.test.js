/* eslint-disable no-undef */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'node:fs';
import genDiff from '../src/genDiffEngine.js';

const getFixturePath = () => {
  const filename = fileURLToPath(import.meta.url);
  const directory = dirname(filename);

  return path.join(directory, '..', '__fixtures__');
};

const readFixture = (fileName) => fs.readFileSync(path.join(getFixturePath(), fileName), { encoding: 'utf8', flag: 'r' });

const getPath = (fileName) => path.join(getFixturePath(), fileName);

const expectStylish = readFixture('expectForStylishTest.txt');
const expectPlain = readFixture('expectForPlainTest.txt');
const expectJson = readFixture('expectForJsonTest.json');

describe('Testing .json files', () => {
  const filePath1 = getPath('file1.json');
  const filePath2 = getPath('file2.json');
  test.each([
    ['stylish', filePath1, filePath2, expectStylish],
    ['plain', filePath1, filePath2, expectPlain],
    ['json', filePath1, filePath2, expectJson],
  ])('Formatter %s', (formatter, path1, path2, expected) => {
    expect(genDiff(path1, path2, formatter)).toBe(expected);
  });
});

describe('Testing .yaml files', () => {
  const filePath1 = getPath('file1.yaml');
  const filePath2 = getPath('file2.yaml');
  test.each([
    ['stylish', filePath1, filePath2, expectStylish],
    ['plain', filePath1, filePath2, expectPlain],
    ['json', filePath1, filePath2, expectJson],
  ])('Formatter %s', (formatter, path1, path2, expected) => {
    expect(genDiff(path1, path2, formatter)).toBe(expected);
  });
});
