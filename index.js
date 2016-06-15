/**
 * @name find-and-replace
 *
 * @description
 * a simple api for finding and replacing values in a file
 */

let fs;

// try to require the files system.
try {
  fs = require('fs');
} catch (err) {
  fs = false;
}
/**
 * Publicly accessible API
 *
 * @type {{src: Function, text: Function, dest: Function, complete: Function, error: Function, replace: Function}}
 */
var API = {
  /**
   * add an on success method
   *
   * @memberof find-and-replace
   *
   * @param {function} fn - success callback
   *
   * @return {API}
   */
  complete(fn) {
    this.completeArr.push(fn);
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
  error(fn) {
    this.errorArr.push(fn);
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
  replace(map) {
    var replacedText;

    if (this.txt) {
      // Timeout lets replace be called in any place in the chain.
      setTimeout(() => {
        replacedTest = _replace(this.txt, map);

        this.completeArr.forEach(fn => fn(replacedTest));
      }, 0);
    } else if (this.srcFile && fs) {
      fs.readFile(this.srcFile, (err, data) => {
        if (err) {
          return this.errorArr.forEach(fn => fn(err.message = 'Could not find source file'));
        }

        replacedText = _replace(data.toString(), map);

        if (this.dest) {
          fs.writeFile(this.dest || this.srcFile, replacedText, err => {
            if (err) return _error(err.message = 'Error writing to file');

            this.completeArr.forEach(fn => fn(replacedText));
          });
        }

        else {
          this.completeArr.forEach(fn => fn(replacedTest));
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

  for (var key in map) {
    if (map.hasOwnProperty(key)) {
      regex = new RegExp(key, 'g');

      text = text.replace(regex, map[key]);
    }
  }

  return text;
}

module.exports = {
  /**
   * Set a A filepath to use.
   *
   * @param {string} content - a block of text to find and replaced in.
   *
   * @return {API}
   */
  src: function (content) {
    var api = Object.create(API);

    api.dest = function (val) {
      this.dest = val;
      return this;
    };

    api.completeArr = [];
    api.errorArr = [];
    api.srcFile = content;

    return api;
  },
  /**
   * A string value to use.
   *
   * @param {string} val - a block of text to find and replaced in.
   *
   * @return {API}
   */
  text: function (val) {
    var api = Object.create(API);

    api.completeArr = [];
    api.errorArr = [];
    api.txt = val;

    return api;
  }
}