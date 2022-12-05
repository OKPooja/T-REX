'use strict';
import { setupGround, updateGround } from './ground.js';
import { updateCactus, setupCactus, getCactusRects} from "./cactus.js"
import {updateDino, setupDino, getDinoRect, setDinoLose} from "./dino.js"

const worldWidth = 100;
const worldHeight = 15;
const SPEED_SCALE_INC=0.00001

const worldElement = document.querySelector("[data-world]");
const scoreElement = document.querySelector("[data-score]");
const highScoreElement = document.querySelector("[data-highScore]");
const startScreenElem = document.querySelector("[data-start-screen]");

setPixelToWorldScale() 

window.addEventListener('resize', setPixelToWorldScale);
document.addEventListener("keydown", handleStart,{once: true})

let lastTime;
let speedScale;
let score;
let highScore;

if(window.localStorage.getItem("highscore")===null){
  highScore = 0;
}
else{
  highScore = window.localStorage.getItem("highscore");
}
highScoreElement.textContent = highScore;

function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;
  updateGround(delta,speedScale);
  updateDino(delta,speedScale)
  updateCactus(delta,speedScale)
  updateSpeedScale(delta)
  updateScore(delta)

  if(checkLose())
   return handleLose()
  lastTime = time;
  window.requestAnimationFrame(update);
}

function checkLose(){
  const dinoRect=getDinoRect()
  return getCactusRects().some(rect=> isCollision(rect,dinoRect))
}
function isCollision(rect1, rect2){
  return (
    rect1.left<rect2.right && 
    rect1.top<rect2.bottom &&
    rect1.right>rect2.left &&
    rect1.bottom>rect2.top 
  )
}
function handleLose(){
  setDinoLose()
  setTimeout(() =>{
    document.addEventListener("keydown", handleStart,{once: true})
    startScreenElem.classList.remove("hide")
  },100)
}
function updateSpeedScale(delta)
{
  speedScale+=delta*SPEED_SCALE_INC
}
function updateScore(delta)
{
  score+=delta*0.01
  scoreElement.textContent= Math.floor(score)
}
function handleStart()
{
  lastTime=null
  speedScale=1
  if(score>highScore){
    window.localStorage.setItem("highScore", Math.floor(score));;
    highScore = Math.floor(score);
  }
  score=0
  setupGround()
  setupDino()
  setupCactus()
  startScreenElem.classList.add("hide")
  window.requestAnimationFrame(update);
  highScoreElement.textContent = highScore;
}
function setPixelToWorldScale () {
  let worldToPixelScale;

  if (window.innerWidth / window.innerHeight < worldWidth / worldHeight)
    worldToPixelScale = window.innerWidth / worldWidth
  else 
    worldToPixelScale = window.innerHeight / worldHeight

  worldElement.style.width = `${worldToPixelScale * worldWidth}px`;
  worldElement.style.height = `${worldToPixelScale * worldHeight}px`;
}
window.addEventListener('beforeunload', function(){
  this.window.localStorage.setItem("highscore", highScore);
})