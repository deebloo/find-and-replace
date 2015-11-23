/**
 * @name find-and-replace
 *
 * @description
 * a simple api for finding and replacing values in a file
 *
 * @type {exports|module.exports}
 */
var fs = require('fs');

var src, dest, success = [], error = [];

module.exports = {
  /**
   * set the source file
   *
   * @memberof find-and-replace
   *
   * @param {string} val
   *
   * @return {exports}
   */
  src: function(val) {
    src = val;
    return this;
  },
  /**
   * set the destination file. if not destination is set write to the src.
   *
   * @memberof find-and-replace
   *
   * @param {string} val
   *
   * @return {exports}
   */
  dest: function (val) {
    dest = val;
    return this;
  },
  /**
   * add an on success method
   *
   * @memberof find-and-replace
   *
   * @param {function} fn - success callback
   *
   * @return {exports}
   */
  success: function (fn) {
    success.push(fn);
    return this;
  },
  /**
   * and an on error message
   *
   * @memberof find-and-replace
   *
   * @param {function} fn - error callback
   *
   * @return {exports}
   */
  error: function (fn) {
    error.push(fn);
    return this;
  },
  /**
   * The good stuff! Find and replace the values from the file.
   *
   * @memberof find-and-replace
   *
   * @param {object} map
   *
   * @return {exports}
   */
  replace: function (map) {
    var regex;

    fs.readFile(src, function(err, data) {
      if(err) {
        error.forEach(function (fn) {
          fn(err);
        });

        return 0;
      }

      var replaced = data.toString();

      for(var key in map) {
        if(map.hasOwnProperty(key)) {

          regex = new RegExp(key, 'g');

          if(replaced.indexOf(key) > -1) {
            replaced = replaced.replace(regex, map[key]);
          }
          else {
            return console.log('Template Value ' + key + ' is not found');
          }
        }
      }

      fs.writeFile(dest || src, replaced, function(err) {
        if(err) {
          error.forEach(function (fn) {
            fn(err);
          });

          return 0;
        }

        success.forEach(function (fn) {
          fn();
        });

        return 1;
      });
    });

    return this;
  }
};