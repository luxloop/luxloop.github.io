var Handlebars = require('gulp-hb').handlebars;

module.exports = {
  each_with_sort: function(array, key, opts) {
    var data;
    if(opts.data) { data  = Handlebars.createFrame(opts.data); }
    array = array.sort(function(a, b) {
      a = a[key];
      b = b[key];
      if (a > b) { return  1; }
      if (a === b) { return  0; }
      if (a < b) { return -1; }
    });
    var s = '';
    for (var i = 0; i < array.length; i++) {
      var e = array[i];
      if(data) { data.index = i; } // Support the usual @index.
      s += opts.fn(e, {data});
    }
    return s;
  }
};
