[![NPM](https://nodei.co/npm/find-and-replace.png?compact=true)](https://nodei.co/npm/find-and-replace/)

Find and Replace
=========

A simple api for finding and replacing values in a file.

## Installation
  ```
  npm install find-and-replace --save
  ```

## API
  ```JS
  var find = require("find-and-replace");
  
  // Methods can be chained in any order
  find
    // Source file
    .src("./test.txt")
    // the destination file to write to.
    .dest("./test2.txt")
    // Raw text
    .text("%Heading% This is some sample text. %Footer%")
    // The good stuff. Replace a map of values
    .replace({
      "%Heading%": "Good Morning San Diego!",
      "%Footer%": "Let's all play Yaz Flute"
    })
    // fires when find and replace is finished and gives you the replaced text from either the file or the raw text
    .complete(function (txt) {
      console.log("Finished! Here is the completed text: " + txt);
    })
    // add an error callback
    .error(function (err) {
      console.log(err);
    });
  ```

* 1.0.0
