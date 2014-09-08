[![NPM](https://nodei.co/npm/find-and-replace.png?compact=true)](https://nodei.co/npm/find-and-replace/)

Find and Replace
=========

A tiny module for replacing template values in a file.

To overwrite the file set the source and destination to the same file

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
  var replace = require('find-and-replace');
  
  var values = {'%Heading%': 'Good Morning San Diego!', '%Footer%': 'Yaz Flute'};
  
  replace('myFile.txt', 'newFile.txt', values);
  ```
  
  newFile.txt
  ```
  Good Morning San Diego!
  
  Welcome to this months newsletter
  ...
  
  Yaz Flute
  ```

* 0.0.6
