'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var serverUrl = 'localhost:27017/msg-sender';
var mongoOptions = {
  useNewUrlParser: true
};

var Database = function () {
  function Database() {
    _classCallCheck(this, Database);

    return this._connect();
  }

  _createClass(Database, [{
    key: '_connect',
    value: function _connect() {
      return _mongoose2.default.connect('mongodb://' + serverUrl, mongoOptions).then(function () {
        console.log('Database connection successful');
      }, function (err) {
        console.error(err);
      });
    }
  }, {
    key: '_close',
    value: function _close() {
      console.log('====================================');
      console.log('Connection closed');
      _mongoose2.default.connection.close();
      console.log('====================================');
    }
  }]);

  return Database;
}();

exports.default = new Database();