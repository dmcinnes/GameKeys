var GameKeys = (function () {

  // predefine non-single character keycodes
  var KEY_CODES = {
    13: 'return',
    27: 'esc',
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  var keyStatus = { keyDown:false };

  for (var code in KEY_CODES) {
    if (keyStatus.hasOwnProperty(code)) {
      keyStatus[KEY_CODES[code]] = false;
    }
  }

  // set up the structure for handling key presses
  // support specifying the destination key
  var setupKeyStatus = function (key, dest) {
    if (keyStatus[key] === undefined) {
      var lower = dest || key.toLowerCase();
      var code = lower.charCodeAt(0);
      KEY_CODES[code] = lower;
      keyStatus[lower] = false;

      code = key.toUpperCase().charCodeAt(0);
      KEY_CODES[code] = lower;
      keyStatus[lower] = false;
    }
  };

  var downHandlers = {};
  var upHandlers = {};

  window.addEventListener('keydown', function (e) {
    if (e.metaKey || e.controlKey) { // ignore
      return;
    }
    keyStatus.keyDown = true;
    var key = KEY_CODES[e.keyCode];
    if (key) {
      e.preventDefault();
      keyStatus[key] = true;
      fireKeyHandlers(key, downHandlers);
    }
  }, true);

  window.addEventListener('keyup', function (e) {
    if (e.metaKey || e.controlKey) { // ignore
      return;
    }
    keyStatus.keyDown = false;
    var key = KEY_CODES[e.keyCode];
    if (key) {
      e.preventDefault();
      keyStatus[key] = false;
      fireKeyHandlers(key, upHandlers);
    }
  }, true);

  var fireKeyHandlers = function (key, handlerList) {
    var handlers = handlerList[key];
    if (handlers) {
      for (var i = 0; i < handlerList.length; i++) {
        handlers[i]();
      }
    }
  };

  var registerHandler = function (handlerList, key, callback) {
    setupKeyStatus(key);
    var handlers = handlerList[key];
    if (!handlers) {
      handlerList[key] = handlers = [];
    }
    handlers.push(callback);
  };

  var registerKeyDownHandler = function (key, callback) {
    registerHandler(downHandlers, key, callback);
  };

  var registerKeyUpHandler = function (key, callback) {
    registerHandler(upHandlers, key, callback);
  };

  return {
    status:    keyStatus,
    watchKey:  setupKeyStatus,
    onKeyDown: registerKeyDownHandler,
    onKeyUp:   registerKeyDownHandler
  };

})();
