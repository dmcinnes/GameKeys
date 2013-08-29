GameKeys
========

Easily examine the current Keyboard state in your HTML5 Games.

Example:

    // inside your game loop...

    if (GameKeys.status.space) {
      SpaceShip.thrust = 100;
    } else {
      SpaceShip.thrust = 0;
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

Register callbacks on a particular key (good for game menus and other things outside of the action):

    GameKeys.registerKeyDownHandler('return', function () {
      console.log("return pressed");
    });

    GameKeys.registerKeyUpHandler('return', function () {
      console.log("return released");
    });



### Why not just use keydown event handlers?

If you can go for it. Some games need something continously happening as a key is held down. Some examples:

* On a side scroller you may want your guy to jump higher the longer the jump key is held down.
* A spaceship should only turn as long as the key is held down.
* A car should only accelerate as long as the up arrow is pressed.


Enjoy!
