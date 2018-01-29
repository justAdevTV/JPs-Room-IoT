var five = require("johnny-five");
var Edison = require("edison-io");
var songs = require("j5-songs");

var BoardMap = require("./BoardMap");

var blueLed;
var redLed;
var buzzer;
var button;
var lcd;
var temperatureSensor;
var lightSensor;

// Init Edison Board
var board = new five.Board({
    io: new Edison()
});

// Verifies that board is functioning
board.on("ready", function() {
    initComponents();
    testComponents(this);
});

// Initializes Components
function initComponents() {
    blueLed = new five.Led(BoardMap.BLUE_LED);
    redLed = new five.Led(BoardMap.RED_LED);
    buzzer = new five.Piezo(BoardMap.BUZZER);
    button = new five.Button(BoardMap.BUTTON);
    lcd = new five.LCD({
        controller: BoardMap.LCD.controller,
        backlight: 12
    });
    temperatureSensor = new five.Temperature({
        pin: BoardMap.TEMPERATURE_SENSOR.pin,
        controller: BoardMap.TEMPERATURE_SENSOR.controller
    });
    lightSensor = new five.Sensor(BoardMap.LIGHT_SENSOR);
}

// Test Components
function testComponents(_this) {
    
    // LED Test
    blueLed.blink(1000);
    redLed.blink(1000);

    // Buzzer Test
    var starWarsSong = songs.load("starwars-theme");
    buzzer.play(starWarsSong);

    // Button Listeners
    button.on("press", function() {
        console.log("Pressed!");
    });

    button.on("release", function() {
        console.log("Released!");
    });

    button.on("hold", function() {
        console.log("Holding...");
    });

    // LCD Test Icon
    lcd.useChar("heart");
    lcd.cursor(0, 0).print("I :heart: JP");

    // Temp Checker
    _this.loop(2000, function() {
        console.log("%d°F", Math.round(temperatureSensor.fahrenheit));
    });

    // Light Sensor Intensity Checker
    _this.loop(2000, function() {
        console.log("Light sensor value: ", lightSensor.value);
    });
}