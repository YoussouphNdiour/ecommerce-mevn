"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongodb = require("mongodb");

var _path = _interopRequireDefault(require("path"));

// import cors from 'cors';
var app = (0, _express["default"])(); // app.use(cors());

app.use(_bodyParser["default"].json());
app.use('/image', _express["default"]["static"](_path["default"].join(__dirname, '../assets')));
app.get('/api/products', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var client, db, products;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _mongodb.MongoClient.connect('mongodb+srv://youssouph:g7s2aH9MgAZbNVX@fullstack-mevn.771oyqc.mongodb.net/?retryWrites=true&w=majority', {
              useNewUrlParser: true,
              useUnifiedTopology: true
            });

          case 2:
            client = _context.sent;
            db = client.db('blog');
            _context.next = 6;
            return db.collection('products').find({}).toArray();

          case 6:
            products = _context.sent;
            res.status(200).json(products);
            client.close();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.get('/api/users/:userId/cart', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var userId, client, db, user, products, cartItemIds, cartItems;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = req.params.userId;
            _context2.next = 3;
            return _mongodb.MongoClient.connect('mongodb+srv://youssouph:g7s2aH9MgAZbNVX@fullstack-mevn.771oyqc.mongodb.net/?retryWrites=true&w=majority', {
              useNewUrlParser: true,
              useUnifiedTopology: true
            });

          case 3:
            client = _context2.sent;
            db = client.db('blog');
            _context2.next = 7;
            return db.collection('users').findOne({
              id: userId
            });

          case 7:
            user = _context2.sent;

            if (user) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(404).json('Could not find user!'));

          case 10:
            _context2.next = 12;
            return db.collection('products').find({}).toArray();

          case 12:
            products = _context2.sent;
            cartItemIds = user.cartItems;
            cartItems = cartItemIds.map(function (id) {
              return products.find(function (product) {
                return product.id === id;
              });
            });
            res.status(200).json(cartItems);
            client.close();

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
app.get('/api/products/:productId', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var productId, client, db, product;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            productId = req.params.productId;
            _context3.next = 3;
            return _mongodb.MongoClient.connect('mongodb+srv://youssouph:g7s2aH9MgAZbNVX@fullstack-mevn.771oyqc.mongodb.net/?retryWrites=true&w=majority', {
              useNewUrlParser: true,
              useUnifiedTopology: true
            });

          case 3:
            client = _context3.sent;
            db = client.db('blog');
            _context3.next = 7;
            return db.collection('products').findOne({
              id: productId
            });

          case 7:
            product = _context3.sent;

            if (product) {
              res.status(200).json(product);
            } else {
              res.status(404).json('Could not find the product!');
            }

            client.close();

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
app.post('/api/users/:userId/cart', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var userId, productId, client, db, user, cartItemIds, products, cartItems;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userId = req.params.userId;
            productId = req.body.productId;
            _context4.next = 4;
            return _mongodb.MongoClient.connect('mongodb+srv://youssouph:g7s2aH9MgAZbNVX@fullstack-mevn.771oyqc.mongodb.net/?retryWrites=true&w=majority', {
              useNewUrlParser: true,
              useUnifiedTopology: true
            });

          case 4:
            client = _context4.sent;
            db = client.db('blog');
            _context4.next = 8;
            return db.collection('users').updateOne({
              id: userId
            }, {
              $addToSet: {
                cartItems: productId
              }
            });

          case 8:
            _context4.next = 10;
            return db.collection('users').findOne({
              id: userId
            });

          case 10:
            user = _context4.sent;
            cartItemIds = user.cartItems;
            _context4.next = 14;
            return db.collection('products').find({}).toArray();

          case 14:
            products = _context4.sent;
            cartItems = cartItemIds.map(function (id) {
              return products.find(function (product) {
                return product.id === id;
              });
            });
            res.status(200).json(cartItems);
            client.close();

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
app["delete"]('/api/users/:userId/cart/:productId', /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$params, userId, productId, client, db, user, products, cartItemIds, cartItems;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$params = req.params, userId = _req$params.userId, productId = _req$params.productId;
            _context5.next = 3;
            return _mongodb.MongoClient.connect('mongodb+srv://youssouph:g7s2aH9MgAZbNVX@fullstack-mevn.771oyqc.mongodb.net/?retryWrites=true&w=majority', {
              useNewUrlParser: true,
              useUnifiedTopology: true
            });

          case 3:
            client = _context5.sent;
            db = client.db('blog');
            _context5.next = 7;
            return db.collection('users').updateOne({
              id: userId
            }, {
              $pull: {
                cartItems: productId
              }
            });

          case 7:
            _context5.next = 9;
            return db.collection('users').findOne({
              id: userId
            });

          case 9:
            user = _context5.sent;
            _context5.next = 12;
            return db.collection('products').find({}).toArray();

          case 12:
            products = _context5.sent;
            cartItemIds = user.cartItems;
            cartItems = cartItemIds.map(function (id) {
              return products.find(function (product) {
                return product.id === id;
              });
            });
            res.status(200).json(cartItems);
            client.close();

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

var public_path = _path["default"].join(__dirname, '../build');

app.use(_express["default"]["static"](public_path));
app.get("*", function (_, res) {
  res.sendFile(_path["default"].join(public_path, 'index.html'));
});
app.listen(8000, function () {
  console.log('Server is listening on port 8000');
});