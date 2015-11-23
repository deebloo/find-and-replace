var find = require('./index');

find
  .src('./test.txt')
  .dest('./test2.txt')
  .success(function () {
    console.log('Success!')
  })
  .error(function (err) {
    console.log(err);
  })
  .replace({
    '%Heading%': 'Hello World',
    '%Footer%': 'Goodbye World'
  });