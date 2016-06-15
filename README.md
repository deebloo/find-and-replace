[![NPM](https://nodei.co/npm/find-and-replace.png?compact=true)](https://nodei.co/npm/find-and-replace/)

Find and Replace
=========

A simple api for finding and replacing values in a file.

## Installation
  ```
  npm i find-and-replace --save
  ```

## API
  ```JS
var find = require("find-and-replace");
  
find
  .src('./test.txt')
  // .text('if you want to just use text')
  .dest('./test2.txt')
  .replace({
    '%Heading%': 'Good Morning San Diego!',
    '%Footer%': 'Let\'s all play Yaz Flute'
  })
  // fires when find and replace is finished and gives you the replaced text from either the file or the raw text
  .complete(function (txt) {
    console.log('Finished! Here is the completed text: ' + txt);
  })
  // add an error callback
  .error(function (err) {
    console.log(err);
  });
  ```

* 1.0.1
