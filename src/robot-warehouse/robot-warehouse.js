class Position {
  constructor(xPosition, yPosition){
    this.X = xPosition;
    this.Y = yPosition;
  }
}

class Robot {
  constructor(xPosition, yPosition){
    this.position = new Position(xPosition, yPosition);
    this.holdsCrate = false;
  }
}

class Warehouse{
  constructor(cratePositions){
    this.crates = cratePositions;
    this.robot = new Robot(1,1);
  }

  command = (commandStr) => {
    const [newRobot, newCrates] = processCommands(commandStr, this.crates, this.robot);
    // console.log('command:newRobot', newRobot);
    // console.log('command:newCrates', newCrates);
    this.robot = newRobot;
    this.crates = newCrates;
  }
}

const makePositionValidator =(size) =>{
  // posiion is indexed starting from 1 to size
  return (positon) => {
    if (positon.Y > size) return false;
    if (positon.X > size) return false;
    if (positon.Y < 1) return false;
    if (positon.X < 1) return false; 
    return true;
  }  
};

const processMove = (move, position) =>{
  switch (move) {
    case 'N':
      return new Position(position.X, position.Y +1);
    case 'S':
      return new Position(position.X, position.Y -1);
    case 'E':
      return new Position(position.X +1, position.Y);
    case 'W':
      return new Position(position.X -1, position.Y);
    default:
      throw new Error(`Invalid Move Direction: ${move}`);
  }
}

const findCrateAt = (x, y, crates) =>{
  return crates.findIndex((crate) => (crate.X === x && crate.Y === y));
};

function removeCrate(modifiedCrates, crateIndex) {
  return [...modifiedCrates.slice(0, crateIndex), ...modifiedCrates.slice(crateIndex + 1)];
}

const processCommands = (commandList, cratePositions, initialRobot) => {
  const commands = commandList.split(" ");
  positionValidator = makePositionValidator(10);

  let robot;
  if(initialRobot === undefined){
    robot = new Robot(1,1);
  }else{
    robot = {...initialRobot};
  }
  let modifiedCrates = [...cratePositions];
  
  commands.forEach((command,index) => {
    switch(command){
      case 'G':
        if(robot.holdsCrate){
          throw new Error('Cannot Grab a crate when holding a crate.');
        }
        const crateIndex = findCrateAt(robot.position.X, robot.position.Y, modifiedCrates);
        if(crateIndex === -1){
          throw new Error(`Cannot Grab No crate found at position [${robot.position.X},${robot.position.Y}]`);
        }
        robot.holdsCrate = true;
        modifiedCrates = removeCrate(modifiedCrates, crateIndex);
        break;
      case 'D':
        if (modifiedCrates.length ===0 || 
          findCrateAt(robot.position.X, robot.position.Y, modifiedCrates) === -1){
          robot.holdsCrate = false;
          modifiedCrates = [...modifiedCrates, new Position(robot.position.X, robot.position.Y)];
        }else{
          throw new Error(`Cannot Drop, a crate exists in position [${robot.position.X},${robot.position.Y}]`);
        }
        break;
      default:
        const newPosition = processMove(command,robot.position);
        if(!positionValidator(newPosition)){
          throw new Error(`robot is out of bounds at command index: ${index+1}. position X:${newPosition.X} Y:${newPosition.Y}`);
        }
        robot.position = newPosition;    
    }
  });
  return [robot, modifiedCrates];
}



module.exports = {
  makePositionValidator: makePositionValidator,
  Position: Position,
  processMove: processMove,
  processCommands: processCommands,
  Robot : Robot,
  Warehouse: Warehouse,
};

