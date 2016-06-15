var find = require('./index');

find
  .src('./test.txt')
  .dest('./test2.txt')
  .replace({
    '%Heading%': 'Hello World',
    '%Footer%': 'Goodbye World'
  })
  .complete(function () {
    console.log('From File: ', 'Finished!');
  })
  .error(function (err) {
    console.log(err);
  });

find
  .text('%Heading%')
  .replace({
    '%Heading%': 'Hello World'
  })
  .complete(function (data) {
    console.log('from text', data);
  })
  .error(function (err) {
    console.log(err);
  });