const readlineSync = require('readline-sync');
const { Warehouse, Position } = require('./robot-warehouse');

const repl = () =>{

  let inputString = ""
  console.log('-- Robot Warehouse --');
  console.log('-- Type \'q\' to quit --');
  console.log('-- Type \'c\' to list crates --');

  let wh = new Warehouse([new Position(5,5), new Position(10,10)]);

  while(true){
    const input = readlineSync.question('Enter space separated commands [N,S,E,W,G,D]: ');
    if (input ==='Q' || input === 'q'){
      return;
    }else if(input ==='C' || input === 'c'){

      console.log('Crate locations:');
      wh.crates.forEach(element => {
        console.log('Position:', element.X, element.Y);
      });
    }else{
      try{
        wh.command(input.toUpperCase());
  
        console.log(`Position: ${wh.robot.position.X}, ${wh.robot.position.Y}: has crate: ${wh.robot.holdsCrate}`);
      }catch (err){
        console.log(err.message);
      }  
    }
  }
};

repl();
