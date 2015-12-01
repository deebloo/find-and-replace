/**
 * @name find-and-replace
 *
 * @description
 * a simple api for finding and replacing values in a file
 */

var fs;

// try to require the files system.
try {
  fs = require('fs');
} catch(err) {
  fs = false;
}

var src, txt, dest, complete = [], error = [];

/**
 * Publicly accessible API
 *
 * @type {{src: Function, text: Function, dest: Function, complete: Function, error: Function, replace: Function}}
 */
var API = {
  /**
   * set the source file
   *
   * @memberof find-and-replace
   *
   * @param {string} val
   *
   * @return {API}
   */
  src: function (val) {
    src = val;
    return this;
  },
  /**
   * A string value to use.
   *
   * @param {string} val - a block of text to find and replaced in.
   *
   * @return {API}
   */
  text: function (val) {
    txt = val;
    return this;
  },
  /**
   * set the destination file. if not destination is set write to the src.
   *
   * @memberof find-and-replace
   *
   * @param {string} val
   *
   * @return {API}
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
   * @return {API}
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
   * @return {API}
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
   * @return {API}
   */
  replace: function (map) {
    if(txt) {
      // Timeout lets replace be called in any place in the chain.
      setTimeout(function () {
        _complete(_replace(txt, map));
      }, 0);
    }

    if(src && fs) {
      fs.readFile(src, function(err, data) {
        if(err) return _error(err.message = 'Could not find source file');

        var replacedText = _replace(data.toString(), map);

        if(dest) {
          fs.writeFile(dest || src, replacedText, function (err) {
            if(err) return _error(err.message = 'Error writing to file');

            _complete(replacedText);
          });
        }
        else {
          _complete(replacedText);
        }
      });
    }

    return this;
  }
};

/**
 * replace the text inout with values found in the map object
 *
 * @param {string} text - the text to replaced
 * @param {object} map - the map of values to replace in the string
 *
 * @return {string}
 *
 * @private
 */
function _replace(text, map) {
  var regex;

  for(var key in map) {
    if(map.hasOwnProperty(key)) {
      regex = new RegExp(key, 'g');

      if(text.indexOf(key) > -1) {
        text = text.replace(regex, map[key]);
      }
      else {
        _error({
          message: 'Could not find ' + key + ' in file.'
        });
      }
    }
  }

  return text;
}

/**
 * fire all complete methods.
 *
 * @memberof find-and-replace
 *
 * @param {string} val - the completed replaced string
 *
 * @return {string}
 *
 * @private
 */
function _complete(val) {
  return _resolve(complete, val);
}

/**
 * fire all error methods
 *
 * @memberof find-and-replace
 *
 * @param {object} err - object containing error information
 *
 * @return {object}
 *
 * @private
 */
function _error(err) {
  return _resolve(error, err);
}

/**
 * resolve either success or error.
 *
 * @param {Array} methods - an array of methods to call
 * @param {*} res - the value to pass to each method is the methods array
 *
 * @return {*}
 *
 * @private
 */
function _resolve(methods, res) {
  if(!methods.length) return res;

  methods.forEach(function (fn) {
    fn(res);
  });

  return res;
}

module.exports = API;