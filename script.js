'use strict';
import { setupGround, updateGround } from './ground.js';
import { updateCactus, setupCactus} from "./cactus.js"
import {updateDino, setupDino} from "./dino.js"

const worldWidth = 100;
const worldHeight = 30;
const SPEED_SCALE_INC=0.0001

const worldElement = document.querySelector("[data-world]");
const scoreElement = document.querySelector("[data-score]");
const startScreenElem = document.querySelector("[data-start-screen]");

const setPixelToWorldScale = function () {
  let worldToPixelScale;

  if (window.innerWidth / window.innerHeight < worldWidth / worldHeight)
    worldToPixelScale = window.innerWidth / worldWidth;
  else worldToPixelScale = window.innerHeight / worldHeight;

  worldElement.style.width = `${worldToPixelScale * worldWidth}`;
  worldElement.style.height = `${worldToPixelScale * worldHeight}`;
};


window.addEventListener('resize', setPixelToWorldScale);
document.addEventListener("keydown", handleStart,{once: true})

let lastTime
let speedScale
let score
setupGround()

function update(time) {
  if (lastTime === null) {
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
  lastTime = time;
  window.requestAnimationFrame(update);
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
  score=0
  setupGround()
  setupDino()
  setupCactus()
  startScreenElem.classList.add("hide")
  window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);
