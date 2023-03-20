/* eslint-disable no-undef */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'node:fs';
import genDiff from '../src/genDiffEngine.js';

const filename = fileURLToPath(import.meta.url);
const directory = dirname(filename);

const expectStylish = fs.readFileSync(path.join(directory, '..', '__fixtures__', 'expectForStylishTest.txt'), { encoding: 'utf8', flag: 'r' });
const expectPlain = fs.readFileSync(path.join(directory, '..', '__fixtures__', 'expectForPlainTest.txt'), { encoding: 'utf8', flag: 'r' });
const expectJson = fs.readFileSync(path.join(directory, '..', '__fixtures__', 'expectForJsonTest.json'), { encoding: 'utf8', flag: 'r' });

test('Testing stylish width .json', () => {
  const filePath1 = path.join(directory, '..', '__fixtures__', 'file1.json');
  const filePath2 = path.join(directory, '..', '__fixtures__', 'file2.json');

  expect(genDiff(filePath1, filePath2, 'stylish')).toBe(expectStylish);
});

test('Testing stylish width .yaml', () => {
  const filePath1 = path.join(directory, '..', '__fixtures__', 'file1.yaml');
  const filePath2 = path.join(directory, '..', '__fixtures__', 'file2.yaml');

  expect(genDiff(filePath1, filePath2, 'stylish')).toBe(expectStylish);
});

test('Testing plain width .json', () => {
  const filePath1 = path.join(directory, '..', '__fixtures__', 'file1.yaml');
  const filePath2 = path.join(directory, '..', '__fixtures__', 'file2.yaml');

  expect(genDiff(filePath1, filePath2, 'plain')).toBe(expectPlain);
});

test('Testing plain width .yaml', () => {
  const filePath1 = path.join(directory, '..', '__fixtures__', 'file1.yaml');
  const filePath2 = path.join(directory, '..', '__fixtures__', 'file2.yaml');

  expect(genDiff(filePath1, filePath2, 'plain')).toBe(expectPlain);
});

test('Testing json width .json', () => {
  const filePath1 = path.join(directory, '..', '__fixtures__', 'file1.json');
  const filePath2 = path.join(directory, '..', '__fixtures__', 'file2.json');
  genDiff(filePath1, filePath2, 'json');
  const resultJson = fs.readFileSync(path.join(directory, '..', '__fixtures__', 'jsonResult.json'), { encoding: 'utf8', flag: 'r' });
  expect(resultJson).toBe(expectJson);
});

test('Testing json width .yaml', () => {
  const filePath1 = path.join(directory, '..', '__fixtures__', 'file1.yaml');
  const filePath2 = path.join(directory, '..', '__fixtures__', 'file2.yaml');
  genDiff(filePath1, filePath2, 'json');
  const resultJson = fs.readFileSync(path.join(directory, '..', '__fixtures__', 'jsonResult.json'), { encoding: 'utf8', flag: 'r' });
  expect(resultJson).toBe(expectJson);
});
