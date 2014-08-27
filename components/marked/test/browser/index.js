/*
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

var fs = require('fs');

var test = require('../')
  , runTests = test.runTests
  , load = test.load;

var express = require('express')
  , app = express();

app.use(function(req, res, next) {
  var setHeader = res.setHeader;
  res.setHeader = function(name) {
    switch (name) {
      case 'Cache-Control':
      case 'Last-Modified':
      case 'ETag':
        return;
    }
    return setHeader.apply(res, arguments);
  };
  next();
});

var dir = __dirname + '/../tests'
  , files = {};

app.get('/test.js', function(req, res, next) {
  var test = fs.readFileSync(__dirname + '/test.js', 'utf8')
    , files = load();

  test = test.replace('__TESTS__', JSON.stringify(files));
  test = test.replace('__MAIN__', runTests + '');

  res.contentType('.js');
  res.send(test);
});

app.use(express.static(__dirname + '/../../lib'));
app.use(express.static(__dirname));

app.listen(8080);
