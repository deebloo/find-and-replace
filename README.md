[![NPM](https://nodei.co/npm/find-and-replace.png?compact=true)](https://nodei.co/npm/find-and-replace/)

Find and Replace
=========

A simple api for finding and replacing values in a file.

## Installation
  ```
  npm install find-and-replace --save
  ```

## Usage
  myFile.txt
  ```
  %Heading%
  
  Welcome to this months newsletter
  ...
  
  %Footer%
  ```
    
  app.js
  ```JS
  var find = require("find-and-replace");
  
  // Methods can be chained in any order
  find
    // the src file
    .src("./test.txt")
    // the destination file. (if not set writes to the src file)
    .dest("./test2.txt")
    // The good stuff. Replace a map of values
    .replace({
      "%Heading%": "Good Morning San Diego!",
      "%Footer%": "Let's all play Yaz Flute"
    })
    // fires when find and replace is finished
    .complete(function () {
      console.log("Finished!")
    })
    // add an error callback
    .error(function (err) {
      console.log(err);
    });
  ```
  
  newFile.txt
  ```
  Good Morning San Diego!
  
  Welcome to this months newsletter
  ...
  
  Yaz Flute
  ```

* 1.0.0
