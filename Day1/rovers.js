// Mars Rover implementation to demonstrate a bunch of ES6 "fancy new stuff" javascript syntax.
// ES6 refers to the ECMAscript 2015 standard (which is the 6th major revision). ECMAscript is the
// set of standards that say how javascript should work, and is implemented to one degree or another
// (coughcoughinternetexplorer) by browsers and other javascript engines.

// If anyone's interested in what they look like, these are the actual standards:
// http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf




// Simple cass definition
class Coordinate
{
  constructor(x,y) {
    // Fields don't have to be declared, but do have to be reffered to with "this"
    this.x = x;
    this.y = y;
  }

  toString() {
    return this.x + "," + this.y;
  }
}

// const means that Heading itself cannot be reassigned. Kind of like "readonly" in c# (or more directly, like "val" in scala)
const Heading = {
  // Convention: ALL_CAPS is constants
  NORTH: 0,
  EAST: 90,
  SOUTH: 180,
  WEST: 270
};

class Rover {
  constructor(position, heading) {
    // Convention: _underscore represents private fields/methods
    // calling instance._field should always raise a red flag 
    this._position = position;
    this._heading = heading;
  }

  toString() {
    // let is basically just a better version of var. Var is always scoped to the function it's in, 
    // whereas let is scoped to the block it's in, such as a loop.
    let heading = this._heading;
    let h = headingToString(heading);

    // named properties can be "destructured" with the following syntax. This is just a cleaner way of saying:
    // let x = this._position.x;
    // let y = this._position.y;
    let  { x, y } = this._position;

    // String templates: This is like c# $"{foo} {bar}"
    // Uses "backtick" instead of quotes (that thing on the same key as the ~)
    return `${x} ${y} ${h}`; // 1 2 N 
  }

  receiveCommands(commands) {
    // for..of loops act like foreach in c#. Iterates any iterable object
    // Array.forEach is similar, but 1) not all iterable objects are actually arrays (I.E. document.querySelectorAll)
    // and 2) it isn't supported in all browsers 
    for (let command of commands) {
      this._receiveCommand(command);
    }
  }

  _receiveCommand(cmd) {
    switch (cmd.toUpperCase()) {
      case "L":
        this._turn(-90);
        break;
      case "R":
        this._turn(90);
        break;
      case "M":
        this._moveForward();
        break;
      default:
        throw new Error(`Unknown command "${cmd}"`);
    }
  }

  _turn(degrees) {
    this._heading += degrees;
  }

  _moveForward() {
    let { x, y } = this._position;
    
    // Lambda functions: declaring it with arrow syntax will NOT create a new scope for "this"
    // If you declare it as function(...) {...}, "this" will reffer to that function, not the
    // outer scope (like class fields/methods) 

    let toRadian = degrees => degrees * (Math.PI / 180);
    let theta = toRadian(this._heading % 360);
    let dx = Math.sin(theta);
    let dy = Math.cos(theta);
    this._position = new Coordinate(
      Math.round(x + dx), Math.round(y + dy));
  }

  // static methods can be called via Rover.create("1 2 N");
  static create(roverString) {
    // Not ES6, this has been around for a while, but using /pattern/ to define
    // regular expressions is pretty convenient
    let pattern = /^(\d+) (\d+) ([NESW])$/i;
    if (!pattern.test(roverString)) {
      throw new Error("Unable to parse rover string");
    }

    // Array destructuring works too!
    // this is equivelant of:
    // let match = pattern.exec(roverString);
    // let x = match[1];
    // let y = match[2];
    // let h = match[3];
    let [,x,y,h] = pattern.exec(roverString);
    let position = new Coordinate(parseInt(x), parseInt(y));
    let heading = parseHeading(h);
    return new Rover(position, heading);
  }
}

// Helper functions:

function parseHeading(c) {
  switch (c.toUpperCase()) {
    case "N":
      return Heading.NORTH;
    case "E":
      return Heading.EAST;
    case "S":
      return Heading.SOUTH;
    case "W":
      return Heading.WEST;
    default:
      throw new Error("Unexpected Direction");
  }
}

function headingToString(h) {
  let cardinalDirection = h % 360;
  while (cardinalDirection < 0) cardinalDirection += 360;
  switch (cardinalDirection) {
    case Heading.NORTH:
      return "N";
    case Heading.EAST:
      return "E";
    case Heading.SOUTH:
      return "S";
    case Heading.WEST:
      return "W";
    default:
      return cardinalDirection.toString();
  }
}

// Putting it into action:

let rover = Rover.create("1 2 N");
rover.receiveCommands("LMR");
console.info(rover.toString());