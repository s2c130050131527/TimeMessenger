'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var UserService = function () {
  function UserService() {
    _classCallCheck(this, UserService);

    this.users = [];
  }

  _createClass(UserService, [{
    key: 'addUser',
    value: function addUser(userObj) {
      this.users.push(userObj);
    }
  }, {
    key: 'getUser',
    value: function getUser(id) {
      return this.users.filter(function (u) {
        return u.id === id;
      })[0] || null;
    }
  }, {
    key: 'getAllUsers',
    value: function getAllUsers() {
      return this.users;
    }
  }]);

  return UserService;
}();

exports.default = new UserService();