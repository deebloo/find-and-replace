/**
 * @name find-and-replace
 *
 * @description
 * a simple api for finding and replacing values in a file
 *
 * @type {exports|module.exports}
 */
var fs = require('fs');

var src, dest, complete = [], error = [];

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
  complete: function (fn) {
    complete.push(fn);
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
        err.message = 'Could not find source file';
        return _error(err);
      }

      var replaced = data.toString();

      for(var key in map) {
        if(map.hasOwnProperty(key)) {
          regex = new RegExp(key, 'g');

          if(replaced.indexOf(key) > -1) {
            replaced = replaced.replace(regex, map[key]);
          }
          else {
            _error({message:
              'Could not find ' + key + ' in file.'
            })
          }
        }
      }

      fs.writeFile(dest || src, replaced, function(err) {
        if(err) return _error(err);

        return _complete();
      });
    });

    return this;
  }
};

function _complete() {
  if(!complete.length) {
    return 1;
  }

  complete.forEach(function (fn) {
    fn();
  });

  return 1;
}

function _error(err) {
  if(!error.length) {
    return 0;
  }

  error.forEach(function (fn) {
    fn(err);
  });

  return 0;
}