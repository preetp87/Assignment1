
const socket = io();
var value;

var user1="";
var user2="";

const messageForm = document.getElementById('send-container');
const startgame = document.getElementById('start-game');
var User1score = document.getElementById('user1score');
var User2score = document.getElementById('user2score');
var Score1 = 0;
var Score2 = 0;
var Result = document.getElementById("Result");
var Player1= document.getElementById("player1");
var Player2 = document.getElementById("player2");
var rock = document.getElementById("rock");
var paper = document.getElementById("paper");
var scissors = document.getElementById("scissors");
var states = "";
var states2= "";
var results = "";



const name = prompt('What is your name?')

startgame.addEventListener('click', f=>{
  socket.emit('send-name', name)
  console.log(states);
  console.log(states2);

})

// when submit button is pressed, it checks the state for player 1 and player 2
// states is option player 1 selects 
// states2 is option player 2 selects
// only when both states are avaliable, it compares the two output and updates to both player.

messageForm.addEventListener('submit', e=>{
  e.preventDefault()
  socket.emit('send-message',states)

  if(states2 != "")
  {
    if(states == "r" && states2== "r")
    {
      results = "It is a draw";
      console.log("draw")
      states ="";
      states2 = "";
    }
    else if(states == "r" && states2=="p")
    {
      results = user1+": Rock "+user2+": Paper";
      states="";
      states2="";
      Score2++;
    }
    else if(states=="r" && states2=="s")
    {
      results = user1+": Rock "+user2+": Scissors";
      states="";
      states2="";
      Score1++;
    }
    else if(states=="p" && states2=="r")
    {
      results = user1+": Paper "+user2+": Rock";
      states="";
      states2="";
      Score1++;
    }
    else if(states=="p" && states2=="p")
    {
      results = "It is a draw";
      states="";
      states2="";
    }
    else if(states=="p" && states2=="s")
    {
      results = user1+": Paper "+user2+": Scissors";
      states="";
      states2="";
      Score2++;
    }
    else if(states=="s" && states2=="r")
    {
      results = user1+": Scissors "+user2+": Rock";
      states="";
      states2="";
      Score2++;
    }
    else if(states=="s" && states2=="p")
    {
      results = user1+": Scissors "+user2+": Paper";
      states="";
      states2="";
      Score1++
    }
    else if(states=="s" && states2=="s")
    {
      results = "It is a draw";
      states="";
      states2="";
    }
//-------------------------------------

    User1score.innerHTML = Score1;
    User2score.innerHTML = Score2;
    Result.innerHTML = results;
    socket.emit('send-results', results)

    socket.emit('score1',Score1)
    socket.emit('score2',Score2)
  }

})

socket.on('send-update', outcome=>{
  Result.innerHTML = outcome;
  states="";
  states2="";
})

socket.on('score1-send', scoreOne=>{
  User2score.innerHTML = scoreOne
  console.log(scoreOne)
})
socket.on('score2-send', scoreTwo=>{
  User1score.innerHTML = scoreTwo
  console.log(scoreTwo)
})

socket.on('name-sent', value=>{
  Player2.innerHTML = value
  user2 = value
})
Player1.innerHTML = name;
user1 = name;
console.log(name);

socket.on('messages', data=>{
  checking(data)
})


socket.emit('new-user',name)

socket.on('players', user=>{console.log(`${user.name}`)});

function main() 
{
  rock.addEventListener('click', function(){
    game("r") 
    })
  
  paper.addEventListener('click',function(){
    game("p")
    })
  
  scissors.addEventListener('click',function(){
    game("s")
   })
}

function game(UserChoice)
{
states= UserChoice;
}

main();


function checking(playerchoice)
{
  states2 =playerchoice;
  console.log(playerchoice) 
}


