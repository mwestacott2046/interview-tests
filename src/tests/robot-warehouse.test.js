const { test, expect } = require("@jest/globals");
const { Robot } = require("../robot-warehouse/robot-warehouse");
const rw = require('../robot-warehouse/robot-warehouse');

test("positionValidator greaterX returns false", () => {
  const validator = rw.makePositionValidator(10);
  const result = validator({X:11, Y: 2});
  expect(result).toBeFalsy;
});

test("positionValidator greaterX returns false", () => {
  const validator = rw.makePositionValidator(10);
  const result = validator({X:0, Y: 2});
  expect(result).toBeFalsy;
});

test("positionValidator greaterY returns false", () => {
  const validator = rw.makePositionValidator(10);
  const result = validator({X:2, Y: 11});
  expect(result).toBeFalsy;
});

test("positionValidator lesserY returns false", () => {
  const validator = rw.makePositionValidator(10);
  const result = validator({X:2, Y: 0});
  expect(result).toBeFalsy;
});

test("positionValidator when inbounds returns true", () => {
  const validator = rw.makePositionValidator(10);
  const result = validator({X:2, Y: 3});
  expect(result).toBeTruthy;
});

test("movePosition when moving 'N', Y is increased", () => {
  const pos = new rw.Position(2,2);
  const result = rw.processMove('N', pos);
  expect(result.Y).toEqual(3);
});

test("movePosition when moving 'S', Y is decreased", () => {
  const pos = new rw.Position(2,2);
  const result = rw.processMove('S', pos);
  expect(result.Y).toEqual(1);
});

test("movePosition when moving 'E', X is increased", () => {
  const pos = new rw.Position(2,2);
  const result = rw.processMove('E', pos);
  expect(result.X).toEqual(3);
});

test("movePosition when moving 'W', X is decreased", () => {
  const pos = new rw.Position(2,2);
  const result = rw.processMove('W', pos);
  expect(result.X).toEqual(1);
});

test("processCommands 'N E N E N E N E' should return position 5,5", () => {
  const [result,crates] = rw.processCommands('N E N E N E N E',[]);
  expect(result.position.X).toEqual(5);
  expect(result.position.Y).toEqual(5);
});

test("processCommands 'N N N N N N N N N' should return position 1,10", () => {
  const [result,crates] = rw.processCommands('N N N N N N N N N',[]);
  expect(result.position.X).toEqual(1);
  expect(result.position.Y).toEqual(10);
});


test("processCommands 'N E S W' should return position 1,1", () => {
  const [result,crates] = rw.processCommands('N E S W',[]);
  expect(result.position.X).toEqual(1);
  expect(result.position.Y).toEqual(1);
});

test("processCommands 'S' should throw", () => {
  expect(() => rw.processCommands('S',[])).toThrow("robot is out of bounds at command index: 1. position X:1 Y:0");
});

test("processCommands 'W' should throw", () => {
  expect(() => rw.processCommands('W',[])).toThrow("robot is out of bounds at command index: 1. position X:0 Y:1");
});

test("Can Grab a crate", ()=>{
  const [robot,crates] = rw.processCommands('G',[new rw.Position(1,1)]);

  expect(robot.holdsCrate).toBeTruthy;
  expect(crates.length).toEqual(0);
});

test("Can Grab without crate at position, throws", ()=>{
  
  expect(() => rw.processCommands('G',[])).toThrow("Cannot Grab No crate found at position [1,1]");
  
});

test("Cannot Grab a crate whn already holding one.", ()=>{
  const initialRobot = new Robot(1,1);
  initialRobot.holdsCrate = true;

  expect(()=> rw.processCommands('G',[new rw.Position(1,1)],initialRobot)).toThrow('Cannot Grab a crate when holding a crate.');
});

test("Can Drop crate", ()=>{
  const initialRobot = new Robot(1,1);
  initialRobot.holdsCrate = true;
  const [robot,crates] = rw.processCommands('D',[], initialRobot);

  expect(robot.holdsCrate).toBeFalsy;
  expect(crates.length).toEqual(1);
  expect(crates[0].X).toEqual(1);
  expect(crates[0].Y).toEqual(1);
});

test("Can Drop when crate exists at position, throws", ()=>{
  const initialRobot = new Robot(1,1);
  initialRobot.holdsCrate = true;

  expect(() => rw.processCommands('D',[new rw.Position(1,1)],initialRobot)).toThrow("Cannot Drop, a crate exists in position [1,1]");
  
});


test("Can Grab, Move and Drop crate", ()=>{
  const [robot,crates] = rw.processCommands('G E D',[new rw.Position(1,1)]);

  expect(robot.holdsCrate).toBeFalsy;
  expect(crates.length).toEqual(1);
  expect(crates[0].X).toEqual(2);
  expect(crates[0].Y).toEqual(1);
});
