### Hexlet tests, Code climate and Internal tests:
[![Actions Status](https://github.com/DedMazai36/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/DedMazai36/frontend-project-46/actions)
<a href="https://codeclimate.com/github/DedMazai36/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/32e801f00a95383a615a/maintainability" /></a>
<a href="https://codeclimate.com/github/DedMazai36/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/32e801f00a95383a615a/test_coverage" /></a>
[![Actions Status](https://github.com/DedMazai36/frontend-project-46/workflows/internal-check/badge.svg)](https://github.com/DedMazai36/frontend-project-46/actions/)

## Description

The package compares two files and outputs the differences between them. It works for json and yml extensions.

## System requirements

Node.js

## Setup

```bash
$ git clone https://github.com/DedMazai36/frontend-project-46.git
$ make install
```

## Example of program work:

```bash
$ gendiff -f stylish file1.json file2.json

{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
.....
```
```bash
$ gendiff -f plain file1.json file2.json

Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
.....
```
```bash
$ gendiff -f json file1.json file2.json

/* output in json format */
```

## Asciinemas of project:

Asciinema of the gendiff: <script async id="asciicast-HPJCeckIT7WsQgnfvgH8m9IW3" src="https://asciinema.org/a/HPJCeckIT7WsQgnfvgH8m9IW3.js"></script>

Asciinema of the step 6: https://asciinema.org/a/LdfeZyQsKv3UmyWhCmGhbCz4H

Asciinema of the step 7: https://asciinema.org/a/0za9ewPSTnzZbb48lt9RvmbHR