var _ok = {};

Object.defineProperty(_ok, 'statusCode', {
    value: 200,
    writable: false,
    configurable: false,
    enumerable: true
});

Object.defineProperty(_ok, 'status', {
    value: 'success',
    writable: false,
    configurable: false,
    enumerable: true
});

Object.defineProperty(_ok, 'message', {
    value: 'The request was fulfilled.',
    writable: false,
    configurable: false,
    enumerable: true
});

Object.defineProperty(_ok, 'customMessage', {
    value: '',
    writable: true,
    configurable: true,
    enumerable: true
});

Object.defineProperty(_ok, 'response', {
    value: '',
    writable: true,
    configurable: true,
    enumerable: true
});

Object.defineProperty(_ok, 'redirect', {
    value: '',
    writable: true,
    configurable: true,
    enumerable: true
});

// OK --------------------------


var _error = {};

Object.defineProperty(_error, 'statusCode', {
    value: 500,
    writable: false,
    configurable: false,
    enumerable: true
});

Object.defineProperty(_error, 'status', {
    value: 'error',
    writable: false,
    configurable: false,
    enumerable: true
});

Object.defineProperty(_error, 'message', {
    value: 'The server encountered an unexpected condition which prevented it from fulfilling the request.',
    writable: false,
    configurable: false,
    enumerable: true
});

Object.defineProperty(_error, 'customMessage', {
    value: '',
    writable: true,
    configurable: true,
    enumerable: true
});

Object.defineProperty(_error, 'response', {
    value: '',
    writable: true,
    configurable: true,
    enumerable: true
});

Object.defineProperty(_error, 'redirect', {
    value: '500.html',
    writable: true,
    configurable: true,
    enumerable: true
});

// ERROR --------------------------


var _notFound = {};

Object.defineProperty(_notFound, 'statusCode', {
    value: 404,
    writable: false,
    configurable: false,
    enumerable: true
});

Object.defineProperty(_notFound, 'status', {
    value: 'not found',
    writable: false,
    configurable: false,
    enumerable: true
});

Object.defineProperty(_notFound, 'message', {
    value: 'The server has not found anything matching the URI given',
    writable: false,
    configurable: false,
    enumerable: true
});

Object.defineProperty(_notFound, 'customMessage', {
    value: '',
    writable: true,
    configurable: true,
    enumerable: true
});

Object.defineProperty(_notFound, 'response', {
    value: '',
    writable: true,
    configurable: true,
    enumerable: true
});

Object.defineProperty(_notFound, 'redirect', {
    value: '404.html',
    writable: true,
    configurable: true,
    enumerable: true
});

// NOT FOUND --------------------------



var _badRequest = {};

Object.defineProperty(_badRequest, 'statusCode', {
    value: 400,
    writable: false,
    configurable: false,
    enumerable: true
});

Object.defineProperty(_badRequest, 'status', {
    value: 'bad request',
    writable: false,
    configurable: false,
    enumerable: true
});

Object.defineProperty(_badRequest, 'message', {
    value: 'The request had bad syntax or was inherently impossible to be satisfied.',
    writable: false,
    configurable: false,
    enumerable: true
});

Object.defineProperty(_badRequest, 'customMessage', {
    value: '',
    writable: true,
    configurable: true,
    enumerable: true
});

Object.defineProperty(_badRequest, 'response', {
    value: '',
    writable: true,
    configurable: true,
    enumerable: true
});

Object.defineProperty(_badRequest, 'redirect', {
    value: '',
    writable: true,
    configurable: true,
    enumerable: true
});

// BAD REQUEST --------------------------

var _return = {};

Object.defineProperty(_return, 'ok', {
    value: _ok,
    writable: false,
    configurable: false,
    enumerable: true
});

Object.defineProperty(_return, 'error', {
    value: _error,
    writable: false,
    configurable: false,
    enumerable: true
});

Object.defineProperty(_return, 'notFound', {
    value: _notFound,
    writable: false,
    configurable: false,
    enumerable: true
});

Object.defineProperty(_return, 'badRequest', {
    value: _badRequest,
    writable: false,
    configurable: false,
    enumerable: true
});

exports.http = _return;