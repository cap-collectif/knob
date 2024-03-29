"use strict";

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  knob: true,
  text: true,
  "boolean": true,
  number: true,
  color: true,
  object: true,
  select: true,
  radios: true,
  array: true,
  arrayObject: true,
  date: true,
  button: true,
  files: true,
  optionsKnob: true,
  withKnobs: true
};
exports.knob = knob;
exports.text = text;
exports["boolean"] = _boolean;
exports.number = number;
exports.color = color;
exports.object = object;
exports.select = select;
exports.radios = radios;
exports.array = array;
exports.arrayObject = arrayObject;
exports.date = date;
exports.button = button;
exports.files = files;
exports.optionsKnob = optionsKnob;
exports.withKnobs = void 0;

var _addons = _interopRequireWildcard(require("@storybook/addons"));

var _shared = require("./shared");

Object.keys(_shared).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _shared[key];
    }
  });
});

var _registerKnobs = require("./registerKnobs");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function knob(name, optionsParam) {
  return _registerKnobs.manager.knob(name, optionsParam);
}

function text(name, value, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'text',
    value: value,
    groupId: groupId
  });
}

function _boolean(name, value, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'boolean',
    value: value,
    groupId: groupId
  });
}

function number(name, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var groupId = arguments.length > 3 ? arguments[3] : undefined;
  var rangeDefaults = {
    min: 0,
    max: 10,
    step: 1
  };
  var mergedOptions = options.range ? Object.assign({}, rangeDefaults, options) : options;
  var finalOptions = Object.assign({}, mergedOptions, {
    type: 'number',
    value: value,
    groupId: groupId
  });
  return _registerKnobs.manager.knob(name, finalOptions);
}

function color(name, value, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'color',
    value: value,
    groupId: groupId
  });
}

function object(name, value, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'object',
    value: value,
    groupId: groupId
  });
}

function select(name, options, value, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'select',
    selectV2: true,
    options: options,
    value: value,
    groupId: groupId
  });
}

function radios(name, options, value, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'radios',
    options: options,
    value: value,
    groupId: groupId
  });
}

function array(name, value) {
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ',';
  var groupId = arguments.length > 3 ? arguments[3] : undefined;
  return _registerKnobs.manager.knob(name, {
    type: 'array',
    value: value,
    separator: separator,
    groupId: groupId
  });
}

function arrayObject(name, value, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'arrayObject',
    value: value,
    groupId: groupId
  });
}

function date(name) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  var groupId = arguments.length > 2 ? arguments[2] : undefined;
  var proxyValue = value ? value.getTime() : null;
  return _registerKnobs.manager.knob(name, {
    type: 'date',
    value: proxyValue,
    groupId: groupId
  });
}

function button(name, callback, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'button',
    callback: callback,
    hideLabel: true,
    groupId: groupId
  });
}

function files(name, accept) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var groupId = arguments.length > 3 ? arguments[3] : undefined;
  return _registerKnobs.manager.knob(name, {
    type: 'files',
    accept: accept,
    value: value,
    groupId: groupId
  });
}

function optionsKnob(name, valuesObj, value, optionsObj, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'options',
    options: valuesObj,
    value: value,
    optionsObj: optionsObj,
    groupId: groupId
  });
}

var defaultOptions = {
  escapeHTML: true
};
var withKnobs = (0, _addons.makeDecorator)({
  name: 'withKnobs',
  parameterName: 'knobs',
  skipIfNoParametersOrOptions: false,
  allowDeprecatedUsage: true,
  wrapper: function wrapper(getStory, context, _ref) {
    var options = _ref.options,
        parameters = _ref.parameters;
    var storyOptions = parameters || options;
    var allOptions = Object.assign({}, defaultOptions, storyOptions);

    var channel = _addons["default"].getChannel();

    _registerKnobs.manager.setChannel(channel);

    _registerKnobs.manager.setOptions(allOptions);

    channel.emit(_shared.SET_OPTIONS, allOptions);
    (0, _registerKnobs.registerKnobs)();
    return getStory(context);
  }
});
exports.withKnobs = withKnobs;

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}