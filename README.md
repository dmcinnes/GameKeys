GameKeys
========

Easily examine the current Keyboard state in your HTML5 Games.

Example:

    if (GameKeys.status.space) {
      MyGame.fireMissile();
    }
     
    
Predefined named keys that are most likely used in a game:

* return
* esc
* space
* left
* up
* right
* down

You can also register other keys:

    GameKeys.watchKey('z');
    
    GameKeys.status.z
    // => false
    
    // * press and hold down the z key... *
    
    GameKeys.status.z
    // => true

    // * ...and then release *
    
    GameKeys.status.z
    // => false


Other Features
--------------

Examine if any key is pressed:

    GameKeys.status.keyDown
    
Register callbacks on a particular key:

    GameKeys.registerKeyDownHandler('return', function () {
      console.log("return pressed");
    });
    
    GameKeys.registerKeyUpHandler('return', function () {
      console.log("return released");
    });
    
Enjoy!
Doug McInnes
