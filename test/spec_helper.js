var triggerKeyEvent = function (type, key) {
  var code = key.charCodeAt(0);

  // create a fake event
  var e = document.createEvent("UIEvent");
  e.initEvent(type, true, true);

  e.view = window;
  e.keyCode = code;
  e.charCode = code;

  // override keyCode
  e.__defineGetter__('keyCode', function () {
    return code;
  });

  document.dispatchEvent(e);
};

var keyDown = function (key) {
  triggerKeyEvent("keydown", key);
};

var keyUp = function (key) {
  triggerKeyEvent("keyup", key);
};

var pressKey = function (key) {
  keyDown(key);
  keyUp(key);
};
