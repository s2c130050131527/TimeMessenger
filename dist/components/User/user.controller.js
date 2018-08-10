'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _user = require('./user.service');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: 'addUser',
    value: function addUser(req, res) {
      console.log(req.body);
      var userObject = req.body;
      try {
        _user2.default.addUser(userObject);
        res.status(201);
        res.send('Created');
      } catch (error) {
        res.status(500);
        res.send('Unexpected Error');
      }
    }
  }, {
    key: 'getUser',
    value: function getUser(req, res) {
      var id = parseInt(req.params.id, 10);
      if (id > 0) {
        res.send(_user2.default.getUser(id));
      } else {
        res.status(422);
        res.send('wrong Id');
      }
    }
  }, {
    key: 'getAllUsers',
    value: function getAllUsers(req, res) {
      res.send(_user2.default.getAllUsers());
    }
  }]);

  return UserController;
}();

exports.default = UserController;