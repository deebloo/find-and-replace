var find = require('./index');

find
  .src('./sdfsdf.txt')
  .dest('./test2.txt')
  .text('Hello World')
  .replace({
    '%Heading%': 'Hello World',
    '%Footer%': 'Goodbye World'
  })
  .complete(function () {
    console.log('Finished!');
  })
  .error(function (err) {
    console.log(err);
  });