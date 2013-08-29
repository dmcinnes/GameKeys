describe("GameKeys", function () {

  describe("keyStatus", function () {
    beforeEach(function () {
      GameKeys.watchKey('a');
    });

    it("sets the value to true on a keydown", function () {
      keyDown('a');

      expect(GameKeys.status.a).toBe(true);
    });

    it("sets the value to false on a keyup", function () {
      keyDown('a');
      keyUp('a');

      expect(GameKeys.status.a).toBe(false);
    });

    it("handles predefined 'named' keys", function () {
      keyDown(' ');

      expect(GameKeys.status.space).toBe(true);
    });

    it("ignores case", function () {
      keyDown('A');

      expect(GameKeys.status.a).toBe(true);
    });

    it("sets keyDown to true if any key is pressed", function () {
      keyDown('a');

      expect(GameKeys.status.keyDown).toBe(true);
    });

    it("sets keyDown to false when the key is released", function () {
      keyDown('a');
      keyUp('a');

      expect(GameKeys.status.keyDown).toBe(false);
    });

    it("ignores keys that are not configured", function () {
      expect(GameKeys.status.b).toBeUndefined();

      keyDown('b');

      expect(GameKeys.status.b).toBeUndefined();
    });
  });

  describe("watchKey", function () {
    it("sets a key to be watched", function () {
      expect(GameKeys.status.z).toBeUndefined();

      GameKeys.watchKey('z');

      expect(GameKeys.status.z).toBe(false);

      keyDown('z');

      expect(GameKeys.status.z).toBe(true);
    });
  });

  describe("register handlers", function () {
    beforeEach(function () {
      spyCallback = jasmine.createSpy('spyCallback');
    });

    it("supports handler on a keydown event", function () {
      GameKeys.registerKeyDownHandler('a', spyCallback);

      keyDown('a');

      expect(spyCallback).toHaveBeenCalled();
    });

    it("supports handler on a keyup event", function () {
      GameKeys.registerKeyUpHandler('a', spyCallback);

      keyUp('a');

      expect(spyCallback).toHaveBeenCalled();
    });

    it("supports multiple handlers", function () {
      otherSpyCallback = jasmine.createSpy('otherSpyCallback');

      GameKeys.registerKeyDownHandler('a', spyCallback);
      GameKeys.registerKeyDownHandler('a', otherSpyCallback);

      keyDown('a');

      expect(spyCallback).toHaveBeenCalled();
      expect(otherSpyCallback).toHaveBeenCalled();
    });

    it("configures a watch on the key", function () {
      expect(GameKeys.status.x).toBeUndefined();

      GameKeys.registerKeyDownHandler('x', spyCallback);

      expect(GameKeys.status.x).toBeDefined();
    });
  });

});
