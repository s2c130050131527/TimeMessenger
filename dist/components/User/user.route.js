'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _user = require('./user.controller');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserRouter = function () {
  function UserRouter(router) {
    _classCallCheck(this, UserRouter);

    this.router = router;
    this.userController = new _user2.default();
    this.register();
    console.log('routing of user done');
  }

  _createClass(UserRouter, [{
    key: 'register',
    value: function register() {
      this.router.post('/add', this.addUser.bind(this));
      this.router.get('/getall', this.getAllUsers.bind(this));
      this.router.get('/get/:id', this.getUser.bind(this));
    }
  }, {
    key: 'addUser',
    value: function addUser(req, res) {
      this.userController.addUser(req, res);
    }
  }, {
    key: 'getUser',
    value: function getUser(req, res) {
      this.userController.getUser(req, res);
    }
  }, {
    key: 'getAllUsers',
    value: function getAllUsers(req, res) {
      this.userController.getAllUsers(req, res);
    }
  }]);

  return UserRouter;
}();

exports.default = UserRouter;