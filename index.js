var fs = require('fs');

module.exports = findAndReplace;

/**
 * @name  Find and Replace
 *
 * @param {string} file - the path the file
 * @param {string} dest - where to send the file
 * @param {object} values - object with the variable to be replaced and its replacement
 * @param {function} callback
 */
function findAndReplace(file, dest, values, callback) {
  var regex;

  fs.readFile(file, function(err, data) {
    if(err) throw err;

    var replaced = data.toString();

    for(var key in values) {
      if(values.hasOwnProperty(key)) {

        regex = new RegExp(key, 'g');

        if(replaced.indexOf(key) > -1) {
          replaced = replaced.replace(regex, values[key]);
        }
        else {
          return console.log('Template Value ' + key + ' is not found');
        }
      }
    }

    fs.writeFile(dest, replaced, function(err) {
      if(err) throw err;

      if(callback) callback();

      return 1;
    });
  });
}