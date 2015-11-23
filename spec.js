var find = require('./index');

find
  .src('./test.txt')
  .dest('./test2.txt')
  .replace({
    '%Heading%': 'Hello World',
    '%Footer%': 'Goodbye World'
  })
  .complete(function () {
    console.log('Finished!')
  })
  .error(function (err) {
    console.log(err);
  });