/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiffEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const expectValue = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

test('Testing function genDiff width .json', () => {
  const filePath1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  const filePath2 = path.join(__dirname, '..', '__fixtures__', 'file2.json');

  expect(genDiff(filePath1, filePath2)).toBe(expectValue);
});

test('Testing function genDiff width .yaml', () => {
  const filePath1 = path.join(__dirname, '..', '__fixtures__', 'file1.yaml');
  const filePath2 = path.join(__dirname, '..', '__fixtures__', 'file2.yaml');

  expect(genDiff(filePath1, filePath2)).toBe(expectValue);
});
