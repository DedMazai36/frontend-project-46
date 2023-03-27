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

const expectStylish = readFixture('expectForStylishTest.txt');
const expectPlain = readFixture('expectForPlainTest.txt');
const expectJson = readFixture('expectForJsonTest.json');

test('Testing stylish width .json', () => {
  const filePath1 = path.join(getFixturePath(), 'file1.json');
  const filePath2 = path.join(getFixturePath(), 'file2.json');

  expect(genDiff(filePath1, filePath2, 'stylish')).toBe(expectStylish);
});

test('Testing stylish width .yaml', () => {
  const filePath1 = path.join(getFixturePath(), 'file1.yaml');
  const filePath2 = path.join(getFixturePath(), 'file2.yaml');

  expect(genDiff(filePath1, filePath2, 'stylish')).toBe(expectStylish);
});

test('Testing plain width .json', () => {
  const filePath1 = path.join(getFixturePath(), 'file1.yaml');
  const filePath2 = path.join(getFixturePath(), 'file2.yaml');

  expect(genDiff(filePath1, filePath2, 'plain')).toBe(expectPlain);
});

test('Testing plain width .yaml', () => {
  const filePath1 = path.join(getFixturePath(), 'file1.yaml');
  const filePath2 = path.join(getFixturePath(), 'file2.yaml');

  expect(genDiff(filePath1, filePath2, 'plain')).toBe(expectPlain);
});

test('Testing json width .json', () => {
  const filePath1 = path.join(getFixturePath(), 'file1.json');
  const filePath2 = path.join(getFixturePath(), 'file2.json');
  expect(genDiff(filePath1, filePath2, 'json')).toBe(expectJson);
});

test('Testing json width .yaml', () => {
  const filePath1 = path.join(getFixturePath(), 'file1.yaml');
  const filePath2 = path.join(getFixturePath(), 'file2.yaml');
  expect(genDiff(filePath1, filePath2, 'json')).toBe(expectJson);
});
