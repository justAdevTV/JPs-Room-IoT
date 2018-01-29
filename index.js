var five = require("johnny-five");
var Edison = require("edison-io");

// Init Edison Board
var board = new five.Board({
  io: new Edison()
});

// Verifies that board is functioning
board.on("ready", function() {
  var led = new five.Led(13);
  led.blink(1000);
});