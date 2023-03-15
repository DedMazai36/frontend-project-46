/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'node:fs';
import genDiff from '../src/genDiffEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const expectStylish = fs.readFileSync(path.join(__dirname, '..', '__fixtures__', 'expectForStylishTest.txt'), { encoding: 'utf8', flag: 'r' });
const expectPlain = fs.readFileSync(path.join(__dirname, '..', '__fixtures__', 'expectForPlainTest.txt'), { encoding: 'utf8', flag: 'r' });

test('Testing stylish width .json', () => {
  const filePath1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  const filePath2 = path.join(__dirname, '..', '__fixtures__', 'file2.json');

  expect(genDiff(filePath1, filePath2, 'stylish')).toBe(expectStylish);
});

test('Testing stylish width .yaml', () => {
  const filePath1 = path.join(__dirname, '..', '__fixtures__', 'file1.yaml');
  const filePath2 = path.join(__dirname, '..', '__fixtures__', 'file2.yaml');

  expect(genDiff(filePath1, filePath2, 'stylish')).toBe(expectStylish);
});

test('Testing plain width .json', () => {
  const filePath1 = path.join(__dirname, '..', '__fixtures__', 'file1.yaml');
  const filePath2 = path.join(__dirname, '..', '__fixtures__', 'file2.yaml');

  expect(genDiff(filePath1, filePath2, 'plain')).toBe(expectPlain);
});

test('Testing plain width .yaml', () => {
  const filePath1 = path.join(__dirname, '..', '__fixtures__', 'file1.yaml');
  const filePath2 = path.join(__dirname, '..', '__fixtures__', 'file2.yaml');

  expect(genDiff(filePath1, filePath2, 'plain')).toBe(expectPlain);
});
